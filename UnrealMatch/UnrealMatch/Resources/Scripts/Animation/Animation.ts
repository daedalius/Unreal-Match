module Animation
{
    export class Animation
    {
        public SpriteDrawableSize: Entities.Size;
        public DefaultSize: Entities.Size; // 256x256 only for
        public SpriteSize: Entities.Size;
        public Spritesheet: HTMLImageElement;
        public SpritesCount: number;
        public CenterPoint: Point;

        public Counter: number;
        public DoNextStep(): boolean
        {
            if(this.Counter != this.SpritesCount)
            {
                // Draw sprite
                this.Draw();

                // Increment counter in the end of drawing
                this.Counter++;
            }

            // Check animation limit
            if(this.Counter >= this.SpritesCount - 1)
            {
                // Animation over
                return true;
            }
            else
            {
                // Animation not over
                return false;
            }
        }

        private Draw()
        {
            var spriteStartPoint = new Point(this.Counter * this.SpriteSize.Width, 0);
            var startPointScreen = new Point(this.CenterPoint.X - this.DefaultSize.Width / 2, this.CenterPoint.Y + this.DefaultSize.Height / 2).Translate().ToScreen(Sizes.Canvas.Height);

            AnimationManager.CanvasContext.drawImage(this.Spritesheet, spriteStartPoint.X, spriteStartPoint.Y, this.SpriteSize.Width, this.SpriteSize.Height, startPointScreen.X, startPointScreen.Y, this.SpriteDrawableSize.Width, this.SpriteDrawableSize.Height);
        }

        constructor(center: Point, spritesheet: HTMLImageElement, defaultSize: Entities.Size, drawingSize: Entities.Size, spriteSize: Entities.Size, spritesCount: number)
        {
            this.CenterPoint = center;
            this.Spritesheet = spritesheet;
            this.SpriteDrawableSize = drawingSize;
            this.DefaultSize = defaultSize;
            this.SpriteSize = spriteSize;
            this.Counter = 0;
            this.SpritesCount = spritesCount;
        }
    }
}