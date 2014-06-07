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
                        Players[i].LookDirectionIsForward = players[i].IsForwardView;

                        // [TODO] - Hardcode for 2 available weapons
                        Players[i].Weapon = (players[i].Weapon == Weapons.WeaponType.Enforcer) ? new Weapons.Enforcer() : new Weapons.ShockRifle();
                    }
                    else
                    {
                        // Info about awailable weapons
                        CurrentPlayer.Munitions.Weapons[Weapons.WeaponType.Enforcer] = players[i].Munitions.Weapons[Weapons.WeaponType.Enforcer];
                        CurrentPlayer.Munitions.Weapons[Weapons.WeaponType.Shockrifle] = players[i].Munitions.Weapons[Weapons.WeaponType.Shockrifle];

                        // Info about awailable ammo
                        CurrentPlayer.Munitions.Ammo[Weapons.WeaponType.Enforcer] = players[i].Munitions.Ammo[Weapons.WeaponType.Enforcer];
                        CurrentPlayer.Munitions.Ammo[Weapons.WeaponType.Shockrifle] = players[i].Munitions.Ammo[Weapons.WeaponType.Shockrifle];

                        WHUD.Refresh();
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