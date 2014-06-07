module Weapons
{
    export class PlayerMunitions
    {
        public Ammo: Array<number>;
        public Weapons: Array<boolean>;

        constructor()
        {
            // Weapons
            this.Weapons = new Array<boolean>(9);
            Calculations.Get.FilledArray(this.Weapons, false);
            this.Weapons[WeaponType.Enforcer] = true;

            // Ammo
            this.Ammo = new Array<number>(9);
            Calculations.Get.FilledArray(this.Ammo, 0);
            this.Ammo[WeaponType.Enforcer] = 25;
        }
    }
} 