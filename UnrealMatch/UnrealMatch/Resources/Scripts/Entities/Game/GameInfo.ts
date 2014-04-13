module Game
{
    export class GameInfo
    {
        public static Name: string;
        public static Host: string;
        public static Socket: string;
        public static MaxPlayers: number;
        public static Phase: Game.GamePhase;

        public static NextPhase()
        {
            if(Game.GameInfo.Phase === Game.GamePhase.PlayersWaiting)
            {
                Game.GameInfo.Phase = Game.GamePhase.Countdown;
                Game.GameInfo.HandleRecivedData = Game.GameInfo.CountdownHandler;
            }
        }

        public static HandleRecivedData(jsonData : string)
        {

        }

        public static JoinHandler(jsonData: string)
        {

        }

        public static CountdownHandler(jsonData: string)
        {

        }
    }
}