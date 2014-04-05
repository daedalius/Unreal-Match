module Weapons
{
    export class WeaponsInfo
    {
        public Weapons: Array<Weapon>;
        public ActiveWeapon: WeaponType;
        public Spritesheet: HTMLImageElement;

        constructor(teamWeapons: HTMLImageElement)
        {
            this.Spritesheet = teamWeapons;

            this.Weapons = new Array<Weapon>();

            this.Weapons[0] = new Hammer();
            this.Weapons[1] = new Enforcer();
            this.Weapons[2] = new Biogun();
            this.Weapons[3] = new Linkgun();
            this.Weapons[4] = new ShockRifle();
            this.Weapons[5] = new Minigun();
            this.Weapons[6] = new FlackCannon();
            this.Weapons[7] = new RocketLauncher();
            this.Weapons[8] = new SniperRifle();

            this.ActiveWeapon = WeaponType.Enforcer;
        }
    }
} 