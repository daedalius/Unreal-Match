namespace UnrealMatch.Entities.GameStateHandlers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using Newtonsoft.Json;
    using UnrealMatch.Entities.Calculations;
    using UnrealMatch.Entities.ClientMessageTypes;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.GameObjects;
    using UnrealMatch.Entities.Interfaces;
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Entities.Weapons.WeaponShots;
    using UnrealMatch.Entities.Weapons;
    using System.Diagnostics;

    public class PlayGamePhaseManager : GamePhaseManager
    {
        internal List<Shell> Shells;
        internal List<Shot> LastReceivedShots;
        internal List<Blast> Blasts;
        internal List<Shell> BlastedShells;

        public PlayGamePhaseManager(Game game)
        {
            this.Phase = GamePhase.Play;
            this.Game = game;
            this.Shells = new List<Shell>();
            this.LastReceivedShots = new List<Shot>();
            this.Blasts = new List<Blast>();
            this.BlastedShells = new List<Shell>();
        }

        public override void HandleClientMessage(string clientMessage)
        {
            dynamic data = JsonConvert.DeserializeObject(clientMessage);

            int id = data.Id;
            string state = data.State;

            this.Game.Players[id].Position.X = data.Position.X;
            this.Game.Players[id].Position.Y = data.Position.Y;
            this.Game.Players[id].AngleOfView = data.Angle;
            this.Game.Players[id].Direction = (data.Direction == "Right") ? PlayerViewDirection.Right : PlayerViewDirection.Left;

            //Debug.WriteLine(clientMessage);

            ClientPlayState receivedState = JsonConvert.DeserializeObject<ClientPlayState>(clientMessage);
            this.Game.Players[id].Weapon = receivedState.Weapon;

            // Convert shots from player
            for (int i = 0; i < receivedState.Shots.Length; i++)
            {
                this.LastReceivedShots.Add(receivedState.Shots[i].ConvertToShot());
            }
        }

        /// <summary>
        /// Play state pipeline
        /// </summary>
        public override void NextState()
        {
            this.PreparingCleanUp();
            this.HandleReceivedMomentShots();
            this.HandleReceivedShells();
            this.HandleShells();
            this.CheckPlayersStatus();
        }

        private void PreparingCleanUp()
        {
            // Clear death flag
            foreach (var player in this.Game.Players)
            {
                player.HealthStatus.DeathFlag = false;
            }

            this.BlastedShells = null;
            this.Blasts = null;
        }

        private void HandleReceivedMomentShots()
        {
            var momentShots = this.LastReceivedShots.OfType<MomentShot>();

            // Decrease ammo
            foreach (var shot in momentShots)
            {
                this.Game.Players[shot.PlayerId].Munitions.Decrease(shot);
            }

            // Search intersects with shells and players
            foreach (var shot in momentShots)
            {
                var shotIntersections = new List<MomentShotIntersectionResult>();

                // Search for enemies
                foreach (var player in this.Game.Players.Where(player => player.Number != shot.PlayerId))
                {
                    var shotResult = ((IMomentShotHitTest)player).MomentShotHitTest(shot);
                    if (shotResult != null)
                    {
                        shotIntersections.Add(shotResult);
                    }
                }

                // Search for shells
                foreach (var shell in this.Shells)
                {
                    var shotResult = ((IMomentShotHitTest)shell).MomentShotHitTest(shot);
                    if (shotResult != null)
                    {
                        shotIntersections.Add(shotResult);
                    }
                }

                // Sorting all intersection by range
                shotIntersections.Sort();

                // Pipeline handling
                foreach (var intersection in shotIntersections)
                {
                    if (intersection.Victim.HandleIntersection(intersection, this))
                    {
                        // Shot completely handled
                        break;
                    }
                }
            }

            // Save this shots for delivery to other players

            // Remove moment shots from list
            this.LastReceivedShots.RemoveAll(x => momentShots.Contains(x));
        }

        private void HandleReceivedShells()
        {
            // Coping last shells
            var lastShells = this.LastReceivedShots.OfType<Shell>().ToList();

            // Clear list because all shots already taken
            this.LastReceivedShots.Clear();

            this.Shells.AddRange(lastShells);
        }

        private void HandleShells()
        {
            // Move shells further
            foreach (var shell in this.Shells)
            {
                shell.NextPosition();
            }
            // Search for intersection with players

            // Search for intersection with other shells

            // Save info for delivery to other players
        }

        private void CheckPlayersStatus()
        {
            for (int i = 0; i < this.Game.Players.Count; i++)
            {
                if (this.Game.Players[i].HealthStatus.HP <= 0)
                {
                    var respawnPoint = this.RespawnPlayer(this.Game.Players[i]);
                    this.Game.Players[i].Position = respawnPoint;

                    // New health status
                    this.Game.Players[i].HealthStatus = new GameObjects.PlayerHealthStatus();
                    this.Game.Players[i].HealthStatus.DeathFlag = true;
                }
            }
        }

        private Point RespawnPlayer(Player toSpawn)
        {
            var results = new List<Tuple<Point, double>>();

            foreach (var rp in Map.MapInfoGetter.MapRespawns[this.Game.Map.Title])
            {
                double minimalDistance = Double.MaxValue;
                Point minimalDistancePoint = null;

                // For each enemy find minimal distance beetween current probably respawn point
                foreach (var p in this.Game.Players.Where(x => x.Number != toSpawn.Number))
                {
                    var distanse = Calculations.Get.Hypotenuse(Math.Abs(rp.X - p.Position.X), Math.Abs(rp.Y - p.Position.Y));
                    if (distanse < minimalDistance)
                    {
                        minimalDistancePoint = rp;
                        minimalDistance = distanse;
                    }
                }
                results.Add(new Tuple<Point, double>(minimalDistancePoint, minimalDistance));
            }

            // Just take the farther point
            return results.OrderByDescending(x => x.Item2).First().Item1;
        }

        public override void BroadcastState()
        {
            var obj = new
            {
                Stage = this.Phase.ToString(),
                Players = this.Game.Players.ToArray(),
                Shells = this.Shells,
                Blasts = this.Blasts,
                RemovedShells = this.BlastedShells
            };
            this.Game.SendBroadcastMessage(obj);
        }

        public override void NextPhase()
        {
            throw new System.NotImplementedException();
        }

        public override void MakeDelay()
        {
            Thread.Sleep(100);
        }
    }
}