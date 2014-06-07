module MessageTypes 
{
    export class PlayStateToSend extends StateToSend
    {
        public Angle: number;
        public Direction: string;
        public Position: Point;
        public Weapon: Weapons.WeaponType;
        public Shots: Array<Weapons.Shot>;

        constructor(playerId: number, playerPosition: Point, isPlayerLookingForward: boolean, playerViewAngle: number, weapon : Weapons.WeaponType, shots : Array<Weapons.Shot>)
        {
            this.Angle = playerViewAngle;
            this.Position = playerPosition;
            this.Direction = (isPlayerLookingForward) ? "Right" : "Left"
            this.Shots = shots;
            this.Weapon = weapon;
            super(playerId, "Play");
        }
    }
}