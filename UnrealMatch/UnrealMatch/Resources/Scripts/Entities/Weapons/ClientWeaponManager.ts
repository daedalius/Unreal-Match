module Weapons
{
    export class ClientWeaponManager
    {
        public static ShotDelay: number;
        public static DelayInterval: number;

        public static Init()
        {
            ClientWeaponManager.ShotDelay = 0;
        }

        public static OpenFire(event: MouseEvent)
        {
            // If player already shooting from other weapon mode
            if(ClientWeaponManager.DelayInterval)
            {
                ClientWeaponManager.StopFire();
            }

            ClientWeaponManager.DelayInterval = setInterval(function()
            {
                var numb = event.button;

                switch(numb)
                {
                    case 0:
                        {
                            // Left button - main firemode
                            var weaponDelay = CurrentPlayer.Weapon.GetDelay(Weapons.WeaponMode.Standart) * 1000;
                            if(ClientWeaponManager.ShotDelay == 0)
                            {
                                var shot = CurrentPlayer.Weapon.MakeShot(Weapons.WeaponMode.Standart);
                                if(shot != null)
                                {
                                    Game.GameInfo.AddShotInSendQueue(shot);
                                    ClientWeaponManager.ShotDelay = weaponDelay;
                                }
                            }
                            break;
                        }
                    case 2:
                        {
                            // Right button - alt firemode
                            var weaponDelay = CurrentPlayer.Weapon.GetDelay(Weapons.WeaponMode.Alternate) * 1000;
                            if(ClientWeaponManager.ShotDelay == 0)
                            {
                                var shot = CurrentPlayer.Weapon.MakeShot(Weapons.WeaponMode.Alternate);

                                if(shot != null)
                                {
                                    Game.GameInfo.AddShotInSendQueue(shot);
                                    ClientWeaponManager.ShotDelay = weaponDelay;
                                }
                            }
                            break;
                        }
                }

            }, 50);
        }

        public static StopFire()
        {
            clearInterval(ClientWeaponManager.DelayInterval);
        }

        public static DecreaseShotDelay(quantity: number)
        {
            ClientWeaponManager.ShotDelay = (ClientWeaponManager.ShotDelay <= quantity) ? 0 : ClientWeaponManager.ShotDelay - quantity;
        }

        public static SetWeaponAvailability(type: WeaponType, isAwailable: boolean)
        {
            CurrentPlayer.Munitions.Weapons[type] = isAwailable;
            WHUD.Refresh();
        }

        public static SetAmmo(type: WeaponType, quantity: number)
        {
            CurrentPlayer.Munitions.Ammo[type] = quantity;
            WHUD.Refresh();
        }

        public static ChangeEnemyWeapon(enemy: Entities.Player, type: WeaponType)
        {
            switch(type)
            {
                case (WeaponType.Enforcer):
                    {
                        enemy.Weapon = new Enforcer();
                        break;
                    }

                case (WeaponType.Shockrifle):
                    {
                        enemy.Weapon = new ShockRifle();
                        break;
                    }
            }
        }
        public static TryChangeWeapon(type: WeaponType)
        {
            switch(type)
            {
                case WeaponType.Enforcer: {
                        if(CurrentPlayer.Munitions.Weapons[Weapons.WeaponType.Enforcer])
                        {
                            CurrentPlayer.Weapon = new Weapons.Enforcer();
                            CurrentPlayer.Sounds.WeaponBundle.EnforcerSelect.play();
                            WHUD.Refresh();
                        }
                        break;
                    }

                case WeaponType.Shockrifle:
                    {
                        if(CurrentPlayer.Munitions.Weapons[Weapons.WeaponType.Shockrifle])
                        {
                            CurrentPlayer.Weapon = new Weapons.ShockRifle();
                            CurrentPlayer.Sounds.WeaponBundle.AsmdSelect.play();
                            WHUD.Refresh();
                        }
                        break;
                    }
            }
        }
    }
} 