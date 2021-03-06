import Point = Entities.Point;

module Rendering
{
    export class Render
    {
        public static RenderBackground()
        {
            // Bottom point
            var startBackground: Point = FrameOffset.ConvertToPoint();//.Translate();

            // Real top point

            // [WTF]
            // Convert origin offset to image offset
            // For X
            if(FrameOffset.X > 0)
            {
                startBackground.X *= LevelMapImageQualityMultiplier
            }
            // For Y
            if(FrameOffset.Y > 0)
            {
                startBackground.Y *= LevelMapImageQualityMultiplier;
            }

            startBackground.Y += Sizes.CanvasDefault.Height * LevelMapImageQualityMultiplier;
            startBackground.ConvertToScreen(LevelImageSize.Height);

            // Drawing
            LevelContext.clearRect(0, 0, LevelImageSize.Width, LevelImageSize.Height);
            LevelContext.drawImage(LevelImage, startBackground.X, startBackground.Y, Sizes.CanvasDefault.Width * LevelMapImageQualityMultiplier, Sizes.CanvasDefault.Height * LevelMapImageQualityMultiplier, 0, 0, Sizes.Canvas.Width, Sizes.Canvas.Height);
        }

        private static TranslateOnImage(point: Entities.Point): Entities.Point
        {
            return new Entities.Point(point.X, point.Y);
        }
    }
}