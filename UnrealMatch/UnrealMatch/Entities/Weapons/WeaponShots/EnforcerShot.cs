namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;

    public class EnforcerShot : MomentShot
    {
        public EnforcerShot(int provider, Point position, double angle, PlayerViewDirection direction)
            : base(provider, WeaponType.Enforcer, WeaponMode.Standart, position, angle, 20, direction)
        { }
    }
}