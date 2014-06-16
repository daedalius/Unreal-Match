namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Enums;

    public class ASMDBigBlast : Blast
    {
        public ASMDBigBlast(Point position)
            : base(BlastType.ASMDBigBlast, position, 20, 200, 100)
        {
        }
    }
}