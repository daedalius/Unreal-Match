module Weapons
{
    export class PlayerAmmo
    {
        public Ammo: Array<number>;

        constructor()
        {
            this.Ammo = new Array<number>(9);
        }
    }
} 