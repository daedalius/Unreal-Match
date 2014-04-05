namespace UnrealMatch.Entities
{
    using System;
    using System.Collections.Generic;
    using UnrealMatch.Entities.Primitives;

    public class Map
    {
        public string Title { get; set; }
        public bool[,] PassablenessMap { get; set; }
        public Size Size { get; set; }
        public double Quality { get; set; }

        public Map(string mapTitle, Entities.Primitives.Size size, bool[,] passablenessMap, double quality)
        {
            this.Title = mapTitle;
            this.Size = size;
            this.PassablenessMap = passablenessMap;
            this.Quality = quality;
        }
    }
}