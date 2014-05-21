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
            }

            GsHUD.Refresh();
        }
    }
}