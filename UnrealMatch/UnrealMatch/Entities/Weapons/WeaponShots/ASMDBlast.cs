namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Enums;

    public class ASMDBlast : Blast
    {
        public ASMDBlast(Point position)
            : base(BlastType.ASMDBlast, position, 32, 48, 40)
        {
        }
    }
}