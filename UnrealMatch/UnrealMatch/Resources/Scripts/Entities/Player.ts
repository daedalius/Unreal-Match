module Entities
{
    export class Player extends Objects.GameObject
    {
        // Main info
        public Name: string;
        public Position: Point;
        // Sprites
        public TeamPresentation: Game.Team;
        // All about weapon
        public WeaponInfo: Weapons.WeaponsInfo;
        // Draw contexts
        public HeadContext: CanvasRenderingContext2D;
        public BodyContext: CanvasRenderingContext2D;
        public WeaponContext: CanvasRenderingContext2D;
        // View direction and angle
        public AngleOfView: number;
        public OldAngleOfView: number;
        public LookDirectionIsForward: boolean;
        // Animation
        public BodySpriteCounter: number;
        // Goal velocity for LERP
        private goalVelocity: Vector;
        private selfVelocity: Vector;
        public OutherVelocity: Vector;

        constructor(name: string, team: Game.TeamType, originStartBottomPoint: Point, headContext: CanvasRenderingContext2D, bodyContext: CanvasRenderingContext2D, weaponContext: CanvasRenderingContext2D)
        {
            // few constraints
            // 1. player after creating look straight on right
            // 2. player after creating hold enforcer
            // 3. player after creating are staying

            this.Position = originStartBottomPoint;

            // Get team presentation resources
            this.TeamPresentation = Game.Team.CreateCharacter(team);
            this.WeaponInfo = new Weapons.WeaponsInfo(this.TeamPresentation.GetTeamWeaponsPresentation());

            // Contexts
            this.HeadContext = headContext;
            this.BodyContext = bodyContext;
            this.WeaponContext = weaponContext;

            // Inner rectangle computing
            var startOriginPoint: Point = new Point(this.Position.X - ((744 / 4) / (2)), this.Position.Y + ((824 / 4)));
            var endOriginPoint: Point = new Point(startOriginPoint.X + (744 / 4), startOriginPoint.Y - (824 / 4));
            //var bodyFirstPoint = new Point(originStartBottomPoint.X - Sizes.PlayerBodyDefaultMultiplied.Width / 2, originStartBottomPoint.Y + Sizes.PlayerBodyDefaultMultiplied.Height);
            //var bodySecondPoint = new Point(originStartBottomPoint.X + Sizes.PlayerBodyDefaultMultiplied.Width / 2, originStartBottomPoint.Y);

            // On right
            this.AngleOfView = 0;
            this.OldAngleOfView = 0;
            this.LookDirectionIsForward = true;

            // Stay
            this.BodySpriteCounter = 0;
            // Start Weapon
            this.WeaponInfo.ActiveWeapon = Weapons.WeaponType.Enforcer;

            this.goalVelocity = new Vector(0, 0);
            this.selfVelocity = new Vector(0, 0);
            this.OutherVelocity = new Vector(0, 0);

            // super call
            super(new Rectangle(startOriginPoint, endOriginPoint));
        }

        public StartStrafeRight()
        {
            this.goalVelocity.X = 25;
        }

        public StartStrafeLeft()
        {
            this.goalVelocity.X = -25;
        }

        public StopStrafeRight()
        {
            // [TODO] - do not react while player strafing left
            this.goalVelocity.X = 0;
        }

        public StopStrafeLeft()
        {
            // [TODO] - do not react while player strafing right
            this.goalVelocity.X = 0;
        }

        public TryJump()
        {
            // if player can jump
            if(Level.PassablenessMap[this.Position.Y - 1][this.Position.X])
            {
                this.OutherVelocity.Y += 40;
            }
        }

        public NextPosition()
        {
            // Compute inner actions
            {
                var approached = Calculations.Get.Approach(this.selfVelocity.X, this.goalVelocity.X, 3);
                this.selfVelocity.X = approached;

                // Check horizontal intersect
                var horizontalDiff = this.selfVelocity.X;

                var realDiff: number = 0;
                // Player mooving right
                if(horizontalDiff > 0)
                {
                    realDiff = 0;

                    // Search for walls on right
                    for(var i = this.Position.X + 1; i <= this.Position.X + horizontalDiff; i++)
                    {
                        if(Level.PassablenessMap[this.Position.Y][i])
                        {
                            // Intersect found
                            // Need to stop player
                            this.goalVelocity.X = 0;
                            this.selfVelocity.X = 0;
                            break;
                        }
                        else
                        {
                            realDiff++;
                        }
                    }
                }

                // Player mooving left
                if(horizontalDiff < 0)
                {
                    realDiff = 0;

                    // Search for walls on left
                    for(var i = this.Position.X - 1; i >= this.Position.X + horizontalDiff; i--)
                    {

                        if(Level.PassablenessMap[this.Position.Y][i])
                        {
                            // Intersect found
                            // Need to stop player
                            this.goalVelocity.X = 0;
                            this.selfVelocity.X = 0;
                            break;
                        }
                        else
                        {
                            realDiff--;
                        }
                    }
                }

                // Add movement result
                this.Position.X += realDiff;
            }

            // Compute outher actions
            {
                this.OutherVelocity.Y = this.OutherVelocity.Y + Gravitation.Y * 1 / 20;
                var Ydiff: number = 0;
                // Compute platform intersection
                if(this.OutherVelocity.Y <= 0)
                {
                    for(var i = this.Position.Y - 1; i >= this.Position.Y + this.OutherVelocity.Y; i--)
                    {
                        if(Level.PassablenessMap[i][this.Position.X])
                        {
                            this.OutherVelocity.Y = 0;
                            break;
                        }
                        else
                        {
                            Ydiff--;
                        }
                    }

                    this.Position.Y += Ydiff;
                }
                else
                {
                    this.Position.Y += parseInt(this.OutherVelocity.Y.toFixed(0));
                }
            }
        }

        public UpdateInnerOriginRectangle()
        {
            var startOriginPoint: Point = new Point(this.Position.X - ((744 / 4) / (2)), this.Position.Y + ((824 / 4)));
            var endOriginPoint: Point = new Point(startOriginPoint.X + (744 / 4), startOriginPoint.Y - (824 / 4));

            this.OriginInnerRectangle = new Rectangle(startOriginPoint, endOriginPoint);
        }

        public ReactOnPlayerInput()
        {
            var start: Point = new Point(this.Position.X, this.Position.Y + Sizes.PlayerBodyDefaultMultiplied.Height - (Sizes.PlayerBodyDefaultMultiplied.Height * Sizes.PlayerBodyWithWeaponConnection.onHeight)).Translate().ToScreen(Sizes.Canvas.Height);

            // fix for moving camera
            if(FrameOffset.X > 0 && FrameOffset.X < Level.OutherSize.Width - 800)
            {
                start.X = Sizes.Canvas.Width / 2;
            }

            // Look direction setting
            this.LookDirectionIsForward = (start.X < Mouse.X) ? true : false;
            // Compute angle
            var end: Point = new Point(start.X, start.Y);
            var a = Mouse.X - start.X;
            var b = Mouse.Y - end.Y;
            var c = Calculations.Get.Hypotenuse(a, b);
            // Opposite tangens for inverted mouse coordiante system
            this.AngleOfView = -(Math.atan(b / a));
            return;
        }

        private DrawBody()
        {
            //////////////////////////////////////////////////////////////////
            // BODY DRAWING
            // Get body rectangle
            var bodyFirstPoint: Point = new Point(this.Position.X - Sizes.PlayerBodyDefaultMultiplied.Width / 2, this.Position.Y + Sizes.PlayerBodyDefaultMultiplied.Height);
            var bodySecondPoint: Point = new Point(this.Position.X + Sizes.PlayerBodyDefaultMultiplied.Width / 2, this.Position.Y);
            // Convert to screen rectangle
            var bodyScreenRectangle: ScreenRectangle = new ScreenRectangle(bodyFirstPoint.Translate().ToScreen(Sizes.Canvas.Height), bodySecondPoint.Translate().ToScreen(Sizes.Canvas.Height));
            // Getting info about current sprite position
            var bodySpriteStartPoint: Point = (this.LookDirectionIsForward) ? new Point(this.BodySpriteCounter * Sizes.PlayerBodyDefault.Width, 0) : new Point(this.BodySpriteCounter * Sizes.PlayerBodyDefault.Width, Sizes.PlayerBodyDefault.Height);
            // Cleaning body canvas
            BodyContext.clearRect(bodyScreenRectangle.Start.X - 200, bodyScreenRectangle.Start.Y - 200, bodyScreenRectangle.Width + 400, bodyScreenRectangle.Height + 400);
            // Drawing body
            BodyContext.drawImage(this.TeamPresentation.GetTeamBodyPresentation(), bodySpriteStartPoint.X, bodySpriteStartPoint.Y, Sizes.PlayerBodyDefault.Width, Sizes.PlayerBodyDefault.Height, bodyScreenRectangle.Start.X, bodyScreenRectangle.Start.Y, bodyScreenRectangle.Width, bodyScreenRectangle.Height);
        }

        private DrawHead()
        {
            // Part of head sprite
            var headSpriteStartPoint: Point = (this.LookDirectionIsForward) ? new Point(0, 0) : new Point(0, Sizes.PlayerHeadDefault.Height);
            // Get head rectangle
            var bodyWithHead: Point = new Point(this.Position.X, this.Position.Y + Sizes.PlayerBodyDefaultMultiplied.Height - (Sizes.PlayerBodyDefaultMultiplied.Height * Sizes.PlayerBodyWithHeadConnection.onHeight));
            var headBottomPoint: Point = new Point(bodyWithHead.X, bodyWithHead.Y - Sizes.PlayerHeadWithBodyConnection.ConvertToOpposite().onHeight * Sizes.PlayerHeadDefaultMultiplied.Height);

            var headFirstPoint: Point = new Point(headBottomPoint.X - Sizes.PlayerHeadWithBodyConnection.onWidth * Sizes.PlayerHeadDefaultMultiplied.Width, headBottomPoint.Y + Sizes.PlayerHeadDefaultMultiplied.Height);
            var headSecondPoint: Point = new Point(headFirstPoint.X + Sizes.PlayerHeadDefaultMultiplied.Width, headFirstPoint.Y - Sizes.PlayerHeadDefaultMultiplied.Height);

            var headScreenRectangle: ScreenRectangle = new ScreenRectangle(headFirstPoint.Translate().ToScreen(Sizes.Canvas.Height), headSecondPoint.Translate().ToScreen(Sizes.Canvas.Height));

            var headCenterOnCanvas: Point = new Point(headScreenRectangle.Start.X + Sizes.PlayerHead.Width * Sizes.PlayerHeadWithBodyConnection.onWidth, headScreenRectangle.Start.Y + Sizes.PlayerHead.Height * Sizes.PlayerHeadWithBodyConnection.onHeight);

            // offset by first point of head on canvas
            var headCenterOffset: Vector = headCenterOnCanvas.Substract(headScreenRectangle.Start);

            // offset from canvas start point
            headCenterOffset.X = headCenterOffset.X + headScreenRectangle.Start.X;
            headCenterOffset.Y = headCenterOffset.Y + headScreenRectangle.Start.Y;


            HeadContext.translate(headCenterOffset.X, headCenterOffset.Y);
            HeadContext.rotate(-this.OldAngleOfView);
            HeadContext.clearRect(-200, -200, 400, 400);
            HeadContext.translate(-headCenterOffset.X, -headCenterOffset.Y);
            HeadContext.drawImage(this.TeamPresentation.GetTeamHeadPresentation(), headSpriteStartPoint.X, headSpriteStartPoint.Y, Sizes.PlayerHeadDefault.Width, Sizes.PlayerHeadDefault.Height, headScreenRectangle.Start.X, headScreenRectangle.Start.Y, headScreenRectangle.Width, headScreenRectangle.Height);
            HeadContext.translate(headCenterOffset.X, headCenterOffset.Y);
            HeadContext.rotate(this.OldAngleOfView);
            HeadContext.translate(-headCenterOffset.X, -headCenterOffset.Y);

        }

        private DrawWeapon()
        {
            // Part of weapon sprite
            var weaponSpriteStartPoint: Point = (this.LookDirectionIsForward) ? new Point(this.WeaponInfo.ActiveWeapon * Sizes.WeaponDefault.Width, 0) : new Point(this.WeaponInfo.ActiveWeapon * Sizes.WeaponDefault.Width, Sizes.WeaponDefault.Height);
            // Get weapon rectangle
            var bodyFirstPointY = this.Position.Y + Sizes.PlayerBodyDefaultMultiplied.Height;
            var positionOfWeaponCenterOrigin = new Point(this.Position.X, bodyFirstPointY - Sizes.PlayerBodyDefaultMultiplied.Height * Sizes.PlayerBodyWithWeaponConnection.onHeight);

            var weaponStartPointOrigin: Point;
            var weaponEndPointOrigin: Point;
            var weaponScreenRectangle: ScreenRectangle;
            var weaponCenter: Point;

            if(this.LookDirectionIsForward)
            {
                // on right
                weaponStartPointOrigin = new Point(positionOfWeaponCenterOrigin.X - Sizes.WeaponDefaultMultiplied.Width * Sizes.WeaponBody.onWidth, positionOfWeaponCenterOrigin.Y + Sizes.WeaponDefaultMultiplied.Height * Sizes.WeaponBody.onHeight);
                weaponEndPointOrigin = new Point(weaponStartPointOrigin.X + Sizes.WeaponDefaultMultiplied.Width, weaponStartPointOrigin.Y - Sizes.WeaponDefaultMultiplied.Height);
                weaponScreenRectangle = new ScreenRectangle(weaponStartPointOrigin.Translate().ToScreen(Sizes.Canvas.Height), weaponEndPointOrigin.Translate().ToScreen(Sizes.Canvas.Height));
                weaponCenter = new Point(weaponScreenRectangle.Start.X + weaponScreenRectangle.Width * Sizes.WeaponBody.onWidth, weaponScreenRectangle.Start.Y + weaponScreenRectangle.Height * Sizes.WeaponBody.onHeight);
            }
            else
            {
                // on left
                weaponEndPointOrigin = new Point(positionOfWeaponCenterOrigin.X + Sizes.WeaponDefaultMultiplied.Width * Sizes.WeaponBody.onWidth, positionOfWeaponCenterOrigin.Y - Sizes.WeaponDefaultMultiplied.Height * Sizes.WeaponBody.ConvertToOpposite().onHeight);
                weaponStartPointOrigin = new Point(weaponEndPointOrigin.X - Sizes.WeaponDefaultMultiplied.Width, weaponEndPointOrigin.Y + Sizes.WeaponDefaultMultiplied.Height);
                weaponScreenRectangle = new ScreenRectangle(weaponStartPointOrigin.Translate().ToScreen(Sizes.Canvas.Height), weaponEndPointOrigin.Translate().ToScreen(Sizes.Canvas.Height));
                weaponCenter = new Point(weaponScreenRectangle.Start.X + weaponScreenRectangle.Width * Sizes.WeaponBody.ConvertToOpposite().onWidth, weaponScreenRectangle.Start.Y + weaponScreenRectangle.Height * Sizes.WeaponBody.onHeight);
            }

            // Clearing previous state
            WeaponContext.translate(weaponCenter.X, weaponCenter.Y);
            WeaponContext.rotate(-this.OldAngleOfView);
            WeaponContext.clearRect(-400, -400, 1000, 1000);
            WeaponContext.translate(-weaponCenter.X, -weaponCenter.Y);
            // Drawing
            WeaponContext.drawImage(_WeaponNova, weaponSpriteStartPoint.X, weaponSpriteStartPoint.Y, Sizes.WeaponDefault.Width, Sizes.WeaponDefault.Height, weaponScreenRectangle.Start.X, weaponScreenRectangle.Start.Y, weaponScreenRectangle.Width, weaponScreenRectangle.Height);
            // Rotating on actual angle
            WeaponContext.translate(weaponCenter.X, weaponCenter.Y);
            WeaponContext.rotate(this.OldAngleOfView);    // Restoring initial state            
            WeaponContext.translate(-weaponCenter.X, -weaponCenter.Y);


        }

        private _DrawVisibleArea()
        {
            var visibleAreaOriginRectangle: Rectangle = new Rectangle(new Point(FrameOffset.X, FrameOffset.Y + 600), new Point(FrameOffset.X + 800, FrameOffset.Y));
            var va: ScreenRectangle = new ScreenRectangle(visibleAreaOriginRectangle.Start.Translate().ToScreen(Sizes.Canvas.Height), visibleAreaOriginRectangle.End.Translate().ToScreen(Sizes.Canvas.Height));
            BodyContext.fillRect(va.Start.X, va.Start.Y, va.Width, va.Height);
            var playerOriginRectangle: Rectangle = this.OriginInnerRectangle;

            if(Calculations.Get.FastRectangleVisiblilityTest(visibleAreaOriginRectangle, playerOriginRectangle))
            {
                console.log('^_^ visible');
            }
            else
            {
                console.log('-_- invisible');
            }
        }

        private _DrawInnerRectangle()
        {
            var innerToScreen: ScreenRectangle = new ScreenRectangle(this.OriginInnerRectangle.Start.Translate().ToScreen(Sizes.Canvas.Height), this.OriginInnerRectangle.End.Translate().ToScreen(Sizes.Canvas.Height));
            BodyContext.strokeRect(innerToScreen.Start.X, innerToScreen.Start.Y, innerToScreen.Width, innerToScreen.Height);
        }

        public Draw()
        {
            // Draw player parts
            this.DrawBody();
            this.DrawHead();
            this.DrawWeapon();
            this.OldAngleOfView = this.AngleOfView;     // Safe old angle for next context restoring and clearing

        }
    }
}