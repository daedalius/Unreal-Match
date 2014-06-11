namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;

    public abstract class MomentShot : Shot
    {
        public MomentShot(int provider, WeaponType weapon, WeaponMode mode, Point position, double angle, int damage, PlayerViewDirection direction)
            : base(provider, weapon, mode, position, angle, damage, direction)
        { }
    }
}