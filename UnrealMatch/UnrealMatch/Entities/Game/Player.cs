namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Player
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public ClientStatus Status { get; set; }
        public int Score { get; set; }
        // Network
        public Alchemy.Classes.UserContext Context { get; set; }

        public Player(string playerName)
        {
            this.Name = playerName;
            this.Status = ClientStatus.Disconnected;
            this.Score = 0;
        }
    }
}