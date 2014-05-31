module Game
{
    export class PlayGamePhaseHandler extends GamePhaseHandler
    {
        public Handle(gameStateObject: any): void
        {
            if(gameStateObject.Stage == "Play")
            {
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
                    console.log('Currrent game is over');
                }
            }
        }

        public SendCurrentPlayerState()
        {
            Socket.send(JSON.stringify( {
                Id: CurrentPlayer.ID,
                State: 'Play',
                Position: {
                    X: CurrentPlayer.Position.X,
                    Y: CurrentPlayer.Position.Y
                },
                Angle: CurrentPlayer.AngleOfView,
                Direction: (CurrentPlayer.LookDirectionIsForward) ? "Right" : "Left"
            }));
        }
    }
}