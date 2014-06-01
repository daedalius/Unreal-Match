module Game
{
    export class CountdownGamePhaseHandler extends GamePhaseHandler
    {
        public Handle(gameStateObject: any): void
        {
            if(gameStateObject.Stage == "Countdown")
            {
                console.log(gameStateObject.Countdown);

                switch(gameStateObject.Countdown)
                {
                    case 5: { SoundManager.Announcer.Prepare.play(); break; }
                    case 3: { SoundManager.Announcer.Second3.play(); break; }
                    case 2: { SoundManager.Announcer.Second2.play(); break; }
                    case 1: { SoundManager.Announcer.Second1.play(); break; }
                }
            }
            else
            {
                if(gameStateObject.Stage == "Play")
                {
                    console.log('Play phase started');
                    Game.GameInfo.Phase = Game.GamePhase.Play;
                    Game.GameInfo.PhaseHandler = new PlayGamePhaseHandler();
                    IsKeyboardInputEnable = true;
                    IsMouseInputEnable = true;
                    IsPlayerDrawEnable = true;
                    // Start game cycle
                    Game.GameInfo.GameCycle();
                }
            }
        }

        public FormPlayerState(): MessageTypes.StateToSend
        {
            return null;
        }
    }
}