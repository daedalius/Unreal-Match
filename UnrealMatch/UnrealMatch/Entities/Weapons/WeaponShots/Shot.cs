namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;

    public abstract class Shot
    {
        // Who made this shot
        public int PlayerId { get; set; }
        // Weapon
        public WeaponType Weapon { get; set; }
        // Mode
        public WeaponMode Mode { get; set; }
        // Shot initial position
        public Point StartPosition { get; set; }
        // Shot initial angle
        public double Angle { get; set; }
        // Shot direction: "Right" or "Left"
        public PlayerViewDirection Direction { get; set; }
        // Shot damage
        public int Damage { get; set; }

        public Shot(int provider, WeaponType weapon, WeaponMode mode, Point position, double angle, int damage, PlayerViewDirection direction)
        {
            this.PlayerId = provider;
            this.Weapon = weapon;
            this.Mode = mode;
            this.StartPosition = position;
            this.Angle = angle;
            this.Direction = direction;
            this.Damage = damage;
        }
    }
}