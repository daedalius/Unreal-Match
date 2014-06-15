namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Resources.Scripts.Entities.Weapons;

    public class ASMDBigBlast : Blast
    {
        public ASMDBigBlast(Point position)
            : base(BlastType.ASMDBlast, position, 20, 40, 150)
        {
        }
    }
}