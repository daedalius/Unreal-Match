namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.GameStateHandlers;
    using UnrealMatch.Entities.Primitives;

    public class ASMDShell : LinearShell
    {
        public ASMDShell(int provider, Point position, double angle, PlayerViewDirection direction)
            : base(provider, WeaponType.Shockrifle, WeaponMode.Alternate, position, angle, 40, direction, 15, 50)
        { }

        public override Calculations.MomentShotIntersectionResult MomentShotHitTest(Shot shot)
        {

            double k = (shot.Direction == PlayerViewDirection.Right) ? Calculations.Get.K(shot.Angle) : Calculations.Get.K(-shot.Angle);
            double b = Calculations.Get.B(shot.StartPosition, k);

            if (Calculations.Get.IsLineIntersectCircle(k, b, new Circle(this.CurrentPosition, this.Raduis)))
            {
                return new Calculations.MomentShotIntersectionResult()
                {
                    Intersection = this.CurrentPosition,
                    Shot = shot,
                    Victim = this
                };
            }
            else
            {
                return null;
            }
        }

        public override bool HandleIntersection(Calculations.MomentShotIntersectionResult intersection, PlayGamePhaseManager manager)
        {
            if (intersection.Shot.Weapon == WeaponType.Shockrifle)
            {
                // ASMD shot handling
                if (intersection.Shot.Mode == WeaponMode.Standart)
                {
                    // Need to generate ASMD big blast
                    manager.Blasts.Add(new ASMDBigBlast(intersection.Intersection));
                }
                //else
                //{
                //    // Handle simple ASMD blast
                //    manager.Blasts.Add(new ASMDBlast(intersection.Intersection));
                //}

                // [TODO] - Too dangerous code
                manager.ActiveShells.Remove(this);
                //manager.BlastedShells.Add(this);

                return true;
            }
            else
            {
                return false;
            }
        }

        public override Point GetCenterPoint(PlayerCollisionPart part)
        {
            return this.CurrentPosition;
        }
    }
}