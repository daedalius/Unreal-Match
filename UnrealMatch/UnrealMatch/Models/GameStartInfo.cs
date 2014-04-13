namespace UnrealMatch.Models
{
    public class GameStartInfo
    {
        // Current game info
        public string GameName { get; set; }
        // Current player info
        public string PlayerName { get; set; }
        public int PlayerNumber { get; set; }
        public int PlayersCount { get; set; }
        // Current map info
        public string MapName { get; set; }
        public double MapQuality { get; set; }
        public int MapWidth { get; set; }
        public int MapHeight { get; set; }
        public bool[,] MapPasses { get; set; }
    }
}