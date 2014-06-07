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
        public static CleanedArray(arrayToClean: any[]): any[]
        {
            var result: any[] = new Array();

            for(var i = 0; i < arrayToClean.length; i++)
            {
                if(arrayToClean[i])
                {
                    result.push(arrayToClean[i])
                }
            }

            return result;
        }

        public static FilledArray(arrayToFill: any[], filler: any)
        {
            for(var i = 0; i < arrayToFill.length; i++)
            {
                arrayToFill[i] = filler;
            }
        }

        public static ClonedArray(arrayToClone: any[]): any[]
        {
            return arrayToClone.slice(0);
        }

        public static SortedArray(arrayToSort: any[], field : string) : any[]
        {
            var tempArray = Calculations.Get.ClonedArray(arrayToSort);

            // Buble sort
            var temp;
            var n = tempArray.length;
            for(var j = 0; j < n - 1; j++)
            {
                var f = 0;
                var min = j;

                for(var i = j; i < (n - j - 1); i++)
                {
                    if(tempArray[i][field] > tempArray[i + 1][field])
                    {
                        temp = tempArray[i];
                        tempArray[i] = tempArray[i + 1];
                        tempArray[i + 1] = temp;
                        f = 1;
                    }
                    if(tempArray[i][field] < tempArray[min][field])
                        min = i;
                }
                if(f == 0)
                    break;
                if(min != j)
                {
                    temp = tempArray[j];
                    tempArray[j] = tempArray[min];
                    tempArray[min] = temp;
                }
            }

            return tempArray;
        }
    }
}