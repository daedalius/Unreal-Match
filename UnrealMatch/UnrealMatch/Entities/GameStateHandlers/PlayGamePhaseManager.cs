﻿namespace UnrealMatch.Entities.GameStateHandlers
{
    using Newtonsoft.Json;
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading;
    using UnrealMatch.Entities.ClientMessageTypes;
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Weapons;
    using UnrealMatch.Entities.Weapons.WeaponShots;
    using System.Diagnostics;

    public class PlayGamePhaseManager : GamePhaseManager
    {
        private List<Shell> Shells;
        private List<Shot> LastReceivedShots;

        public PlayGamePhaseManager(Game game)
        {
            this.Phase = GamePhase.Play;
            this.Game = game;
            this.Shells = new List<Shell>();
            this.LastReceivedShots = new List<Shot>();
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

        public override void NextState()
        {
            this.HandleReceivedMomentShots();
            this.HandleReceivedShells();
            this.HandleShells();
        }

        private void HandleReceivedMomentShots()
        {
            var momentShots = this.LastReceivedShots.OfType<MomentShot>();
            // Handle received moment shots

            // Decrease ammo
            foreach (var shot in momentShots)
            {
                this.Game.Players[shot.PlayerId].Munitions.Decrease(shot);
            }

            // Search intersect with shells and players
            foreach (var shot in momentShots)
            {
                // Search for enemies
                foreach (var player in this.Game.Players.Where(player => player.Number != shot.PlayerId))
                {
                    var enemyHeadRectangle = player.HeadRectangle;
                    var enemyBodyRectangle = player.BodyRectangle;

                    var headIntersectionPoint = Calculations.ShotRectangleIntersection(shot, enemyHeadRectangle);
                    var bodyIntersectionPoint = Calculations.ShotRectangleIntersection(shot, enemyBodyRectangle);

                    if (headIntersectionPoint != null || bodyIntersectionPoint != null)
                    {
                        if (headIntersectionPoint != null)
                        {
                            Debug.WriteLine("Попал в голову!");
                            Debug.WriteLine("x: " + headIntersectionPoint.X + "; y: " + headIntersectionPoint.Y);
                        }

                        if (bodyIntersectionPoint != null)
                        {
                            Debug.WriteLine("Попал в тело!");
                            Debug.WriteLine("x: " + bodyIntersectionPoint.X + "; y: " + bodyIntersectionPoint.Y);
                        }
                    }
                    else
                    {
                        Debug.WriteLine("Промазал!"); 
                    }
                }
            }
            // If intersections more than 1 find neareset and judge him: blast the shell or do harm to player

            // Save this shots for delivery to other players

            // Remove moment shots from list
            this.LastReceivedShots.RemoveAll(x => momentShots.Contains(x));
        }

        private void HandleReceivedShells()
        {
            // Handle received moment shots

            // Save this shots for delivery to other players
        }

        private void HandleShells()
        {
            // Move shells further

            // Search for intersection with players

            // Search for intersection with other shells

            // Save info for delivery to other players
        }

        public override void BroadcastState()
        {
            var obj = new
            {
                Stage = this.Phase.ToString(),
                Players = this.Game.Players.ToArray()
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