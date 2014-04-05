module Entities
{
    export class Vector
    {
        public X: number;
        public Y: number;

        constructor(x: number, y: number)
        {
            this.X = x;
            this.Y = y;
        }

        public Multipliy(num: number): Vector
        {
            return new Vector(this.X * num, this.Y * num);
        }

        public Length(): number
        {
            var res: number = Math.sqrt(this.X * this.X + this.Y * this.Y);

            // If this is a normalized vector
            if(Math.abs(1 - res) < 0.001)
            {
                return 1;
            }

            return res;
        }

        public Normalize(): Vector
        {
            var length: number = this.Length();
            return new Vector(this.X / length, this.Y / length);
        }
    }
}