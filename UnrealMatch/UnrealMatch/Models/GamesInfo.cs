namespace UnrealMatch.Models
{
    public class GamesInfo
    {
        public string[] AvailableGames { get; set; }
        public string[] AvailableModes { get; set; }
        public string[] AvailableMaps { get; set; }
        public int MaxPlayers { get; set; }
        public string Nickname { get; set; }
        public string GameName { get; set; }
    }
}