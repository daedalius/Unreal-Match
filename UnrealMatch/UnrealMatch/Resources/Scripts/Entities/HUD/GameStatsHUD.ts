module Entities
{
    export class GameStatsHUD
    {
        private rootElement: HTMLElement;
        private visible: boolean;

        constructor(rootElement: HTMLElement)
        {
            this.rootElement = rootElement;
            this.visible = false;
            this.Refresh();
        }

        public Hide()
        {
            if(this.visible)
            {
                if($(this.rootElement).hasClass('visible'))
                {
                    $(this.rootElement).removeClass('visible');
                }
            }
            this.visible = false;
        }

        public Show()
        {
            if(!this.visible)
            {
                if(!$(this.rootElement).hasClass('visible'))
                {
                    $(this.rootElement).addClass('visible');
                }
            }
            this.visible = true;
        }

        public Refresh()
        {
            var bodyNode: JQuery = $(this.rootElement).find('.game-stats-body');
            // clean up old data
            bodyNode.children().remove();

            var tempArray = TestPlayers.sort(function(a, b) {return a.Score - b.Score }).reverse();
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