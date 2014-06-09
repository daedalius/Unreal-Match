namespace UnrealMatch.Entities
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Threading;
    using Newtonsoft.Json;
    using Fleck;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Map;
    using UnrealMatch.Entities.ClientMessageTypes;
    using UnrealMatch.Entities.GameObjects;
    using UnrealMatch.Entities.ServerMessages;

    public class Game
    {
        /// <summary>
        /// Name for game instance
        /// </summary>
        public string Name { get; private set; }
        /// <summary>
        /// Current game phase
        /// </summary>
        public GamePhase State { get; set; }
        /// <summary>
        /// Current game players
        /// </summary>
        public List<Player> Players { get; set; }
        /// <summary>
        /// Current game level
        /// </summary>
        public LevelMap Map { get; set; }
        /// <summary>
        /// Players count
        /// </summary>
        public int MaxPlayers { get; set; }
        /// <summary>
        /// Countdown counter
        /// </summary>
        private int countdown { get; set; }

        /// <summary>
        /// Instate new game and run their game cycle
        /// </summary>
        /// <param name="gameName">Name for game</param>
        /// <param name="mapTitle">Map for game</param>
        /// <param name="players">Players count. Game starts after reaching this value</param>
        public Game(string gameName, string mapTitle, int players)
        {
            this.Name = gameName;
            this.State = GamePhase.Waiting;
            this.Players = new List<Player>(this.MaxPlayers);
            this.MaxPlayers = players;
            this.Map = MapInfoGetter.GetMap(mapTitle);
            this.countdown = 5;
            this.StartGameCycle();
        }

        internal void JoinPlayer(string playerName)
        {
            Player newPlayer = new Player(playerName);
            newPlayer.Status = ClientStatus.Connecting;
            Players.Add(newPlayer);
            // [TODO] - incorrect code
            newPlayer.Number = Players.Count - 1;
        }

        internal void HandleClientMessage(IWebSocketConnection clientContext, string message)
        {
            dynamic data = JsonConvert.DeserializeObject(message);

            int id = data.Id;
            string state = data.State;

            if (this.State == GamePhase.Waiting)
            {
                this.Players[id].Status = ClientStatus.Ready;
            }


            if (this.State == GamePhase.Countdown)
            {

            }

            if (this.State == GamePhase.Play && state == "Play")
            {
                this.Players[id].Position.X = data.Position.X;
                this.Players[id].Position.Y = data.Position.Y;
                this.Players[id].AngleOfView = data.Angle;
                this.Players[id].Direction = (data.Direction == "Right") ? PlayerViewDirection.Right : PlayerViewDirection.Left;


                ClientPlayState receivedState = JsonConvert.DeserializeObject<ClientPlayState>(message);
                this.Players[id].Weapon = receivedState.Weapon;
                // Decrease ammo for each shot
                foreach (var shot in receivedState.Shots)
                {
                    this.Players[id].Munitions.Decrease(shot);
                }
            }
        }

        private void StartGameCycle()
        {
            Task gameCycle = new Task(this.GameCycle);
            gameCycle.Start();
        }

        private void GameCycle()
        {
            while (true)
            {
                // Stage handlers
                this.WaitingStageHandler();
                this.CountdownStageHandler();
                this.PlayStageHandler();
            }
        }

        private object CollectPlayersStats()
        {
            var playersStatistic = new List<PlayerStatistic>();

            foreach (var player in this.Players)
            {
                playersStatistic.Add(new PlayerStatistic() { Name = player.Name, Number = player.Number, Score = player.Score });
            }

            return playersStatistic;
        }

        /// <summary>
        /// Handler for Waiting game state
        /// </summary>
        private void WaitingStageHandler()
        {
            if (this.State == GamePhase.Waiting)
            {
                // Handle new countdows state 
                if (this.Players.Count == this.MaxPlayers && this.Players.All(x => x.Status == ClientStatus.Ready))
                {
                    this.State = GamePhase.Countdown;
                    return;
                }
                // Broadcasting for all ready players
                else
                {
                    if (this.Players.Count != 0)
                    {
                        // One time in second send all data about connected players

                        var obj = new { Stage = this.State.ToString(), PlayerStatistic = CollectPlayersStats() };

                        this.SendBroadcastMessage(obj);
                        Thread.Sleep(1000);
                    }
                }
            }
        }

        /// <summary>
        /// Handler for Countdown game state
        /// </summary>
        private void CountdownStageHandler()
        {
            if (this.State == GamePhase.Countdown)
            {
                if (this.countdown != 0)
                {
                    var obj = new { Stage = this.State.ToString(), PlayerStatistic = CollectPlayersStats(), Countdown = this.countdown };
                    this.countdown -= 1;
                    this.SendBroadcastMessage(obj);
                    Thread.Sleep(1000);
                }
                else
                {
                    this.State = GamePhase.Play;
                }
            }
        }

        /// <summary>
        /// Handler for Play game state
        /// </summary>
        private void PlayStageHandler()
        {
            if (this.State == GamePhase.Play)
            {
                var obj = new
                {
                    Stage = this.State.ToString(),
                    Players = this.Players.ToArray()
                };
                this.SendBroadcastMessage(obj);
                Thread.Sleep(100);
            }
        }

        private void SendBroadcastMessage(string jsonString)
        {
            foreach (var player in this.Players)
            {
                if (this.State == GamePhase.Play)
                {
                    player.ClientContext.Send(jsonString);
                }
                else
                {
                    if (player != null && (player.Status == ClientStatus.Connected || player.Status == ClientStatus.Ready))
                    {
                        player.ClientContext.Send(jsonString);
                    }
                }
            }
        }

        private void SendBroadcastMessage(object toJson)
        {
            var tempJson = JsonConvert.SerializeObject(toJson);
            SendBroadcastMessage(tempJson);
        }
    }
}