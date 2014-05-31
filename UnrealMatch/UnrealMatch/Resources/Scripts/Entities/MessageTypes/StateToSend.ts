module MessageTypes 
{
    export class StateToSend 
    {
        public Id: number;
        public State: string;

        constructor(playerId: number, playerState: string)
        {
            this.Id = playerId;
            this.State = playerState;
        }
    }
}