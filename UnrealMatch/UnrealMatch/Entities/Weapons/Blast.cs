﻿namespace UnrealMatch.Entities.Weapons
{
    using UnrealMatch.Entities.Primitives;
    using UnrealMatch.Resources.Scripts.Entities.Weapons;

    public abstract class Blast
    {
        /// <summary>
        /// Blast center position
        /// </summary>
        public Point Position { get; set; }
        /// <summary>
        /// Blast damage radius
        /// </summary>
        public int FullRadius { get; set; }
        /// <summary>
        /// Blast damage radius where maximum explosive force (less than full radius)
        /// </summary>
        public int EpicenterRadius { get; set; }
        /// <summary>
        /// Blast HP damage
        /// </summary>
        public int Damage { get; set; }
        /// <summary>
        /// Blast type in emum presentation
        /// </summary>
        public BlastType Type { get; set; }

        public Blast(BlastType type, Point position, int epicenterRadius, int fullRadius, int damage)
        {
            this.Type = type;
            this.Position = position;
            this.EpicenterRadius = epicenterRadius;
            this.FullRadius = fullRadius;
            this.Damage = damage;
        }
    }
}