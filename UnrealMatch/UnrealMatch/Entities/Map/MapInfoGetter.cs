namespace UnrealMatch.Entities.Map
{
    using System;
    using System.Collections.Generic;
    using UnrealMatch.Entities.Primitives;

    public static class MapInfoGetter
    {
        // [TODO] need to use config
        private static string PathToLevelsPassMaps = @"C:\Projects\Unreal-Match\UnrealMatch\UnrealMatch\Resources\Images\Levels\";

        static public Dictionary<string, Size> MapSizes = new Dictionary<string, Size>
        {
            {  "Rising-Sun" , new Size(3832, 1422) },
        };

        static public Dictionary<string, Point[]> MapRespawns = new Dictionary<string, Point[]>
        {
            {  "Rising-Sun" , new Point[] { new Point(764, 24),
                                            new Point(2677, 24),
                                            new Point(3237, 911),
                                            new Point(1963, 901),
                                            new Point(1574, 901),
                                            new Point(558, 661)}
            }
        };

        static public Dictionary<string, double> MapQualities = new Dictionary<string, double>
        {
            {  "Rising-Sun" , 1.5 },
        };

        static public Dictionary<string, bool[,]> MapPasses;

        static MapInfoGetter()
        {
            MapInfoGetter.MapPasses = new Dictionary<string, bool[,]>();
        }

        static public LevelMap GetMap(string mapTitle)
        {
            var savedSize = MapInfoGetter.MapSizes[mapTitle];
            var savedQuality = MapInfoGetter.MapQualities[mapTitle];
            bool[,] cachedPass;

            if (!MapInfoGetter.MapPasses.TryGetValue(mapTitle, out cachedPass))
            {
                // Preparing
                System.Drawing.Bitmap img = new System.Drawing.Bitmap(PathToLevelsPassMaps + mapTitle + "-Passableness-Map.png");
                var size = new Entities.Primitives.Size(img.Width, img.Height);

                if (size.Width != savedSize.Width || size.Height != savedSize.Height)
                {
                    throw new NotSupportedException("Saved data about map do not coincides with stored resource");
                }

                cachedPass = new bool[size.Height, size.Width];

                for (int h = 0; h < size.Height; h++)
                {
                    for (int w = 0; w < size.Width; w++)
                    {
                        System.Drawing.Color pixel = img.GetPixel(w, h);

                        if (pixel.A > 0)
                        {
                            cachedPass[h, w] = true;
                        }
                    }
                }

                // Caching
                MapInfoGetter.MapPasses.Add(mapTitle, cachedPass);
            }

            return new LevelMap(mapTitle, savedSize, cachedPass, savedQuality);
        }
    }
}