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

    public class Game
    {
        // [TODO] use GUIDs
        public string Name { get; set; }
        public GameState State { get; set; }
        public List<Player> Players { get; set; }
        public Map Map { get; set; }
        public int PlayersCount { get; set; }
        public int Countdown { get; set; }

        //public List<UnhandledPlayerData> UnhandledData;

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
            this.Players = new List<Player>(this.PlayersCount);
            this.PlayersCount = players;
            //this.UnhandledData = new List<UnhandledPlayerData>(this.PlayersCount);
            this.Map = MapInfoGetter.GetMap(mapTitle);
            this.Countdown = 3;
            this.StartGameCycle();
        }

        internal void JoinPlayer(string playerName)
        {
            Player newPlayer = new Player(playerName);
            newPlayer.Status = ClientStatus.Connected;
            Players.Add(newPlayer);
            // [TODO] - incorrect code
            newPlayer.Number = Players.Count - 1;
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
            if (this.Players != null)
            {
                if (this.State == GameState.Waiting)
                {
                    // Handle new countdows state 
                    if (this.Players.Count == this.PlayersCount && this.Players.All(x => x.Status == ClientStatus.Ready))
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
                Thread.Sleep(50);
            }
        }

        private void HandleData(UnhandledPlayerData unhandledData)
        {
            // Handling
            // ...
        }

        internal void SaveRecivedStateByPlayer(int playerNumber)
        {
        }

        internal void SaveContextJoinedPlayer(Alchemy.Classes.UserContext context, int playerNumber)
        {
            this.Players[playerNumber].Context = context;
            this.Players[playerNumber].Status = ClientStatus.Ready;
        }

        private void SendBroadcastMessage(string jsonString)
        {
            foreach (var player in this.Players)
            {
                if (player != null && player.Status == ClientStatus.Ready)
                {
                    player.Context.Send(jsonString);
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