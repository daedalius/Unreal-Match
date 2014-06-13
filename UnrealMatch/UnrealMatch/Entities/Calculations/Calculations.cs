namespace UnrealMatch.Entities.Calculations
{
    using System;
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Weapons.WeaponShots;

    public static class Get
    {
        /// <summary>
        /// Return hypotenuse length
        /// </summary>
        public static double Hypotenuse(double firstCatet, double secondCatet)
        {
            return Math.Sqrt(Math.Pow(firstCatet, 2) + Math.Pow(secondCatet, 2));
        }

        /// <summary>
        /// Returns the rate of line slope for equation of line
        /// </summary>
        /// <param name="angle">Line angle in radians</param>
        public static double K(double angle)
        {
            return Math.Tan(angle);
        }

        /// <summary>
        /// Returns (0,0) offset of line for equation of line
        /// </summary>
        /// <param name="point">One of line points</param>
        /// <param name="k">Rate of line slope</param>
        public static double B(Point point, double k)
        {
            return -(k * point.X - point.Y);
        }

        /// <summary>
        /// Converts radians to grads
        /// </summary>
        public static double Grads(double radians)
        {
            return radians * 180 / Math.PI;
        }

        /// <summary>
        /// Converts grads to radians
        /// </summary>
        public static double Radians(double degrees)
        {
            return degrees * Math.PI / 180;
        }

        /// <summary>
        /// Returns point of line-rectangle intersection or null
        /// </summary>
        public static Point ShotRectangleIntersection(Shot shot, Rectangle target)
        {
            if (Get.IsPointInRectangle(shot.StartPosition, target))
            {
                return shot.StartPosition;
            }

            double k = Get.K(shot.Angle);
            double b = Get.B(shot.StartPosition, k);

            // Shot to right
            if (shot.Direction == Enums.PlayerViewDirection.Right)
            {
                // Check left rectangle side for intersect
                if (shot.StartPosition.X < target.Start.X)
                {
                    var leftResult = Get.LeftRectangleSideIntersectionTest(k, b, target);
                    if (leftResult != null)
                    {
                        return leftResult;
                    }
                }

                // Check bottom rectangle side for intersect
                if (shot.StartPosition.Y < target.End.Y)
                {

                    var bottomResult = Get.BottomRectangleSideIntersectionTest(k, b, target);
                    if (bottomResult != null)
                    {
                        return bottomResult;
                    }
                }

                // Check top rectangle side for intersect
                if (shot.StartPosition.Y > target.Start.Y)
                {

                    var topResult = Get.TopRectangleSideIntersectionTest(k, b, target);
                    if (topResult != null)
                    {
                        return topResult;
                    }
                }
            }
            // Shot to left
            else
            {
                k = Get.K(-shot.Angle);
                b = Get.B(shot.StartPosition, k);
                // Check right rectangle side for intersect
                if (shot.StartPosition.X > target.End.X)
                {
                    var rightResult = Get.RightRectangleSideIntersectionTest(k, b, target);
                    if (rightResult != null)
                    {
                        return rightResult;
                    }
                }

                // Check bottom rectangle side for intersect
                if (shot.StartPosition.Y < target.End.Y)
                {

                    var bottomResult = Get.BottomRectangleSideIntersectionTest(k, b, target);
                    if (bottomResult != null)
                    {
                        return bottomResult;
                    }
                }

                // Check top rectangle side for intersect
                if (shot.StartPosition.Y > target.Start.Y)
                {

                    var topResult = Get.TopRectangleSideIntersectionTest(k, b, target);
                    if (topResult != null)
                    {
                        return topResult;
                    }
                }
            }

            return null;
        }

        /// <summary>
        /// Returns true of point in rectangle
        /// </summary>
        public static bool IsPointInRectangle(Point point, Rectangle rectangle)
        {
            return rectangle.Start.X <= point.X &&
                    rectangle.End.X >= point.X &&
                    rectangle.End.Y <= point.Y &&
                    rectangle.Start.Y >= point.Y;
        }

        private static Point LeftRectangleSideIntersectionTest(double k, double b, Rectangle target)
        {
            double probablyCollisionYPoint = k * target.Start.X + b;
            var probablyCollisionPoint = new Point(target.Start.X, (int)probablyCollisionYPoint);

            return (Get.IsPointInRectangle(probablyCollisionPoint, target)) ? probablyCollisionPoint : null;
        }

        private static Point RightRectangleSideIntersectionTest(double k, double b, Rectangle target)
        {
            double probablyCollisionYPoint = k * target.End.X + b;
            var probablyCollisionPoint = new Point(target.End.X, (int)probablyCollisionYPoint);

            return (Get.IsPointInRectangle(probablyCollisionPoint, target)) ? probablyCollisionPoint : null;
        }

        private static Point BottomRectangleSideIntersectionTest(double k, double b, Rectangle target)
        {
            double probablyCollisionXPoint = (target.End.Y - b) / k;
            var probablyCollisionPoint = new Point((int)probablyCollisionXPoint, target.End.Y);

            return (Get.IsPointInRectangle(probablyCollisionPoint, target)) ? probablyCollisionPoint : null;
        }

        private static Point TopRectangleSideIntersectionTest(double k, double b, Rectangle target)
        {
            double probablyCollisionXPoint = (target.Start.Y - b) / k;
            var probablyCollisionPoint = new Point((int)probablyCollisionXPoint, target.Start.Y);

            return (Get.IsPointInRectangle(probablyCollisionPoint, target)) ? probablyCollisionPoint : null;
        }
    }
}