namespace UnrealMatch.Entities
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Threading;
    using Newtonsoft.Json.Serialization;
    using Newtonsoft.Json;
    using UnrealMatch.Entities;
    using System.Diagnostics;

    public class Game
    {
        // [TODO] use GUIDs
        public string Name { get; set; }
        public GameState State { get; set; }
        public List<Player> Players { get; set; }
        public Map Map { get; set; }
        public int MaxPlayers { get; set; }
        public int Countdown { get; set; }

        /// <summary>
        /// Instate new game and run their game cycle
        /// </summary>
        /// <param name="gameName">Name for game</param>
        /// <param name="mapTitle">Map for game</param>
        /// <param name="players">Players count. Game starts after reaching this value</param>
        public Game(string gameName, string mapTitle, int players)
        {
            this.Name = gameName;
            this.State = GameState.Waiting;
            this.Players = new List<Player>(this.MaxPlayers);
            this.MaxPlayers = players;
            this.Map = MapInfoGetter.GetMap(mapTitle);
            this.Countdown = 5;
            this.StartGameCycle();
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

        internal void JoinPlayer(string playerName)
        {
            Player newPlayer = new Player(playerName);
            newPlayer.Status = ClientStatus.Connecting;
            Players.Add(newPlayer);
            // [TODO] - incorrect code
            newPlayer.Number = Players.Count - 1;
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
            if (this.State == GameState.Waiting)
            {
                // Handle new countdows state 
                if (this.Players.Count == this.MaxPlayers && this.Players.All(x => x.Status == ClientStatus.Ready))
                {
                    this.State = GameState.Countdown;
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
            if (this.State == GameState.Countdown)
            {
                if (this.Countdown != 0)
                {
                    var obj = new { Stage = this.State.ToString(), PlayerStatistic = CollectPlayersStats(), Countdown = this.Countdown };
                    this.Countdown -= 1;
                    this.SendBroadcastMessage(obj);
                    Thread.Sleep(1000);
                }
                else
                {
                    this.State = GameState.Play;
                }
            }
        }

        /// <summary>
        /// Handler for Play game state
        /// </summary>
        private void PlayStageHandler()
        {
            if (this.State == GameState.Play)
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
                if (this.State == GameState.Play)
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
                Thread.Sleep(1);
            }
        }

        private void SendBroadcastMessage(object toJson)
        {
            var tempJson = JsonConvert.SerializeObject(toJson);
            SendBroadcastMessage(tempJson);
        }


        internal void HandleClientMessage(Fleck.IWebSocketConnection clientContext, string message)
        {
            Debug.WriteLine("___Сервер принял____: " + message);

            dynamic data = JsonConvert.DeserializeObject(message);

            int id = data.PlayerId;

            if (this.State == GameState.Waiting)
            {
                string state = data.PlayerState;

                this.Players[id].Status = ClientStatus.Ready;
            }


            if (this.State == GameState.Countdown)
            {

            }

            if (this.State == GameState.Play && data.PlayerState == "Play")
            {
                var x = data.X;
                var y = data.Y;
                double angle = data.Angle;
                string direction = data.Direction;

                this.Players[id].Position.X = x;
                this.Players[id].Position.Y = y;
                this.Players[id].AngleOfView = angle;
                this.Players[id].IsForwardView = (direction == "Right") ? true : false;
            }
        }
    }
}