namespace UnrealMatch.Entities.GameStateHandlers
{
    using Newtonsoft.Json;
    using System.Threading;
    using UnrealMatch.Entities.ClientMessageTypes;
    using UnrealMatch.Entities.Enums;

    public class PlayGamePhaseManager : GamePhaseManager
    {
        public PlayGamePhaseManager(Game game)
        {
            this.Phase = GamePhase.Play;
            this.Game = game;
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

            ClientPlayState receivedState = JsonConvert.DeserializeObject<ClientPlayState>(clientMessage);
            this.Game.Players[id].Weapon = receivedState.Weapon;

            // [TODO] - Move to other place maybe
            // Decrease ammo for each shot
            foreach (var shot in receivedState.Shots)
            {
                this.Game.Players[id].Munitions.Decrease(shot);
            }
        }

        public override void NextState()
        {

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