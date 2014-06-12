namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Primitives;

    public class ASMDShot : MomentShot
    {
        public ASMDShot(int provider, Point position, double angle, PlayerViewDirection direction)
            : base(provider, WeaponType.Shockrifle, WeaponMode.Standart, position, angle, 30, direction)
        { }
    }
}