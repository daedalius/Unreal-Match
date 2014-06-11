namespace UnrealMatch.Entities.Weapons
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class Blast
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
    }
}