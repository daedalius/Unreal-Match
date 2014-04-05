module Entities
{
    export class ScreenRectangle
    {
        // Startpoint (under of endpoint - Screen CS)
        public Start: Point;

        // Endpoint (beyond of startpoint - Screen CS)
        private end: Point;
        get End(): Point
        {
            return this.end;
        }
        set End(value: Point)
        {
            if(this.Start.X <= value.X || this.Start.Y >= value.Y)
            {
                throw new Exceptions.InvalidOperationException("Can`t set endpoint (" + value.X + ',' + value.Y + ') for SCREEN rectangle with startpoint  (' + this.Start.X + ',' + this.Start.Y + ')');
            }
            else
            {
                this.end = value;
            }
        }

        // Width property (computable in accordance with endpoint)
        get Width(): number
        {
            return this.end.X - this.Start.X;
        }
        set Width(value: number)
        {
            if(value <= 0)
            {
                throw new Exceptions.InvalidOperationException('Width of rectangle cannot be equal or less than zero');
            }

            this.end.X = this.Start.X + value;
        }

        // Height property (computable in accordance with endpoint)
        get Height(): number
        {
            return this.end.Y - this.Start.Y;
        }
        set Height(value: number)
        {
            if(value <= 0)
            {
                throw new Exceptions.InvalidOperationException('Height of rectangle cannot be equal or less than zero');
            }

            this.end.Y = this.Start.Y - value;
        }

        // Create instance of Rectangle by two points
        constructor(startPoint: Point, endPoint: Point)
        {
            this.Start = startPoint;
            this.end = endPoint;
        }
    }
}