namespace UnrealMatch.Entities.Primitives
{
    public class Circle
    {
        public Point Center { get; set; }
        public int Radius { get; set; }

        public Circle(Point center, int radius)
        {
            this.Center = center;
            this.Radius = radius;
        }
    }
}