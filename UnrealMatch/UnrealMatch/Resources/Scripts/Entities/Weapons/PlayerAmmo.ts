module Weapons
{
    export class PlayerAmmo
    {
        public Ammo: Array<number>;

        constructor()
        {
            this.Ammo = new Array<number>(9);
            this.Ammo[WeaponType.Enforcer] = 25;
            this.Ammo[WeaponType.Shockrifle] = 5;
        }
    }
} 