module MessageTypes 
{
    export class PlayStateToSend extends StateToSend
    {
        public Angle: number;
        public Direction: string;
        public Position: Point;
        public Shots: Array<Weapons.Shot>;

        constructor(playerId: number, playerPosition: Point, isPlayerLookingForward: boolean, playerViewAngle: number, shots : Array<Weapons.Shot>)
        {
            this.Angle = playerViewAngle;
            this.Position = playerPosition;
            this.Direction = (isPlayerLookingForward) ? "Right" : "Left"
            this.Shots = shots;

            super(playerId, "Play");
        }
    }
}