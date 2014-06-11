namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;

    public abstract class Shell : Shot
    {
        /// <summary>
        /// Position of center shell point
        /// </summary>
        public Point CurrentPosition { get; set; }
        /// <summary>
        /// Radius of detonation
        /// </summary>
        public int Raduis { get; set; }

        public Shell(int provider, WeaponType weapon, WeaponMode mode, Point position, double angle, int damage, PlayerViewDirection direction, int radius)
            : base(provider, weapon, mode, position, angle, damage, direction)
        {
            this.CurrentPosition = this.StartPosition;
            this.Raduis = radius;
        }
    }
}