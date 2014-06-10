namespace UnrealMatch.Entities.GameStateHandlers
{
    using System.Threading;
    using UnrealMatch.Entities.Enums;

    public class CountdownGamePhaseManager : GamePhaseManager
    {
        private int countdown { get; set; }

        public CountdownGamePhaseManager(Game game)
        {
            this.Game = game;
            this.Phase = GamePhase.Countdown;
            this.countdown = 5;
        }

        public override void HandleClientMessage(string clientMessage)
        { }

        public override void NextState()
        {
            if (this.countdown != 0)
            {
                this.countdown -= 1;
            }
            else
            {
                this.NextPhase();
            }
        }

        public override void BroadcastState()
        {
            var obj = new { Stage = this.Phase.ToString(), PlayerStatistic = this.Game.CollectPlayersStats(), Countdown = this.countdown };

            this.Game.SendBroadcastMessage(obj);
        }

        public override void NextPhase()
        {
            this.Game.PhaseManager = new PlayGamePhaseManager(this.Game);
        }

        public override void MakeDelay()
        {
            Thread.Sleep(1000);
        }
    }
}