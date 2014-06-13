namespace UnrealMatch.Entities.Calculations
{
    using System;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Interfaces;
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Weapons.WeaponShots;

    public class MomentShotIntersectionResult : IComparable<MomentShotIntersectionResult>
    {
        public Shot Shot { get; set; }
        public IMomentShotHitTest Victim { get; set; }
        public Point Intersection { get; set; }
        public PlayerCollisionPart PlayerPart { get; set; }

        public int CompareTo(MomentShotIntersectionResult other)
        {
            var thisHypo = Calculations.Get.Hypotenuse(Math.Abs(this.Shot.StartPosition.X - this.Victim.GetCenterPoint(this.PlayerPart).X), Math.Abs(this.Shot.StartPosition.Y - this.Victim.GetCenterPoint(this.PlayerPart).Y));
            var otherHypo = Calculations.Get.Hypotenuse(Math.Abs(other.Shot.StartPosition.X - other.Victim.GetCenterPoint(other.PlayerPart).X), Math.Abs(other.Shot.StartPosition.Y - other.Victim.GetCenterPoint(other.PlayerPart).Y));
            return (int)(otherHypo - thisHypo);
        }
    }
}