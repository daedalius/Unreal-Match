/// <reference path="Entities/Game/GameInfo.ts" />
/// <reference path="Variables.ts" />

module Network
{
    export class NetworkHandlers
    {
        public static Receive(event : any)
        {
            Game.GameInfo.HandleRecivedData(event.data);
            console.log(event.data);
        }

        public static Send(jsonString: string)
        {
            Socket.send(jsonString);
        }
    }
}