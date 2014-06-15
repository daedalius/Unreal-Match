﻿namespace UnrealMatch.Entities.Weapons.WeaponShots
{
    using UnrealMatch.Entities.Enums;
    using UnrealMatch.Entities.Primitives;

    public abstract class LinearShell : Shell
    {
        public LinearShell(int provider, WeaponType weapon, WeaponMode mode, Point position, double angle, int damage, PlayerViewDirection direction, int radius, int speed)
            : base(provider, weapon, mode, position, angle, damage, direction, radius, speed)
        { }
    }
}