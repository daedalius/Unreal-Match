/// <reference path="../../Animation/Animations/AsmdBigBlastAnimation.ts" />
module Weapons
{
    export class Shot
    {
        // Who made this shot
        public PlayerId: number;
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
        public ShotSound: Howl;

        constructor(provider: number, weapon: WeaponType, mode: WeaponMode, position: Point, angle: number, direction: string, sound: Howl)
        {
            this.PlayerId = provider;
            this.Weapon = weapon;
            this.Mode = mode;
            this.StartPosition = position;
            this.Angle = angle;
            this.Direction = direction;
            this.ShotSound = sound;
        }
    }

    export class MomentShot extends Shot
    {

    }

    export class EnforcerShot extends MomentShot
    {

    }

    export class AsmdShot extends MomentShot
    {

    }

    export class Shell extends Shot
    {
        public CurrentPosition: Point;
        public FlySound: Howl;
        public BlowSound: Howl;
        public Blast: Blast;

        public Blow(): void
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
    //        super(shooter, position, new Animation.AsmdBlastAnimation(position));
    //    }
    //}

    export class ASDMBigBlast extends Blast
    {
        constructor(shooter: Entities.Player, position: Point)
        {
            super(shooter, position, new Animation.AsmdBigBlastAnimation(position));
        }
    }
} 