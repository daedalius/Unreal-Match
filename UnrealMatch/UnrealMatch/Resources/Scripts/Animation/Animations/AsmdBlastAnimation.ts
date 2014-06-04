module Animation
{
    export class AsmdBigBlastAnimation extends Animation
    {
        constructor(centerPoint: Point)
        {
            super(centerPoint, <HTMLImageElement>document.getElementById('asmd-bigblast-animation'), Sizes._originSizes.AsmdBigBlastSprite, Sizes.AsmdBigBlastSprite, Sizes.AsmdBigBlastSpriteInSpritesheet, 8);
        }
    }
}