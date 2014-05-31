module MessageTypes 
{
    export class WaitingStateToSend extends StateToSend 
    {
        constructor(playerId: number, playerState: string)
        {
            super(playerId, playerState);
        }
    }
} 