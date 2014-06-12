﻿namespace UnrealMatch.Entities.GameObjects
{
    using Fleck;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Weapons;

    public class Player
    {
        /// <summary>
        /// Player nickname
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Player ID for this game
        /// </summary>
        public int Number { get; set; }
        /// <summary>
        /// Player point in total
        /// </summary>
        public int Score { get; set; }
        /// <summary>
        /// Player position on level
        /// </summary>
        public Point Position { get; set; }
        /// <summary>
        /// Player view direction
        /// </summary>
        public PlayerViewDirection Direction { get; set; }
        /// <summary>
        /// Player view angle
        /// </summary>
        public double AngleOfView { get; set; }
        /// <summary>
        /// Player weapons and ammo
        /// </summary>
        public PlayerMunitions Munitions { get; set; }
        /// <summary>
        /// Weapon in hands
        /// </summary>
        public WeaponType Weapon { get; set; }
        /// <summary>
        /// Get player head rectangle
        /// </summary>
        public Rectangle HeadRectangle
        {
            get
            {
                var start = new Point(this.Position.X - 15, this.Position.Y + 129 + 28);
                var end = new Point(this.Position.X + 15, this.Position.Y + 129);
                return new Rectangle(start, end);
            }
        }
        /// <summary>
        /// Get player body rectangle
        /// </summary>
        public Rectangle BodyRectangle
        {
            get
            {
                var start = new Point(this.Position.X - 32, this.Position.Y + 128);
                var end = new Point(this.Position.X + 32, this.Position.Y);
                return new Rectangle(start, end);
            }
        }
        /// <summary>
        /// Player connection status
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public ClientStatus Status { get; set; }
        /// <summary>
        /// Player connection context
        /// </summary>
        [Newtonsoft.Json.JsonIgnore]
        public IWebSocketConnection ClientContext { get; set; }

        public Player(string playerName)
        {
            this.Weapon = WeaponType.Enforcer;
            this.Name = playerName;
            this.Status = ClientStatus.Disconnected;
            this.Score = 0;
            this.Position = new Point(600, 24);
            this.Direction = PlayerViewDirection.Right;
            this.AngleOfView = 0;
            this.Munitions = new PlayerMunitions();
        }
    }
}