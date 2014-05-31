/// <reference path="Entities/Game/GameInfo.ts" />
/// <reference path="Variables.ts" />

module Network
{
    export class NetworkProcesses
    {
        public static Open(event: any)
        {
            console.log('Socket has been opened ' + new Date(Date.now()).toLocaleString());
        }

        public static Receive(event : any)
        {
            Game.GameInfo.PhaseHandler.Handle(JSON.parse(event.data));
        }

        public static Send(toJson: any)
        {
            if(toJson)
            {
                Socket.send(JSON.stringify(toJson));
            }
        }

        public static Close(event: any)
        {
            console.log('Socket has been closed ' + new Date(Date.now()).toLocaleString());
        }

        public static Error(event: any)
        {
            console.log('Error on socket ' + new Date(Date.now()).toLocaleString());
        }
    }
}