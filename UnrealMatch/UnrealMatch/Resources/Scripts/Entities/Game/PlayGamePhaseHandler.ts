/// <reference path="../MessageTypes/StateToSend.ts" />
/// <reference path="../MessageTypes/PlayStateToSend.ts" />
module Game
{
    export class PlayGamePhaseHandler extends GamePhaseHandler
    {
        public Handle(gameStateObject: any): void
        {
            if(gameStateObject.Stage == "Play")
            {
                var players = gameStateObject.Players;

                for(var i = 0; i < players.length; i++)
                {
                    if(i != CurrentPlayer.ID)
                    {
                        Players[i].Position.X = players[i].Position.X;
                        Players[i].Position.Y = players[i].Position.Y;
                        Players[i].AngleOfView = players[i].AngleOfView;
                        Players[i].LookDirectionIsForward = players[i].Direction;

                        Weapons.ClientWeaponManager.ChangeEnemyWeapon(Players[i], players[i].Weapon);
                    }
                    else
                    {
                        // Get info about awailable weapons
                        Weapons.ClientWeaponManager.SetWeaponAvailability(Weapons.WeaponType.Enforcer, players[i].Munitions.Weapons[Weapons.WeaponType.Enforcer]);
                        Weapons.ClientWeaponManager.SetWeaponAvailability(Weapons.WeaponType.Shockrifle, players[i].Munitions.Weapons[Weapons.WeaponType.Shockrifle]);

                        // Get info about awailable ammo
                        Weapons.ClientWeaponManager.SetAmmo(Weapons.WeaponType.Enforcer, players[i].Munitions.Ammo[Weapons.WeaponType.Enforcer]);
                        Weapons.ClientWeaponManager.SetAmmo(Weapons.WeaponType.Shockrifle, players[i].Munitions.Ammo[Weapons.WeaponType.Shockrifle]);
                    }
                }

                this.FormPlayerState();
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