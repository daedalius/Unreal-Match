namespace UnrealMatch.Entities
{
    [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum GameState
    {
        Waiting,
        Countdown,
        Play,
        Stop
    }
}