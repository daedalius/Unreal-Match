module Weapons
{
    export class Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }

        // Construct shot from weapon
        public MakeShot(mode: WeaponMode): any
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }

        // Return weapon according WeaponType enum
        public ToEnum(): WeaponType
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }

        public ComputeShotPosition(angle: number, weaponEnd: Entities.Multiplier): Entities.Point
        {
            var position: Point = null;
            // Computing shot start position
            var anyWeaponWidth = Sizes._originSizes.PlayerWeapon.Width;
            var anyWeaponHeight = Sizes._originSizes.PlayerWeapon.Height;
            var fullEnforserWidth = anyWeaponWidth * weaponEnd.onWidth;
            var fullEnforserHeight = anyWeaponHeight * weaponEnd.onHeight;

            var cLength = fullEnforserWidth * (1 - Sizes.WeaponBody.onWidth);
            var A = new Point(CurrentPlayer.Position.X, CurrentPlayer.Position.Y + Sizes._originSizes.PlayerBody.Height * (1 - Sizes.PlayerBodyWithWeaponConnection.onHeight));

            if(CurrentPlayer.LookDirectionIsForward)
            {
                var aLength = cLength * Math.sin(angle);
                var bLength = cLength * Math.cos(angle);
                position = new Point(A.X + bLength, (angle > 0) ? A.Y + Math.abs(aLength) : A.Y - Math.abs(aLength));
            }
            else
            {
                var aLength = cLength * Math.sin(-angle);
                var bLength = cLength * Math.cos(-angle);
                position = new Point(A.X - bLength, (angle > 0) ? A.Y + Math.abs(aLength) : A.Y - Math.abs(aLength));
            }

            //// Output on TestCanvas
            //var testPoint = position.Translate().ToScreen(Sizes.Canvas.Height);
            //TestContext.moveTo(testPoint.X, testPoint.Y);
            //TestContext.lineTo(testPoint.X + 1, testPoint.Y + 1);
            //TestContext.strokeStyle = "#FF0000";
            //TestContext.stroke();
            //console.log('x: ' + position.X + ', y: ' + position.Y);

            return position;
        }
    }

    //export class Hammer extends Weapon
    //{
    //    // Return multiplier for computing offset of shot vector
    //    public GetShotOffsetMultiplier(): Entities.Multiplier
    //    {
    //        return Sizes.WeaponHammerEnd;
    //    }

    //    // Delay in seconds
    //    public GetDelay(mode: WeaponMode): number
    //    {
    //        return (mode == WeaponMode.Standart) ? 0.5 : 1;
    //    }

    //    // Return max angle of bullet/shell spread
    //    public GetSpreadAngle(mode: WeaponMode)
    //    {
    //        return (mode == WeaponMode.Standart) ? 0 : 0;
    //    }

    //    // Return weapon according WeaponType enum
    //    public ToEnum(): WeaponType
    //    {
    //        return WeaponType.Hammer;
    //    }
    //}

    export class Enforcer extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponEnforcerEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 0.5 : 0.38;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 2 : 8;
        }

        // Return weapon according WeaponType enum
        public ToEnum(): WeaponType
        {
            return WeaponType.Enforcer;
        }

        // Construct shot from weapon
        public MakeShot(mode: WeaponMode): Shot
        {
            var angle: number = (CurrentPlayer.LookDirectionIsForward) ? CurrentPlayer.AngleOfView : -CurrentPlayer.AngleOfView;
            var direction = (CurrentPlayer.LookDirectionIsForward) ? "Right" : "Left";
            var position: Point = this.ComputeShotPosition(angle, Sizes.WeaponEnforcerEnd);

            // Play sound and return computed shot
            CurrentPlayer.Sounds.WeaponBundle.EnforcerFire.play();
            return new EnforcerShot(CurrentPlayer.ID, WeaponType.Enforcer, mode, position, angle, direction, CurrentPlayer.Sounds.WeaponBundle.EnforcerFire);
        }
    }

    //export class Biogun extends Weapon
    //{
    //    // Return multiplier for computing offset of shot vector
    //    public GetShotOffsetMultiplier(): Entities.Multiplier
    //    {
    //        return Sizes.WeaponBiogunEnd;
    //    }

    //    // Delay in seconds
    //    public GetDelay(mode: WeaponMode): number
    //    {
    //        return (mode == WeaponMode.Standart) ? 0.5 : 1;
    //    }

    //    // Return max angle of bullet/shell spread
    //    public GetSpreadAngle(mode: WeaponMode)
    //    {
    //        return (mode == WeaponMode.Standart) ? 0 : 0;
    //    }

    //    // Return weapon according WeaponType enum
    //    public ToEnum(): WeaponType
    //    {
    //        return WeaponType.Biogun;
    //    }
    //}

    export class ShockRifle extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponShockRifleEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 1 : 0.7;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 0 : 0;
        }

        // Return weapon according WeaponType enum
        public ToEnum(): WeaponType
        {
            return WeaponType.Shockrifle;
        }

        // Construct shot from weapon
        public MakeShot(mode: WeaponMode): Shot
        {
            var angle: number = (CurrentPlayer.LookDirectionIsForward) ? CurrentPlayer.AngleOfView : -CurrentPlayer.AngleOfView;
            var direction = (CurrentPlayer.LookDirectionIsForward) ? "Right" : "Left";
            var position: Point = this.ComputeShotPosition(angle, Sizes.WeaponShockRifleEnd);

            // Play sound and return computed shot
            if(mode == WeaponMode.Standart)
            {
                CurrentPlayer.Sounds.WeaponBundle.AsmdFire.play();
                return new AsmdShot(CurrentPlayer.ID, WeaponType.Shockrifle, mode, position, angle, direction, CurrentPlayer.Sounds.WeaponBundle.EnforcerFire);
            }
            else
            {
                CurrentPlayer.Sounds.WeaponBundle.AsmdAltFire.play();
                return new ASMDShell(CurrentPlayer.ID, WeaponType.Shockrifle, mode, position, angle, direction, CurrentPlayer.Sounds.WeaponBundle.AsmdAltFire);
            }
        }
    }

    //export class Linkgun extends Weapon
    //{
    //    // Return multiplier for computing offset of shot vector
    //    public GetShotOffsetMultiplier(): Entities.Multiplier
    //    {
    //        return Sizes.WeaponLinkgunEnd;
    //    }

    //    // Delay in seconds
    //    public GetDelay(mode: WeaponMode): number
    //    {
    //        return (mode == WeaponMode.Standart) ? 0.3 : 0.2;
    //    }

    //    // Return max angle of bullet/shell spread
    //    public GetSpreadAngle(mode: WeaponMode)
    //    {
    //        return (mode == WeaponMode.Standart) ? 0 : 0;
    //    }

    //    // Return weapon according WeaponType enum
    //    public ToEnum(): WeaponType
    //    {
    //        return WeaponType.Linkgun;
    //    }
    //}

    //export class Minigun extends Weapon
    //{
    //    // Return multiplier for computing offset of shot vector
    //    public GetShotOffsetMultiplier(): Entities.Multiplier
    //    {
    //        return Sizes.WeaponMinigunEnd;
    //    }

    //    // Delay in seconds
    //    public GetDelay(mode: WeaponMode): number
    //    {
    //        return (mode == WeaponMode.Standart) ? 0.2 : 0.7;
    //    }

    //    // Return max angle of bullet/shell spread
    //    public GetSpreadAngle(mode: WeaponMode)
    //    {
    //        return (mode == WeaponMode.Standart) ? 5 : 15;
    //    }

    //    // Return weapon according WeaponType enum
    //    public ToEnum(): WeaponType
    //    {
    //        return WeaponType.Minigun;
    //    }
    //}

    //export class FlackCannon extends Weapon
    //{
    //    // Return multiplier for computing offset of shot vector
    //    public GetShotOffsetMultiplier(): Entities.Multiplier
    //    {
    //        return Sizes.WeaponFlackCannonEnd;
    //    }

    //    // Delay in seconds
    //    public GetDelay(mode: WeaponMode): number
    //    {
    //        return (mode == WeaponMode.Standart) ? 1 : 1;
    //    }

    //    // Return max angle of bullet/shell spread
    //    public GetSpreadAngle(mode: WeaponMode)
    //    {
    //        return (mode == WeaponMode.Standart) ? 20 : 0;
    //    }

    //    // Return weapon according WeaponType enum
    //    public ToEnum(): WeaponType
    //    {
    //        return WeaponType.Flackcannon;
    //    }
    //}

    //export class RocketLauncher extends Weapon
    //{
    //    // Return multiplier for computing offset of shot vector
    //    public GetShotOffsetMultiplier(): Entities.Multiplier
    //    {
    //        return Sizes.WeaponRocketLauncherEnd;
    //    }

    //    // Delay in seconds
    //    public GetDelay(mode: WeaponMode): number
    //    {
    //        return (mode == WeaponMode.Standart) ? 0.9 : 0.9;
    //    }

    //    // Return max angle of bullet/shell spread
    //    public GetSpreadAngle(mode: WeaponMode)
    //    {
    //        return (mode == WeaponMode.Standart) ? 0 : 10;
    //    }

    //    // Return weapon according WeaponType enum
    //    public ToEnum(): WeaponType
    //    {
    //        return WeaponType.Rocketlauncher;
    //    }
    //}

    //export class SniperRifle extends Weapon
    //{
    //    // Return multiplier for computing offset of shot vector
    //    public GetShotOffsetMultiplier(): Entities.Multiplier
    //    {
    //        return Sizes.WeaponSniperRifleEnd;
    //    }

    //    // Delay in seconds
    //    public GetDelay(mode: WeaponMode): number
    //    {
    //        return (mode == WeaponMode.Standart) ? 0.6 : 0.6;
    //    }

    //    // Return max angle of bullet/shell spread
    //    public GetSpreadAngle(mode: WeaponMode)
    //    {
    //        return (mode == WeaponMode.Standart) ? 0 : 0;
    //    }

    //    // Return weapon according WeaponType enum
    //    public ToEnum(): WeaponType
    //    {
    //        return WeaponType.Sniperrifle;
    //    }
    //}
} 