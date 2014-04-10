module Objects
{
    export class GameObject
    {
        public Position: Entities.Point;
        public OriginInnerRectangle: Entities.Rectangle;

        constructor(position: Entities.Point, rect: Entities.Rectangle)
        {
            this.Position = position;
            this.OriginInnerRectangle = rect;
        }
    }
} 