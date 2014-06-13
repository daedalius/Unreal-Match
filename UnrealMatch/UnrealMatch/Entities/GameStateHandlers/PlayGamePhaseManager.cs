namespace UnrealMatch.Entities.GameStateHandlers
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
    using UnrealMatch.Entities.Calculations;
    using UnrealMatch.Entities.Interfaces;

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

                // [TODO] - Search for shells

                // Sorting all intersection by range
                shotIntersections.Sort();

                // Pipeline handling
                foreach (var intersection in shotIntersections)
                {
                    if (intersection.Victim.HandleIntersection(intersection))
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