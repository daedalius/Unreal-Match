namespace UnrealMatch.Entities.GameStateHandlers
{
    using System.Linq;
    using System.Threading;
    using UnrealMatch.Entities.Enums;

    public class StopGamePhaseManager : GamePhaseManager
    {
        public StopGamePhaseManager(Game game)
        {
            this.Phase = GamePhase.Stop;
            this.Game = game;
        }

        public override void HandleClientMessage(string clientMessage)
        { }

        public override void NextState()
        { }

        public override void BroadcastState()
        {
            var obj = new
            {
                Stage = this.Phase.ToString(),
                PlayerStatistic = this.Game.CollectPlayersStats(),
                WinnerId = this.Game.Players.Where(x => x.Score >= 5).First().Number
            };

            this.Game.SendBroadcastMessage(obj);
        }

        public override void NextPhase()
        { }

        public override void MakeDelay()
        {
            Thread.Sleep(100);
        }
    }
}