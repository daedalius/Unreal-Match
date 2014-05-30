var yoba: any;

module Game
{
    export class PlayGamePhaseHandler extends GamePhaseHandler
    {
        public Handle(gameStateObject: any): void
        {
            if(gameStateObject.Stage == "Play")
            {
                yoba = gameStateObject;
                //console.log("___Received from server:____" + yoba);

                var players = gameStateObject.Players;

                for(var i = 0; i < players.length; i++)
                {
                    if(i != CurrentPlayer.ID)
                    {
                        Players[i].Position.X = players[i].Position.X;
                        Players[i].Position.Y = players[i].Position.Y;
                        Players[i].AngleOfView = players[i].AngleOfView;
                        Players[i].LookDirectionIsForward = players[i].IsForwardView;
                    }
                }

                this.SendCurrentPlayerState();
            }
            else
            {
                if(gameStateObject.Stage == "Stop")
                {
                    console.log('currrent game is over');
                }
            }
        }

        public SendCurrentPlayerState()
        {
            // [TODO] - do it better
            Socket.send(JSON.stringify( {
                PlayerId: CurrentPlayer.ID,
                PlayerState: 'Play',
                X: CurrentPlayer.Position.X,
                Y: CurrentPlayer.Position.Y,
                Angle: CurrentPlayer.AngleOfView,
                Direction: (CurrentPlayer.LookDirectionIsForward) ? "Right" : "Left"
            }));
        }
    }
}