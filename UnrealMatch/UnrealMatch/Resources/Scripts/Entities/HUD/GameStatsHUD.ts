module Entities
{
    export class GameStatsHUD extends AbstractHUD
    {
        constructor(rootElement: HTMLElement)
        {
            super(rootElement);
            this.Refresh();
        }
        
        public Refresh()
        {
            var bodyNode: JQuery = $(this.RootElement).find('.game-stats-body');
            // clean up old data
            bodyNode.children().remove();

            var tempArray: Array<TestPlayer> = new Array<TestPlayer>(TestPlayers.length);
            // Clean up empty elements
            tempArray = Calculations.Get.CleanedArray(TestPlayers);
            // Sort array by Score field
            tempArray = Calculations.Get.SortedArray(tempArray, 'Score').reverse();

            for(var i = 0; i < tempArray.length; i++)
            {
                var playerNameNode: JQuery = $(document.createElement('div'));
                var playerScoreNode: JQuery = $(document.createElement('div'));
                var playerRow: JQuery = $(document.createElement('div'));

                playerRow.addClass('game-stats-row');

                if(tempArray[i].Name == TestCurrentPlayer.Name)
                {
                    playerRow.addClass('game-stats-current-row');
                }

                playerNameNode.addClass('game-stats-left-column');
                playerNameNode.text(tempArray[i].Name);

                playerScoreNode.addClass('game-stats-right-column');
                playerScoreNode.text(tempArray[i].Score);

                playerRow.append(playerNameNode);
                playerRow.append(playerScoreNode);

                bodyNode.append(playerRow);
            }
        }
    }
} 