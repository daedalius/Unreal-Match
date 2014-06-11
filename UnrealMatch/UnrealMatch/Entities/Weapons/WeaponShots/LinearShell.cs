namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;

    public abstract class LinearShell : Shell
    {
        public LinearShell(int provider, WeaponType weapon, WeaponMode mode, Point position, double angle, int damage, PlayerViewDirection direction, int radius)
            : base(provider, weapon, mode, position, angle, damage, direction, radius)
        { }
    }
}