namespace UnrealMatch.Entities.Enums
{
    /// <summary>
    /// Represents the state of readiness client for the game
    /// </summary>
    [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum ClientStatus
    {
        /// <summary>
        /// Server does not know about player
        /// </summary>
        Disconnected,
        /// <summary>
        /// Client joint to game from controller
        /// </summary>
        Connecting,
        /// <summary>
        /// Client socket can recive data
        /// </summary>
        Connected,
        /// <summary>
        /// Client informed about the readiness. He is ready to start playing
        /// </summary>
        Ready
    }
}