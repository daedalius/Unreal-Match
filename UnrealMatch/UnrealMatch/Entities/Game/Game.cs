namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Threading;

    public class Game
    {
        // [TODO] use GUIDs
        public string Name { get; set; }
        public List<Player> Players { get; set; }
        public Map Map { get; set; }
        public int PlayersCount { get; set; }
        public List<UnhandledPlayerData> UnhandledData;

        /// <summary>
        /// Instate new game and run their game cycle
        /// </summary>
        /// <param name="gameName">Name for game</param>
        /// <param name="mapTitle">Map for game</param>
        /// <param name="players">Players count. Game starts after reaching this value</param>
        public Game(string gameName, string mapTitle, int players)
        {
            this.Name = gameName;
            this.Players = new List<Player>();
            this.PlayersCount = players;
            this.UnhandledData = new List<UnhandledPlayerData>(this.PlayersCount);
            this.Map = MapInfoGetter.GetMap(mapTitle);
            this.StartGameCycle();
        }

        internal void JoinPlayer(string playerName)
        {
            Player newPlayer = new Player(playerName);
            Players.Add(newPlayer);

            //throw new NotImplementedException();
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
                // Handle new data
                foreach (var unhandledData in this.UnhandledData)
                {
                    if (unhandledData != null)
                    {
                        this.HandleData(unhandledData);
                    }
                }

                // Update game state
                // ...


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
            //throw new NotImplementedException();
        }

        internal void SaveContextJoinedPlayer(Alchemy.Classes.UserContext context, int playerNumber)
        {
            //throw new NotImplementedException();
        }
    }
}