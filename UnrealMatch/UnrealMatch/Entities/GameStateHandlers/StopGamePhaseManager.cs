namespace UnrealMatch.Entities.GameStateHandlers
{
    using UnrealMatch.Entities.Enums;

    public class StopGamePhaseManager : GamePhaseManager
    {
        public StopGamePhaseManager(Game game)
        {
            this.Phase = GamePhase.Stop;
            this.Game = game;
        }

        public override void HandleClientMessage(string clientMessage)
        {
            throw new System.NotImplementedException();
        }

        public override void NextState()
        {
            throw new System.NotImplementedException();
        }

        public override void BroadcastState()
        {
            throw new System.NotImplementedException();
        }

        public override void NextPhase()
        {
            throw new System.NotImplementedException();
        }

        public override void MakeDelay()
        {
            throw new System.NotImplementedException();
        }
    }
}