module Game
{
    export class GameInfo
    {
        public static Name: string;
        public static Host: string;
        public static Socket: string;
        public static MaxPlayers: number;
        public static Phase: Game.GamePhase;
        public static PhaseHandler: GamePhaseHandler;

        public static GameCycle(): void
        {
            if(GameInfo.Phase === Game.GamePhase.Play)
            {
                Network.NetworkProcesses.Send(GameInfo.PhaseHandler.FormPlayerState());


                setTimeout(GameInfo.GameCycle, 100);
            }
        }
    }
}