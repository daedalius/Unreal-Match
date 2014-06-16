namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Enums;

    public class ASMDBigBlast : Blast
    {
        public ASMDBigBlast(int senderId, Point position)
            : base(senderId, BlastType.ASMDBigBlast, position, 20, 200, 100)
        {
        }
    }
}