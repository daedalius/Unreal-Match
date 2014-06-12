namespace UnrealMatch.Entities.Primitives
{
    using System;

    public class Rectangle
    {
        /// <summary>
        /// Startpoint
        /// </summary>
        public Point Start { get; set; }
        private Point end;
        /// <summary>
        /// Endpoint
        /// </summary>
        public Point End
        {
            get { return this.end; }

            set
            {
                if (this.Start.X >= value.X || this.Start.Y <= value.Y)
                {
                    throw new InvalidOperationException("Can`t set endpoint (" + value.X + ',' + value.Y + ") for rectangle with startpoint  (" + this.Start.X + "," + this.Start.Y + ")");
                }
                else
                {
                    this.end = value;
                }
            }
        }
        /// <summary>
        /// Create instance of Rectangle by two points
        /// </summary>
        public Rectangle(Point startPoint, Point endPoint)
        {
            this.Start = startPoint;
            this.End = endPoint;
        }
        /// <summary>
        /// Width property (computable in accordance with endpoint)
        /// </summary>
        public int Width
        {
            get { return this.End.X - this.Start.X; }
        }
        /// <summary>
        /// Height property (computable in accordance with endpoint)
        /// </summary>
        public int Height
        {
            get { return this.Start.Y - this.End.Y; }
        }
        /// <summary>
        /// Return center point of this rectangle
        /// </summary>
        /// <returns></returns>
        public Point GetCenterPoint()
        {
            return new Point(this.Start.X + this.Width / 2, this.Start.Y - this.Height / 2);
        }
    }
}