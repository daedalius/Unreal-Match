module Entities
{
    // Present a offset for origin frame
    export class Offset
    {
        private x: number;
        get X()
        {
            return this.x;
        }
        set X(value: number)
        {
            if(value => 0)
            {
                this.x = value;
            }
            else
            {
                throw new Exceptions.InvalidOperationException("Offset cannot be less than zero");
            }
        }

        private y: number;
        get Y()
        {
            return this.y;
        }
        set Y(value: number)
        {
            if(value => 0)
            {
                this.y = value;
            }
            else
            {
                throw new Exceptions.InvalidOperationException("Offset cannot be less than zero");
            }
        }

        constructor(x: number, y: number)
        {
            this.X = x;
            this.Y = y;
        }

        public ConvertToPoint(): Point
        {
            return new Point(this.X, this.Y);
        }
    }
} 