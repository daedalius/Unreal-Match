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
            console.log('boom!');
            //throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }
    }

    export class Hammer extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponHammerEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 0.5 : 1;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 0 : 0;
        }
    }

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
            return (mode == WeaponMode.Standart) ? 0.5 : 0.4;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 2 : 8;
        }
    }

    export class Biogun extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponBiogunEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 0.5 : 1;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 0 : 0;
        }
    }

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
    }

    export class Linkgun extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponLinkgunEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 0.3 : 0.2;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 0 : 0;
        }
    }

    export class Minigun extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponMinigunEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 0.2 : 0.7;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 5 : 15;
        }
    }

    export class FlackCannon extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponFlackCannonEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 1 : 1;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 20 : 0;
        }
    }
    export class RocketLauncher extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponRocketLauncherEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 0.9 : 0.9;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 0 : 10;
        }
    }

    export class SniperRifle extends Weapon
    {
        // Return multiplier for computing offset of shot vector
        public GetShotOffsetMultiplier(): Entities.Multiplier
        {
            return Sizes.WeaponSniperRifleEnd;
        }

        // Delay in seconds
        public GetDelay(mode: WeaponMode): number
        {
            return (mode == WeaponMode.Standart) ? 0.6 : 0.6;
        }

        // Return max angle of bullet/shell spread
        public GetSpreadAngle(mode: WeaponMode)
        {
            return (mode == WeaponMode.Standart) ? 0 : 0;
        }
    }
} 