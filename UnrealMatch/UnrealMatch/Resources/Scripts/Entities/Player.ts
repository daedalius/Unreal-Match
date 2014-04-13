module Entities
{
    export class Player extends Objects.GameObject
    {
        // Main info
        public Name: string;
        public ID: number;
        // All about weapon
        public WeaponInfo: Weapons.WeaponsInfo;
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
        public Presentation: PlayerPresentation;

        constructor(name: string, id: number, team: Game.TeamType, originStartBottomPoint: Point, headContext: CanvasRenderingContext2D, bodyContext: CanvasRenderingContext2D, weaponContext: CanvasRenderingContext2D)
        {
            this.Name = name;
            this.ID = id;

            // few constraints
            // 1. player after creating look straight on right
            // 2. player after creating hold enforcer
            // 3. player after creating are staying

            this.WeaponInfo = new Weapons.WeaponsInfo();
            // Start Weapon
            this.WeaponInfo.ActiveWeapon = Weapons.WeaponType.Enforcer;

            // On right
            this.AngleOfView = 0;
            this.OldAngleOfView = 0;
            this.LookDirectionIsForward = true;
            this.OutherVelocity = new Vector(0, 0);

            this.goalVelocity = new Vector(0, 0);
            this.selfVelocity = new Vector(0, 0);

            // Inner rectangle computing
            var startOriginPoint: Point = new Point(originStartBottomPoint.X - ((744 / 4) / (2)), originStartBottomPoint.Y + ((824 / 4)));
            var endOriginPoint: Point = new Point(startOriginPoint.X + (744 / 4), startOriginPoint.Y - (824 / 4));
            var foo = this;
            // super call
            super(originStartBottomPoint, new Rectangle(startOriginPoint, endOriginPoint));

            // After instance creation continue construct presentation and weapons
            this.Presentation = new PlayerPresentation(this, team, headContext, bodyContext, weaponContext);
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
            if(this.IsOnGround())
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

        public Draw()
        {
            this.Presentation.Draw();
            // Safe old angle for next context restoring and clearing
            this.OldAngleOfView = this.AngleOfView;
        }

        public HandleAnimationTick()
        {
            if(this.goalVelocity.X != 0 && this.IsOnGround())
            {
                this.Presentation.NextFrame();
            }
            else
            {
                this.Presentation.StopFrame();
            }
        }

        public IsOnGround() : boolean
        {
            return Level.PassablenessMap[this.Position.Y - 1][this.Position.X];
        }
    }
}