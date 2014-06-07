using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UnrealMatch.Entities.Weapons
{
    public class PlayerAmmo
    {
        public int[] Ammo;

        public PlayerAmmo()
        {
            this.Ammo = new int[9];
            this[WeaponType.Enforcer] = 25;
            this[WeaponType.Shockrifle] = 5;
        }

        public void Decrease(Shot shot)
        {
            switch (shot.Weapon)
            {
                case WeaponType.Hammer:
                    break;
                case WeaponType.Enforcer:
                    {
                        this[WeaponType.Enforcer] = (this[WeaponType.Enforcer] > 0) ? this[WeaponType.Enforcer] - 1 : this[WeaponType.Enforcer];
                        break;
                    }
                case WeaponType.Biogun:
                    break;
                case WeaponType.Shockrifle:
                    {
                        this[WeaponType.Shockrifle] = (this[WeaponType.Shockrifle] > 0) ? this[WeaponType.Shockrifle] - 1 : this[WeaponType.Shockrifle];
                        break;
                    }
                case WeaponType.Linkgun:
                    break;
                case WeaponType.Minigun:
                    break;
                case WeaponType.Flackcannon:
                    break;
                case WeaponType.Rocketlauncher:
                    break;
                case WeaponType.Sniperrifle:
                    break;
                default:
                    break;
            }
        }

        public int this[WeaponType type]
        {
            get { return Ammo[(int)type]; }
            set { Ammo[(int)type] = value; }
        }
    }
}