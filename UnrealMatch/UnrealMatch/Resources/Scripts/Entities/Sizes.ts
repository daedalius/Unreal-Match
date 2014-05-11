module Entities
{
    export class SizesSet
    {
        ////////////////////////////////////////////////////////////////////////
        // Origin sizes and proportions    
        private originSizes: SizesSet;
        // Multiplier which mean in how many times new values bigger than old ones
        private k: number;

        public K(): number
        {
            return this.k;
        }

        // Canvas size
        public Canvas: Size;
        public CanvasDefault: Size;

        // Players sizes
        public PlayerBody: Size;
        public PlayerHead: Size;
        public PlayerWeapon: Size;

        public WeaponDefault: Size;
        public PlayerBodyDefault: Size;
        public PlayerHeadDefault: Size;

        public WeaponDefaultMultiplied: Size;
        public PlayerBodyDefaultMultiplied: Size;
        public PlayerHeadDefaultMultiplied: Size;

        ////////////////////////////////////////////////////////////////////////
        // Players multipliers
        public PlayerHeadWithBodyConnection: Multiplier;
        public PlayerBodyWithHeadConnection: Multiplier;
        public PlayerBodyWithWeaponConnection: Multiplier;

        // Weapons multipliers        
        public WeaponBody: Multiplier;

        public WeaponHammerEnd: Multiplier;
        public WeaponEnforcerEnd: Multiplier;
        public WeaponBiogunEnd: Multiplier;
        public WeaponShockRifleEnd: Multiplier;
        public WeaponLinkgunEnd: Multiplier;
        public WeaponMinigunEnd: Multiplier;
        public WeaponFlackCannonEnd: Multiplier;
        public WeaponRocketLauncherEnd: Multiplier;
        public WeaponSniperRifleEnd: Multiplier;

        constructor(startWidth?: number)
        {
            if(startWidth)
            {
                this.originSizes = new SizesSet();

                ////////////////////////////////////////////////////////////////////////
                // Sizes
                // all others standart values add here...
                this.originSizes.Canvas = new Size(800, 600);
                // Players
                this.originSizes.PlayerHead = new Size(32, 26);
                this.originSizes.PlayerBody = new Size(106, 136);
                this.originSizes.PlayerWeapon = new Size(107, 38);

                // Default sizes
                this.CanvasDefault = new Size(800, 600);
                this.WeaponDefault = new Size(427, 150);
                this.PlayerHeadDefault = new Size(128, 104);
                this.PlayerBodyDefault = new Size(425, 544);

                ////////////////////////////////////////////////////////////////////////
                // Multipliers
                // Players
                this.PlayerHeadWithBodyConnection = new Multiplier(0.5, 0.7);
                this.PlayerBodyWithHeadConnection = new Multiplier(0.5, 0.01);
                this.PlayerBodyWithWeaponConnection = new Multiplier(0.5, 0.1728);
                // Weapons
                this.WeaponBody = new Multiplier(0.131, 0.43);

                this.WeaponHammerEnd = new Multiplier(0.859, 0.43);
                this.WeaponEnforcerEnd = new Multiplier(0.756, 0.43);
                this.WeaponBiogunEnd = new Multiplier(0.848, 0.43);
                this.WeaponShockRifleEnd = new Multiplier(0.932, 0.43);
                this.WeaponLinkgunEnd = new Multiplier(0.95, 0.43);
                this.WeaponMinigunEnd = new Multiplier(0.97, 0.43);
                this.WeaponFlackCannonEnd = new Multiplier(0.918, 0.43);
                this.WeaponRocketLauncherEnd = new Multiplier(0.932, 0.43);
                this.WeaponSniperRifleEnd = new Multiplier(0.95, 0.43);

                this.ComputeActualSizes(startWidth);
            }
        }

        public ComputeActualSizes(actualCanvasWidth: number)
        {
            // compute multiplier
            this.k = actualCanvasWidth / this.originSizes.Canvas.Width;

            // compute all actual sizes
            this.Canvas = this.originSizes.Canvas.ReturnMultiplied(this.k);
            this.PlayerBody = this.originSizes.PlayerBody.ReturnMultiplied(this.k);
            this.PlayerHead = this.originSizes.PlayerHead.ReturnMultiplied(this.k);
            this.PlayerWeapon = this.originSizes.PlayerWeapon.ReturnMultiplied(this.k);

            this.WeaponDefaultMultiplied = this.WeaponDefault.ReturnMultiplied(0.25);
            this.PlayerBodyDefaultMultiplied = this.PlayerBodyDefault.ReturnMultiplied(0.25);
            this.PlayerHeadDefaultMultiplied = this.PlayerHeadDefault.ReturnMultiplied(0.25);
        }
    }
}