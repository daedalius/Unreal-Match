namespace UnrealMatch.Entities.Map
{
    using System;
    using System.Collections.Generic;
    using UnrealMatch.Entities.Primitives;

    public class LevelMap
    {
        public string Title { get; set; }
        public bool[,] PassablenessMap { get; set; }
        public Size Size { get; set; }
        public double Quality { get; set; }

        public LevelMap(string mapTitle, Entities.Primitives.Size size, bool[,] passablenessMap, double quality)
        {
            this.Title = mapTitle;
            this.Size = size;
            this.PassablenessMap = passablenessMap;
            this.Quality = quality;
        }
    }
}