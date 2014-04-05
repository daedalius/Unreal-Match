module Objects
{
    export class GameObject
    {
        public OriginInnerRectangle: Entities.Rectangle;

        constructor(rect: Entities.Rectangle)
        {
            this.OriginInnerRectangle = rect;
        }
    }
} 