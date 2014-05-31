module MessageTypes 
{
    export class PlayStateToSend extends StateToSend
    {
        public Angle: number;
        public Direction: string;
        public Position: Point;

        constructor(playerId: number, playerPosition: Point, isPlayerLookingForward: boolean, playerViewAngle: number)
        {
            this.Angle = playerViewAngle;
            this.Position = playerPosition;
            this.Direction = (isPlayerLookingForward) ? "Right" : "Left"
            super(playerId, "Play");
        }
    }
}