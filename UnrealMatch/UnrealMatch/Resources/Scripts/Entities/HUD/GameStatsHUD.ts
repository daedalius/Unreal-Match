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

            var tempArray: Array<Player> = new Array<Player>(Players.length);
            // Clean up empty elements
            tempArray = Calculations.Get.CleanedArray(Players);
            // Sort array by Score field
            tempArray = Calculations.Get.SortedArray(tempArray, 'Score').reverse();

            for(var i = 0; i < tempArray.length; i++)
            {
                // [WTF] - million dollars for knowing what is going on
                // Why !== '' does not work??
                if(tempArray[i].Name === '')
                {
                    continue;
                }
                else
                {
                    var playerNameNode: JQuery = $(document.createElement('div'));

                    var playerScoreNode: JQuery = $(document.createElement('div'));
                    var playerRow: JQuery = $(document.createElement('div'));

                    playerRow.addClass('game-stats-row');

                    if(tempArray[i].Name == CurrentPlayer.Name)
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
} 