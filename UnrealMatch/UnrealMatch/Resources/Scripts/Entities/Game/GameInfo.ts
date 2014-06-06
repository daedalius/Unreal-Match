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
        // Shots made by player in last 100 ms
        private static ShotsToSend: Array<Weapons.Shot> = new Array<Weapons.Shot>(0);
        // Received shots to handle from other players
        private static ShotsToHandle: Array<Weapons.Shot> = new Array<Weapons.Shot>(0);

        public static GameCycle(): void
        {
            if(GameInfo.Phase === Game.GamePhase.Play)
            {
                Network.NetworkProcesses.Send(GameInfo.PhaseHandler.FormPlayerState());
                GameInfo.ClearPlayerShots();

                setTimeout(GameInfo.GameCycle, 100);
            }
        }

        private static HandleReceivedShots()
        {
            // [TODO]
        }

        public static AddShotInSendQueue(shot: Weapons.Shot)
        {
            GameInfo.ShotsToSend.push(shot);
        }

        public static CloneShots() : Array<any>
        {
            return Calculations.Get.ClonedArray(this.ShotsToSend);
        }

        public static ClearPlayerShots()
        {
            GameInfo.ShotsToSend = new Array<Weapons.Shot>(0);
        }
    }
}