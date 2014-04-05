module Entities
{
    export class Rectangle
    {
        // Startpoint (beyond of endpoint - Cartesian CS)
        public Start: Point;

        // Endpoint (under of startpoint - Cartesian CS)
        private end: Point;
        get End(): Point
        {
            return this.end;
        }
        set End(value: Point)
        {
            if(this.Start.X >= value.X || this.Start.Y <= value.Y)
            {
                throw new Exceptions.InvalidOperationException("Can`t set endpoint (" + value.X + ',' + value.Y + ') for rectangle with startpoint  (' + this.Start.X + ',' + this.Start.Y + ')');
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
            return this.Start.Y - this.end.Y;
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

        // Convert this rectangle in Cortesial CS to Screen CS for presentation on canvas
        ToScreen(canvasHeight: number): ScreenRectangle
        {
            var newStartPoint: Point = new Point(this.Start.X, canvasHeight - this.Start.Y);
            var newEndPoint: Point = new Point(this.End.X, canvasHeight - this.End.Y);

            return new ScreenRectangle(newStartPoint, newEndPoint);
        }
    }
}