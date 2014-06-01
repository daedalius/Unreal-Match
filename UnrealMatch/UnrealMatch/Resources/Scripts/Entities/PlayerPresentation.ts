module Entities
{
    export class PlayerPresentation
    {
        // Sprites
        public TeamPresentation: Game.Team;

        // Draw contexts
        public HeadContext: CanvasRenderingContext2D;
        public BodyContext: CanvasRenderingContext2D;
        public WeaponContext: CanvasRenderingContext2D;

        private bodySpriteCounter: number;
        private previousPoint: Entities.Point;
        private presentationObject: Player;

        constructor(object: Player, team: Game.TeamType, headContext: CanvasRenderingContext2D, bodyContext: CanvasRenderingContext2D, weaponContext: CanvasRenderingContext2D)
        {
            this.presentationObject = object;
            this.bodySpriteCounter = 0;

            // Get team presentation resources
            this.TeamPresentation = Game.Team.CreateCharacter(team);

            // Contexts
            this.HeadContext = headContext;
            this.BodyContext = bodyContext;
            this.WeaponContext = weaponContext;
        }

        public NextFrame()
        {
            if (this.bodySpriteCounter === 6)
            {
                this.bodySpriteCounter = 0;
            }
            this.bodySpriteCounter++;
        }

        public StopFrame()
        {
            this.bodySpriteCounter = 0;
        }

        public Draw()
        {
            if(IsPlayerDrawEnable)
            {
                // Draw player parts
                this.DrawBody();
                this.DrawHead();
                this.DrawWeapon();
            }
        }

        private DrawBody()
        {
            // Get body rectangle
            var bodyFirstPoint: Point = new Point(this.presentationObject.Position.X - Sizes.PlayerBodyDefaultMultiplied.Width / 2, this.presentationObject.Position.Y + Sizes.PlayerBodyDefaultMultiplied.Height);
            var bodySecondPoint: Point = new Point(this.presentationObject.Position.X + Sizes.PlayerBodyDefaultMultiplied.Width / 2, this.presentationObject.Position.Y);
            // Convert to screen rectangle
            var bodyScreenRectangle: ScreenRectangle = new ScreenRectangle(bodyFirstPoint.Translate().ToScreen(Sizes.Canvas.Height), bodySecondPoint.Translate().ToScreen(Sizes.Canvas.Height));
            // Getting info about current sprite position
            var bodySpriteStartPoint: Point = (this.presentationObject.LookDirectionIsForward) ? new Point(this.bodySpriteCounter * Sizes.PlayerBodyDefault.Width, 0) : new Point(this.bodySpriteCounter * Sizes.PlayerBodyDefault.Width, Sizes.PlayerBodyDefault.Height);
            // Cleaning body canvas
            this.BodyContext.clearRect(bodyScreenRectangle.Start.X - 200, bodyScreenRectangle.Start.Y - 200, bodyScreenRectangle.Width + 400, bodyScreenRectangle.Height + 400);
            // Drawing body
            this.BodyContext.drawImage(this.TeamPresentation.GetTeamBodyPresentation(), bodySpriteStartPoint.X, bodySpriteStartPoint.Y, Sizes.PlayerBodyDefault.Width, Sizes.PlayerBodyDefault.Height, bodyScreenRectangle.Start.X, bodyScreenRectangle.Start.Y, bodyScreenRectangle.Width, bodyScreenRectangle.Height);
        }

        private DrawHead()
        {
            // Part of head sprite
            var headSpriteStartPoint: Point = (this.presentationObject.LookDirectionIsForward) ? new Point(0, 0) : new Point(0, Sizes.PlayerHeadDefault.Height);
            // Get head rectangle
            var bodyWithHead: Point = new Point(this.presentationObject.Position.X, this.presentationObject.Position.Y + Sizes.PlayerBodyDefaultMultiplied.Height - (Sizes.PlayerBodyDefaultMultiplied.Height * Sizes.PlayerBodyWithHeadConnection.onHeight));
            var headBottomPoint: Point = new Point(bodyWithHead.X, bodyWithHead.Y - Sizes.PlayerHeadWithBodyConnection.ConvertToOpposite().onHeight * Sizes.PlayerHeadDefaultMultiplied.Height);

            var headFirstPoint: Point = new Point(headBottomPoint.X - Sizes.PlayerHeadWithBodyConnection.onWidth * Sizes.PlayerHeadDefaultMultiplied.Width, headBottomPoint.Y + Sizes.PlayerHeadDefaultMultiplied.Height);
            var headSecondPoint: Point = new Point(headFirstPoint.X + Sizes.PlayerHeadDefaultMultiplied.Width, headFirstPoint.Y - Sizes.PlayerHeadDefaultMultiplied.Height);

            var headScreenRectangle: ScreenRectangle = new ScreenRectangle(headFirstPoint.Translate().ToScreen(Sizes.Canvas.Height), headSecondPoint.Translate().ToScreen(Sizes.Canvas.Height));

            var headCenterOnCanvas: Point = new Point(headScreenRectangle.Start.X + Sizes.PlayerHead.Width * Sizes.PlayerHeadWithBodyConnection.onWidth, headScreenRectangle.Start.Y + Sizes.PlayerHead.Height * Sizes.PlayerHeadWithBodyConnection.onHeight);

            // Offset by first point of head on canvas
            var headCenterOffset: Vector = headCenterOnCanvas.Substract(headScreenRectangle.Start);

            // Offset from canvas start point
            headCenterOffset.X = headCenterOffset.X + headScreenRectangle.Start.X;
            headCenterOffset.Y = headCenterOffset.Y + headScreenRectangle.Start.Y;

            this.HeadContext.translate(headCenterOffset.X, headCenterOffset.Y);
            this.HeadContext.rotate(-this.presentationObject.OldAngleOfView);
            this.HeadContext.clearRect(-200, -200, 400, 400);
            this.HeadContext.translate(-headCenterOffset.X, -headCenterOffset.Y);
            this.HeadContext.drawImage(this.TeamPresentation.GetTeamHeadPresentation(), headSpriteStartPoint.X, headSpriteStartPoint.Y, Sizes.PlayerHeadDefault.Width, Sizes.PlayerHeadDefault.Height, headScreenRectangle.Start.X, headScreenRectangle.Start.Y, headScreenRectangle.Width, headScreenRectangle.Height);
            this.HeadContext.translate(headCenterOffset.X, headCenterOffset.Y);
            this.HeadContext.rotate(this.presentationObject.OldAngleOfView);
            this.HeadContext.translate(-headCenterOffset.X, -headCenterOffset.Y);

        }

        private DrawWeapon()
        {
            // Part of weapon sprite
            var weaponSpriteStartPoint: Point = (this.presentationObject.LookDirectionIsForward) ? new Point(this.presentationObject.WeaponInfo.ActiveWeapon * Sizes.WeaponDefault.Width, 0) : new Point(this.presentationObject.WeaponInfo.ActiveWeapon * Sizes.WeaponDefault.Width, Sizes.WeaponDefault.Height);
            // Get weapon rectangle
            var bodyFirstPointY = this.presentationObject.Position.Y + Sizes.PlayerBodyDefaultMultiplied.Height;
            var positionOfWeaponCenterOrigin = new Point(this.presentationObject.Position.X, bodyFirstPointY - Sizes.PlayerBodyDefaultMultiplied.Height * Sizes.PlayerBodyWithWeaponConnection.onHeight);

            var weaponStartPointOrigin: Point;
            var weaponEndPointOrigin: Point;
            var weaponScreenRectangle: ScreenRectangle;
            var weaponCenter: Point;

            if(this.presentationObject.LookDirectionIsForward)
            {
                // On right
                weaponStartPointOrigin = new Point(positionOfWeaponCenterOrigin.X - Sizes.WeaponDefaultMultiplied.Width * Sizes.WeaponBody.onWidth, positionOfWeaponCenterOrigin.Y + Sizes.WeaponDefaultMultiplied.Height * Sizes.WeaponBody.onHeight);
                weaponEndPointOrigin = new Point(weaponStartPointOrigin.X + Sizes.WeaponDefaultMultiplied.Width, weaponStartPointOrigin.Y - Sizes.WeaponDefaultMultiplied.Height);
                weaponScreenRectangle = new ScreenRectangle(weaponStartPointOrigin.Translate().ToScreen(Sizes.Canvas.Height), weaponEndPointOrigin.Translate().ToScreen(Sizes.Canvas.Height));
                weaponCenter = new Point(weaponScreenRectangle.Start.X + weaponScreenRectangle.Width * Sizes.WeaponBody.onWidth, weaponScreenRectangle.Start.Y + weaponScreenRectangle.Height * Sizes.WeaponBody.onHeight);
            }
            else
            {
                // On left
                weaponEndPointOrigin = new Point(positionOfWeaponCenterOrigin.X + Sizes.WeaponDefaultMultiplied.Width * Sizes.WeaponBody.onWidth, positionOfWeaponCenterOrigin.Y - Sizes.WeaponDefaultMultiplied.Height * Sizes.WeaponBody.ConvertToOpposite().onHeight);
                weaponStartPointOrigin = new Point(weaponEndPointOrigin.X - Sizes.WeaponDefaultMultiplied.Width, weaponEndPointOrigin.Y + Sizes.WeaponDefaultMultiplied.Height);
                weaponScreenRectangle = new ScreenRectangle(weaponStartPointOrigin.Translate().ToScreen(Sizes.Canvas.Height), weaponEndPointOrigin.Translate().ToScreen(Sizes.Canvas.Height));
                weaponCenter = new Point(weaponScreenRectangle.Start.X + weaponScreenRectangle.Width * Sizes.WeaponBody.ConvertToOpposite().onWidth, weaponScreenRectangle.Start.Y + weaponScreenRectangle.Height * Sizes.WeaponBody.onHeight);
            }

            // Clearing previous state
            this.WeaponContext.translate(weaponCenter.X, weaponCenter.Y);
            this.WeaponContext.rotate(-this.presentationObject.OldAngleOfView);
            this.WeaponContext.clearRect(-400, -400, 1000, 1000);
            this.WeaponContext.translate(-weaponCenter.X, -weaponCenter.Y);
            // Drawing
            this.WeaponContext.drawImage(_WeaponNova, weaponSpriteStartPoint.X, weaponSpriteStartPoint.Y, Sizes.WeaponDefault.Width, Sizes.WeaponDefault.Height, weaponScreenRectangle.Start.X, weaponScreenRectangle.Start.Y, weaponScreenRectangle.Width, weaponScreenRectangle.Height);
            // Rotating on actual angle
            this.WeaponContext.translate(weaponCenter.X, weaponCenter.Y);
            this.WeaponContext.rotate(this.presentationObject.OldAngleOfView);
            this.WeaponContext.translate(-weaponCenter.X, -weaponCenter.Y);
        }

        //private _DrawVisibleArea()
        //{
        //    var visibleAreaOriginRectangle: Rectangle = new Rectangle(new Point(FrameOffset.X, FrameOffset.Y + 600), new Point(FrameOffset.X + 800, FrameOffset.Y));
        //    var va: ScreenRectangle = new ScreenRectangle(visibleAreaOriginRectangle.Start.Translate().ToScreen(Sizes.Canvas.Height), visibleAreaOriginRectangle.End.Translate().ToScreen(Sizes.Canvas.Height));
        //    BodyContext.fillRect(va.Start.X, va.Start.Y, va.Width, va.Height);
        //    var playerOriginRectangle: Rectangle = this.OriginInnerRectangle;

        //    if(Calculations.Get.FastRectangleVisiblilityTest(visibleAreaOriginRectangle, playerOriginRectangle))
        //    {
        //        console.log('^_^ visible');
        //    }
        //    else
        //    {
        //        console.log('-_- invisible');
        //    }
        //}

        //private _DrawInnerRectangle()
        //{
        //    var innerToScreen: ScreenRectangle = new ScreenRectangle(this.OriginInnerRectangle.Start.Translate().ToScreen(Sizes.Canvas.Height), this.OriginInnerRectangle.End.Translate().ToScreen(Sizes.Canvas.Height));
        //    BodyContext.strokeRect(innerToScreen.Start.X, innerToScreen.Start.Y, innerToScreen.Width, innerToScreen.Height);
        //}
    }
}