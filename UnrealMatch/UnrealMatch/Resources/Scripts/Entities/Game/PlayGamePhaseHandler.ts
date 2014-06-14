/// <reference path="../MessageTypes/StateToSend.ts" />
/// <reference path="../MessageTypes/PlayStateToSend.ts" />
module Game
{
    export class PlayGamePhaseHandler extends GamePhaseHandler
    {
        public Handle(gameStateObject: any): void
        {
            var needToEraseAllPlayers: boolean = false;

            if(gameStateObject.Stage == "Play")
            {
                var players = gameStateObject.Players;

                for(var i = 0; i < players.length; i++)
                {
                    // Decide if it need to erase player from canvas to prevent indelible image
                    if(players[i].HealthStatus.DeathFlag)
                    {
                        needToEraseAllPlayers = true;
                    }

                    // For enemies
                    if(i != CurrentPlayer.ID)
                    {
                        var isAnimationNeeded = (Players[i].Position.X !== players[i].Position.X) && (Players[i].Position.Y === players[i].Position.Y);

                        if(isAnimationNeeded)
                        {
                            Players[i].Presentation.NextFrame();
                        }
                        else
                        {
                            Players[i].Presentation.StopFrame();
                        }

                        Players[i].Position.X = players[i].Position.X;
                        Players[i].Position.Y = players[i].Position.Y;
                        Players[i].AngleOfView = players[i].AngleOfView;
                        Players[i].LookDirectionIsForward = players[i].Direction;
                        Weapons.ClientWeaponManager.ChangeEnemyWeapon(Players[i], players[i].Weapon);
                    }
                    else
                    // For current player
                    {
                        // Respawn after death means players teleportation
                        if(players[i].HealthStatus.DeathFlag)
                        {
                            CurrentPlayer.Position.X = players[i].Position.X;
                            CurrentPlayer.Position.Y = players[i].Position.Y;
                        }

                        SHUD.SetHP(players[i].HealthStatus.HP.toString());
                        SHUD.SetArmour(players[i].HealthStatus.Armour.toString());

                        // Get info about awailable weapons
                        Weapons.ClientWeaponManager.SetWeaponAvailability(Weapons.WeaponType.Enforcer, players[i].Munitions.Weapons[Weapons.WeaponType.Enforcer]);
                        Weapons.ClientWeaponManager.SetWeaponAvailability(Weapons.WeaponType.Shockrifle, players[i].Munitions.Weapons[Weapons.WeaponType.Shockrifle]);

                        // Get info about awailable ammo
                        Weapons.ClientWeaponManager.SetAmmo(Weapons.WeaponType.Enforcer, players[i].Munitions.Ammo[Weapons.WeaponType.Enforcer]);
                        Weapons.ClientWeaponManager.SetAmmo(Weapons.WeaponType.Shockrifle, players[i].Munitions.Ammo[Weapons.WeaponType.Shockrifle]);
                    }
                }

                // Erase if it need
                if(needToEraseAllPlayers)
                {
                    for(var i = 0; i < Players.length; i++)
                    {
                        Players[i].Presentation.Erase();
                        Players[i].Presentation.Draw();
                    }
                }


                //this.FormPlayerState();
            }
            else
            {
                if(gameStateObject.Stage == "Stop")
                {
                    console.log('Currrent game is over');
                }
            }
        }

        public FormPlayerState(): MessageTypes.StateToSend
        {
            return new MessageTypes.PlayStateToSend(CurrentPlayer.ID, CurrentPlayer.Position, CurrentPlayer.LookDirectionIsForward, CurrentPlayer.AngleOfView, CurrentPlayer.Weapon.ToEnum(), GameInfo.CloneShots());
        }
    }
}