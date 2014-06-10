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
    using System.Diagnostics;
    using UnrealMatch.Entities.GameStateHandlers;

    public class Game
    {
        /// <summary>
        /// Name for game instance
        /// </summary>
        public string Name { get; private set; }
        /// <summary>
        /// Current game phase logic
        /// </summary>
        public GamePhaseManager PhaseManager { get; set; }
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
            this.PhaseManager = new WaitingGamePhaseManager(this);
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
            this.PhaseManager.HandleClientMessage(message);
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
                this.PhaseManager.NextState();
                this.PhaseManager.BroadcastState();
                this.PhaseManager.MakeDelay();
            }
        }

        public object CollectPlayersStats()
        {
            var playersStatistic = new List<PlayerStatistic>();

            foreach (var player in this.Players)
            {
                playersStatistic.Add(new PlayerStatistic() { Name = player.Name, Number = player.Number, Score = player.Score });
            }

            return playersStatistic;
        }

        public void SendBroadcastMessage(string jsonString)
        {
            foreach (var player in this.Players)
            {
                if (this.PhaseManager.Phase == GamePhase.Play)
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

        public void SendBroadcastMessage(object toJson)
        {
            var tempJson = JsonConvert.SerializeObject(toJson);
            SendBroadcastMessage(tempJson);
        }
    }
}