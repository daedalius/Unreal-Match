namespace UnrealMatch.Entities.Weapons
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Shot
    {
        // Who made this shot
        public int PlayerId { get; set; }
        // Weapon
        public WeaponType Weapon { get; set; }
        // Mode
        public WeaponMode Mode { get; set; }
        // Shot initial position
        public object StartPosition { get; set; }
        // Shot initial angle
        public double Angle { get; set; }
        // Shot direction: "Right" or "Left"
        public string Direction { get; set; }

        public Shot(int provider, WeaponType weapon, WeaponMode mode, object position, double angle, string direction)
        {
            this.PlayerId = provider;
            this.Weapon = weapon;
            this.Mode = mode;
            this.StartPosition = position;
            this.Angle = angle;
            this.Direction = direction;
        }
    }
}