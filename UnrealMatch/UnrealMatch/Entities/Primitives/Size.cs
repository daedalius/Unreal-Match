namespace UnrealMatch.Entities.Primitives
{
    public class Size
    {
        public int Width { get; set; }
        public int Height { get; set; }

        public Size(int w, int h)
        {
            this.Width = w;
            this.Height = h;
        }
    }
}