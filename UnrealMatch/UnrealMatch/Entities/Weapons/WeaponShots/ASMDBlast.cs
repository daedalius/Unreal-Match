namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Resources.Scripts.Entities.Weapons;

    public class ASMDBlast : Blast
    {
        public ASMDBlast(Point position)
            : base(BlastType.ASMDBlast, position, 10, 20, 40)
        {
        }
    }
}