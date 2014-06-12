namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Primitives;

    public class ASMDShell : LinearShell
    {
        public ASMDShell(int provider, Point position, double angle, PlayerViewDirection direction)
            : base(provider, WeaponType.Shockrifle, WeaponMode.Alternate, position, angle, 40, direction, 15)
        { }
    }
}