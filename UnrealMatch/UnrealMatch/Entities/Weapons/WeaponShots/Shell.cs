namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using System;
    using System.Diagnostics;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.GameStateHandlers;
    using UnrealMatch.Entities.Interfaces;
    using UnrealMatch.Entities.Primitives;

    public abstract class Shell : Shot, IMomentShotHitTest
    {
        /// <summary>
        /// Position of center shell point
        /// </summary>
        public Point CurrentPosition { get; set; }
        /// <summary>
        /// Radius of detonation
        /// </summary>
        public int Raduis { get; set; }
        /// <summary>
        /// Shell speed
        /// </summary>
        public int Speed { get; set; }

        public Shell(int provider, WeaponType weapon, WeaponMode mode, Point position, double angle, int damage, PlayerViewDirection direction, int radius, int speed)
            : base(provider, weapon, mode, position, angle, damage, direction)
        {
            this.CurrentPosition = this.StartPosition;
            this.Raduis = radius;
            this.Speed = speed;
        }

        public abstract Calculations.MomentShotIntersectionResult MomentShotHitTest(Shot shot);


        public abstract bool HandleIntersection(Calculations.MomentShotIntersectionResult intersection, PlayGamePhaseManager manager);

        public abstract Point GetCenterPoint(PlayerCollisionPart part);

        internal void NextPosition()
        {
            var k = Calculations.Get.K(this.Angle);
            var yRate = k;
            var xRate = 1;
            var all = Math.Abs(yRate) + xRate;
            var partsCount = this.Speed / all;
            var speedX = partsCount * xRate;
            var speedY = partsCount * yRate;

            this.CurrentPosition.X += (this.Direction == PlayerViewDirection.Right) ? (int)speedX : -(int)speedX;
            this.CurrentPosition.Y += (int)speedY;
        }

        internal bool IsLosted(Size mapSize)
        {
            return this.CurrentPosition.X < -100 ||
                   this.CurrentPosition.X > mapSize.Width + 100 ||
                   this.CurrentPosition.Y < -100 ||
                   this.CurrentPosition.Y > mapSize.Height + 100;
        }
    }
}