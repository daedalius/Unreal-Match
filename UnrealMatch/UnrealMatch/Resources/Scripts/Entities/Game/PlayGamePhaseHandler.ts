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
                var oldFrags = CurrentPlayer.Score;

                var playersStats = gameStateObject.PlayerStatistic;

                for(var i = 0; i < playersStats.length; i++)
                {
                    var id = playersStats[i].Number;
                    Players[id].Score = playersStats[i].Score;
                }

                var fragsDelta = CurrentPlayer.Score - oldFrags;

                GsHUD.Refresh();

                var players = gameStateObject.Players;

                // Getting info about shells and blasts
                Shells.ShellManager.Refresh(gameStateObject.Shells);
                Shells.BlastManager.Handle(gameStateObject.Blasts);

                // In shells
                for(var i = 0; i < gameStateObject.Shots.length; i++)
                {
                    var shot = gameStateObject.Shots[i];

                    // need to sound enemies shots
                    if(shot.PlayerId != CurrentPlayer.ID)
                    {
                        var enemy = Players[shot.PlayerId];

                        // Positioning in 2D
                        var yDiff = enemy.Position.Y - CurrentPlayer.Position.Y;
                        var xDiff = enemy.Position.X - CurrentPlayer.Position.X;

                        // Expanding the range to cover a greater distance in the function with the limit values in 1000
                        yDiff = yDiff / 300;
                        xDiff = xDiff / 300;

                        switch(shot.Weapon)
                        {
                            case Weapons.WeaponType.Enforcer:
                                {
                                    // Enforcer shot
                                    enemy.Sounds.WeaponBundle.EnforcerFire.pos3d(xDiff, yDiff, 0);
                                    enemy.Sounds.WeaponBundle.EnforcerFire.play();
                                    break;
                                }
                            case Weapons.WeaponType.Shockrifle:
                                {
                                    switch(shot.Mode)
                                    {
                                        case Weapons.WeaponMode.Standart:
                                            {
                                                // ASMD shot
                                                enemy.Sounds.WeaponBundle.AsmdFire.pos3d(xDiff, yDiff, 0);
                                                enemy.Sounds.WeaponBundle.AsmdFire.play();
                                                break;
                                            }
                                        case Weapons.WeaponMode.Alternate:
                                            {
                                                // ASMD shell
                                                enemy.Sounds.WeaponBundle.AsmdAltFire.pos3d(xDiff, yDiff, 0);
                                                enemy.Sounds.WeaponBundle.AsmdAltFire.play();
                                                break;
                                            }
                                    }
                                    break;
                                }
                        }

                    }
                }


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


                            CurrentPlayer.AnnouncerKillsState = new SoundManager.PlayerAnnouncerStartState(0);
                        }
                        else
                        {
                            CurrentPlayer.AnnouncerKillsState.React(CurrentPlayer.Score, fragsDelta);
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
                    CurrentPlayer.Sounds.Death.play();
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
                            // Positioning in 2D
                            var yDiff = Players[pId].Position.Y - CurrentPlayer.Position.Y;
                            var xDiff = Players[pId].Position.X - CurrentPlayer.Position.X;

                            // Expanding the range to cover a greater distance in the function with the limit values in 1000
                            yDiff = yDiff / 300;
                            xDiff = xDiff / 300;

                            Players[pId].Sounds.Death.pos3d(xDiff, yDiff, 0);
                            Players[pId].Sounds.Death.play();
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