module Game
{
    export class WaitingGamePhaseHandler extends GamePhaseHandler
    {
        public Handle(gameStateObject: any): void
        {
            if(gameStateObject.Stage == "Waiting")
            {
                var test = GamePhase.Waiting.toString();
                var playersStats = gameStateObject.PlayerStatistic;

                for(var i = 0; i < playersStats.length; i++)
                {
                    var id = playersStats[i].Number;

                    Players[id].Name = playersStats[i].Name;
                    Players[id].Score = playersStats[i].Score;
                }

                // After first recived data send "ready" signal
                Network.NetworkProcesses.Send(this.FormPlayerState());

                GsHUD.Refresh();
            }
            else
            {
                if(gameStateObject.Stage == "Countdown")
                {
                    Game.GameInfo.Phase = GamePhase.Countdown;
                    Game.GameInfo.PhaseHandler = new Game.CountdownGamePhaseHandler();
                    Game.GameInfo.PhaseHandler.Handle(gameStateObject);
                }
            }
        }

        public FormPlayerState(): MessageTypes.StateToSend
        {
            return new MessageTypes.StateToSend(CurrentPlayer.ID, "Ready");
        }
    }
}