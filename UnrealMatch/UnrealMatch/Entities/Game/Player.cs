namespace UnrealMatch.Entities
{
    using Fleck;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Player
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public int Score { get; set; }
        public Point Position { get; set; }
        public bool IsForwardView { get; set; }
        public double AngleOfView { get; set; }

        // Network
        [Newtonsoft.Json.JsonIgnore]
        public ClientStatus Status { get; set; }
        [Newtonsoft.Json.JsonIgnore]
        public IWebSocketConnection ClientContext { get; set; }

        public Player(string playerName)
        {
            this.Name = playerName;
            this.Status = ClientStatus.Disconnected;
            this.Score = 0;
            this.Position = new Point(600, 24);
            this.IsForwardView = true;
            this.AngleOfView = 0;
        }
    }
}