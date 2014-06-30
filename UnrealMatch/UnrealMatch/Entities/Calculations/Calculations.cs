namespace UnrealMatch.Entities.Calculations
{
    using System;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Weapons.WeaponShots;

    public static class Get
    {
        private static Random random = new Random();

        public static int Random(int min, int max)
        {
            return random.Next(min, max);
        }

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

        /// <summary>
        /// Return true if line intersect circle
        /// </summary>
        /// <param name="kRate">Rate of line slope</param>
        /// <param name="bRate">Line offset by Oy</param>
        /// <param name="circle">Circle to test</param>
        public static bool IsLineIntersectCircle(double kRate, double bRate, Circle circle)
        {
            double y = circle.Center.X * kRate + bRate;
            return IsPointInCircle(new Point(circle.Center.X, (int)y), circle);
        }

        /// <summary>
        /// Return true if circle intersect rectangle
        /// </summary>
        public static bool CircleRectangleIntersection(Circle circle, Rectangle rect)
        {
            if (Calculations.Get.IsPointInRectangle(circle.Center, rect))
            {
                // Center of circle in rectangle
                return true;
            }
            else
            {
                bool left = Calculations.Get.CircleRectangleLeftRightSideInstersection(RectangleSide.Left, circle, rect);
                bool right = Calculations.Get.CircleRectangleLeftRightSideInstersection(RectangleSide.Right, circle, rect);
                bool top = Calculations.Get.CircleRectangleTopBottomSideInstersection(RectangleSide.Top, circle, rect);
                bool bottom = Calculations.Get.CircleRectangleTopBottomSideInstersection(RectangleSide.Top, circle, rect);

                return left || right || top || bottom;
            }
        }

        /// <summary>
        /// Return true if circles intersect
        /// </summary>
        public static bool IsCircleIntersectCircle(Circle first, Circle second)
        {
            var firstCatet = Math.Abs(first.Center.X - second.Center.X);
            var secondCatet = Math.Abs(first.Center.Y - second.Center.Y);

            var hypo = Calculations.Get.Hypotenuse(firstCatet, secondCatet);

            return (hypo < first.Radius + second.Radius);
        }

        /// <summary>
        /// Return true if point in circle
        /// </summary>
        public static bool IsPointInCircle(Point point, Circle circle)
        {
            var firstCatet = Math.Abs(point.X - circle.Center.X);
            var secondCatet = Math.Abs(point.Y - circle.Center.Y);

            var hypo = Calculations.Get.Hypotenuse(firstCatet, secondCatet);

            return Math.Abs(point.Y - circle.Center.Y) <= circle.Radius;
        }

        private static Point MiddlePoint(Point first, Point second)
        {
            var xDiff = first.X - second.X;
            var yDiff = first.Y - second.Y;

            xDiff = xDiff / 2;
            yDiff = yDiff / 2;

            // Returns middle point
            return new Point(second.X + xDiff, second.Y + yDiff);
        }

        private static Point ClosestOrMiddlePoint(Point target, Point first, Point second)
        {
            var firstHypoLength = Get.Hypotenuse(first.X - target.X, first.Y - target.Y);
            var secondHypoLength = Get.Hypotenuse(second.X - target.X, second.Y - target.Y);

            if (firstHypoLength == secondHypoLength)
            {
                // Both points are closest
                // Need to return middle point
                return Get.MiddlePoint(first, second);
            }
            else
            {
                // Return first or second point
                return (firstHypoLength > secondHypoLength) ? second : first;
            }
        }

        private static bool CircleRectangleLeftRightSideInstersection(RectangleSide sideX, Circle circle, Rectangle rect)
        {
            // equation variables for (x-x0)^2 + (y-y0)^2 = R^2
            double x = (sideX == RectangleSide.Left) ? rect.Start.X : rect.End.X;
            double x0 = circle.Center.X;
            double y0 = circle.Center.Y;
            double R = circle.Radius;

            // parts of disclosed quadratic equation
            double a = 1;
            double b = -2 * y0;
            double c = y0 * y0 - R * R + x * x - 2 * x * x0 + x0 * x0;

            // discriminant
            double D = b * b - 4 * a * c;

            // false if the equation has no roots
            if (D < 0)
            {
                return false;
            }
            else
            {
                double y1 = (-b + Math.Sqrt(D)) / 2 * a;
                double y2 = (-b - Math.Sqrt(D)) / 2 * a;

                return (y1 <= rect.Start.Y && y1 >= rect.End.Y) ||
                       (y2 <= rect.Start.Y && y2 >= rect.End.Y);
            }
        }

        private static bool CircleRectangleTopBottomSideInstersection(RectangleSide sideY, Circle circle, Rectangle rect)
        {
            // equation variables for (x-x0)^2 + (y-y0)^2 = R^2
            double y = (sideY == RectangleSide.Top) ? rect.Start.X : rect.End.X; ;
            double x0 = circle.Center.X;
            double y0 = circle.Center.Y;
            double R = circle.Radius;

            // parts of disclosed quadratic equation
            double a = 1;
            double b = -2 * x0;
            double c = x0 * x0 - R * R + y * y - 2 * y * y0 + y0 * y0;

            // discriminant
            double D = b * b - 4 * a * c;

            // false if the equation has no roots
            if (D < 0)
            {
                return false;
            }
            else
            {
                double x1 = (-b + Math.Sqrt(D)) / 2 * a;
                double x2 = (-b - Math.Sqrt(D)) / 2 * a;

                return (x1 >= rect.Start.X && x1 <= rect.End.X) ||
                       (x2 >= rect.Start.X && x2 <= rect.End.X);

            }
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