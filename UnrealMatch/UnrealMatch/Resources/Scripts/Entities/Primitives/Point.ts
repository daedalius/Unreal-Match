module Entities
{
    export class Point
    {
        public X: number;
        public Y: number;

        constructor(x: number, y: number)
        {
            this.X = x;
            this.Y = y;
        }

        // Returned converted point in Cortesial CS to Screen CS for presentation on canvas
        public ToScreen(canvasHeight: number): Point
        {
            return new Point(this.X, canvasHeight - this.Y);
        }

        // Convert this point in Cortesial CS to Screen CS for presentation on canvas
        public ConvertToScreen(canvasHeight: number)
        {
            this.Y = canvasHeight - this.Y;
        }

        // In Cortesian CS
        public Translate(): Point
        {
            var x: number = (this.X - FrameOffset.X) / Sizes.CanvasDefault.Width * Sizes.Canvas.Width;
            var y: number = (this.Y - FrameOffset.Y) / Sizes.CanvasDefault.Height * Sizes.Canvas.Height;

            return new Point(x, y);
        }

        // Subtraction points is a vector
        public Substract(subtrahend: Point): Vector
        {
            return new Vector(this.X - subtrahend.X, this.Y - subtrahend.Y);
        }

        // Add vector operations
        public AddVector(vector: Entities.Vector)
        {
            this.X += vector.X;
            this.Y += vector.Y;
        }
    }
}