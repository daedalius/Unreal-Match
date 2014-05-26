/// <reference path="Entities/Game/GameInfo.ts" />
/// <reference path="Variables.ts" />

module Network
{
    export class NetworkHandlers
    {
        public static Open(event: any)
        {
            //console.log('Socket has been opened ' + new Date(Date.now()).toLocaleString());
        }

        public static Receive(event : any)
        {
            Game.GameInfo.PhaseHandler.Handle(JSON.parse(event.data));
            //console.log('Socket receive data: ' + event.data);
        }

        public static Send(jsonString: string)
        {
            Socket.send(jsonString);
            //console.log('Socket send data: '+ jsonString);
        }

        public static Close(event: any)
        {
            //console.log('Socket has been closed ' + new Date(Date.now()).toLocaleString());
        }
    }
}