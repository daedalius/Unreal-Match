/// <reference path="../MessageTypes/StateToSend.ts" />
module Game
{
    export class GamePhaseHandler
    {
        public Handle(gameStateObject: any): void
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }

        public FormPlayerState(): MessageTypes.StateToSend
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }
    }
} 