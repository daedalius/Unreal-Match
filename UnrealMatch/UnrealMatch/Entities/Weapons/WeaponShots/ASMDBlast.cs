namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.GameObjects;

    public class ASMDBlast : Blast
    {
        public ASMDBlast(int senderId, Point position)
            : base(senderId, BlastType.ASMDBlast, position, 32, 48, 40)
        {
        }
    }
}