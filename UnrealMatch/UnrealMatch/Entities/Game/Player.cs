namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Player
    {
        public string Name { get; set; }

        public Player(string playerName)
        {
            this.Name = playerName;
        }

        public int Number { get; set; }
    }
}