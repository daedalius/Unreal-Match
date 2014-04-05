module Calculations
{
    export class Get
    {
        private static __tempApproachDiff = 0;

        public static Cathetus()
        { }

        public static Approach(current: number, goal: number, dt: number)
        {
            Get.__tempApproachDiff = goal - current;

            if(Get.__tempApproachDiff > dt)
            {
                return current + dt;
            }

            if(Get.__tempApproachDiff < -dt)
            {
                return current - dt;
            }

            return goal;
        }

        public static Hypotenuse(firstCatetLength: number, secondCatetLength: number): number
        {
            return Math.sqrt(Math.pow(firstCatetLength, 2) + Math.pow(secondCatetLength, 2));
        }

        public static Radians(degree: number): number
        {
            return degree * (Math.PI / 180);
        }

        public static Degreess(radians: number): number
        {
            return radians * (180 / Math.PI);
        }

        public static FastRectangleVisiblilityTest(visibleArea: Entities.Rectangle, content: Entities.Rectangle): boolean
        {
            // Compute first point code
            var firstPointCode: number = Get.PointCode(visibleArea, content.Start);
            var secondPointCode: number = Get.PointCode(visibleArea, content.End);

            if(firstPointCode === 0 && secondPointCode === 0)
            {
                return true;
            }
            else
            {
                if((firstPointCode & secondPointCode) === 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

        }

        private static PointCode(visibleArea: Entities.Rectangle, point: Entities.Point): number
        {
            var result: number;

            // top
            if(point.Y > visibleArea.Start.Y)
            {
                // 9
                if(point.X < visibleArea.Start.X)
                {
                    return 9;
                }
                else
                {
                    // 10
                    if(point.X > visibleArea.End.X)
                    {
                        return 10;
                    }
                    else
                    {
                        return 8;
                    }
                }
            }
            else
            {
                // bottom
                if(point.Y < visibleArea.End.Y)
                {
                    // 5
                    if(point.X < visibleArea.Start.X)
                    {
                        return 5;
                    }
                    else
                    {
                        // 6
                        if(point.X > visibleArea.End.X)
                        {
                            return 6;
                        }
                        else
                        {
                            return 4;
                        }
                    }
                }
                else
                {
                    // middle
                    // 1
                    if(point.X < visibleArea.Start.X)
                    {
                        return 1;
                    }
                    else
                    {
                        // 2
                        if(point.X > visibleArea.End.X)
                        {
                            return 2;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                }
            }
        }
    }
}