namespace UnrealMatch.Entities.GameStateHandlers
{
    using System.Linq;
    using Newtonsoft.Json;
    using UnrealMatch.Entities.Enums;
    using System.Threading;

    public class WaitingGamePhaseManager : GamePhaseManager
    {
        public WaitingGamePhaseManager(Game game)
        {
            this.Phase = GamePhase.Waiting;
            this.Game = game;
        }

        public override void HandleClientMessage(string clientMessage)
        {
            dynamic data = JsonConvert.DeserializeObject(clientMessage);

            int id = data.Id;
            string state = data.State;

            Game.Players[id].Status = ClientStatus.Ready;
        }

        public override void NextState()
        {
            // Handle new countdows state
            if (this.Game.Players.Count == this.Game.MaxPlayers && this.Game.Players.All(x => x.Status == ClientStatus.Ready))
            {
                this.NextPhase();
                return;
            }
        }

        public override void BroadcastState()
        {
            if (this.Game.Players.Count != 0)
            {
                var obj = new { Stage = this.Phase.ToString(), PlayerStatistic = this.Game.CollectPlayersStats() };
                this.Game.SendBroadcastMessage(obj);
            }
        }
        public override void NextPhase()
        {
            this.Game.PhaseManager = new CountdownGamePhaseManager(this.Game);
        }

        public override void MakeDelay()
        {
            Thread.Sleep(1000);
        }
    }
}