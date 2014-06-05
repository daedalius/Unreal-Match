module Animation
{
    export class AsmdBlastAnimation extends Animation
    {
        constructor(centerPoint: Point)
        {
            super(centerPoint, <HTMLImageElement>document.getElementById('asmd-blast-animation'), Sizes._originSizes.AsmdBlastSprite, Sizes.AsmdBlastSprite, Sizes.AsmdBlastSpriteInSpritesheet, 3);
        }
    }
}