module Weapons
{
    export class Shot
    {
        // Who made this shot
        public Player: Entities.Player;
        // Weapon
        public Weapon: WeaponType;
        // Mode
        public Mode: WeaponMode;
        // Shot initial position
        public StartPosition: Point;
        // Shot initial angle
        public Angle: number;
        // Shot direction: "Right" or "Left"
        public Direction: string;
        // Play when shot is made
        public StartSound: Howl;
    }

    export class MomentShot extends Shot
    {
        
    }

    export class Shell extends Shot
    {
        public CurrentPosition: Point;
        //public Radius: number;
        //public BlowRadius: number;
        public FlySound: Howl;
        public BlowSound: Howl;
        //// Damage on hit
        //public Damage: number;

        // Animation field
        public Blast: Blast;

        public Blow() : void
        {
            Animation.AnimationManager.Add(this.Blast.Animation);

            // [TODO] - Play blast sound relatively current player position
            // ...
        }
    }

    export class LinearShell extends Shell
    {
    }

    export class ASMDShell extends LinearShell
    {
        
    }

    export class Blast
    {
        // Who shot
        public Shooter: Entities.Player;
        // Where
        public Position: Point;
        //// Full Radius
        //public Radius: number;
        //// Full damage radius
        //public CriticalRadius: number;
        // Animation feild
        public Animation: Animation.Animation;

        constructor(shooter: Entities.Player, position: Point, animation: Animation.Animation)
        {
            this.Shooter = shooter;
            this.Position = position;
            //this.Radius = radius;
            //this.CriticalRadius = criticalRadius;
            this.Animation = animation;
        }
    }

    //export class ASMDBlast extends Blast
    //{
    //    constructor(shooter: Entities.Player, position: Point)
    //    {
    //        super(shooter, position, 12, 12);
    //    }
    //}

    export class ASDMBigBlast extends Blast
    {
        constructor(shooter: Entities.Player, position: Point)
        {
            super(shooter, position, new Animation.AsmdBlastAnimation(position));
        }
    }
} 