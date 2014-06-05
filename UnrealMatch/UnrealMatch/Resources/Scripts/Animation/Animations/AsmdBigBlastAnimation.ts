/// <reference path="../../Variables.ts" />
/// <reference path="../../Entities/Primitives/Point.ts" />
/// <reference path="../Animation.ts" />

module Animation
{
    export class AsmdBigBlastAnimation extends Animation
    {
        constructor(centerPoint: Entities.Point)
        {
            super(centerPoint, <HTMLImageElement>document.getElementById('asmd-bigblast-animation'), Sizes._originSizes.AsmdBigBlastSprite, Sizes.AsmdBigBlastSprite, Sizes.AsmdBigBlastSpriteInSpritesheet, 8);
        }
    }
}