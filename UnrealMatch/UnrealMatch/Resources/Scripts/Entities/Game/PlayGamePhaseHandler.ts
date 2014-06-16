/// <reference path="../../Shells/BlastManager.ts" />
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
                var playersStats = gameStateObject.PlayerStatistic;

                for(var i = 0; i < playersStats.length; i++)
                {
                    var id = playersStats[i].Number;

                    Players[id].Score = playersStats[i].Score;
                }
                GsHUD.Refresh();

                var players = gameStateObject.Players;

                // Getting info about shells and blasts
                Shells.ShellManager.Refresh(gameStateObject.Shells);
                Shells.BlastManager.Animate(gameStateObject.Blasts);

                // Handling new game state
                for(var i = 0; i < players.length; i++)
                {
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
                    // For current player
                    else
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

                // Erase to prevent indelible image
                // CurrentPlayer is dead. Need to erase all players
                if(players[CurrentPlayer.ID].HealthStatus.DeathFlag)
                {
                    for(var pId = 0; pId < Players.length; pId++)
                    {
                        Players[pId].Presentation.Erase();
                    }
                }
                else
                {
                    // Search for dead enemies
                    for(var pId = 0; pId < Players.length; pId++)
                    {
                        // Erase only dead enemy
                        if(players[pId].HealthStatus.DeathFlag)
                        {
                            Players[pId].Presentation.Erase();
                        }
                    }
                }
            }
            else
            {
                if(gameStateObject.Stage == "Stop")
                {
                    var playersStats = gameStateObject.PlayerStatistic;
                    // Write winner ID
                    var winnerId: number = <number>gameStateObject.WinnerId;

                    // Refresh table in last time
                    for(var i = 0; i < playersStats.length; i++)
                    {
                        var id = playersStats[i].Number;

                        Players[id].Score = playersStats[i].Score;
                    }
                    GsHUD.Refresh();

                    // Hide unusual HUD panels
                    WHUD.Hide();
                    GsHUD.Show();
                    SHUD.Hide();

                    // Check last phase
                    Game.GameInfo.Phase = Game.GamePhase.Stop;

                    // Detach input handlers
                    IsKeyboardInputEnable = false;
                    IsMouseInputEnable = false;

                    if(winnerId != CurrentPlayer.ID)
                    {
                        SoundManager.Announcer.Lostmatch.play();
                    }
                    else
                    {
                        SoundManager.Announcer.Winner.play();
                    }
                }
            }
        }

        public FormPlayerState(): MessageTypes.StateToSend
        {
            return new MessageTypes.PlayStateToSend(CurrentPlayer.ID, CurrentPlayer.Position, CurrentPlayer.LookDirectionIsForward, CurrentPlayer.AngleOfView, CurrentPlayer.Weapon.ToEnum(), GameInfo.CloneShots());
        }
    }
}