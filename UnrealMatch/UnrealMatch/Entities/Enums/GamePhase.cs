namespace UnrealMatch.Entities.Enums
{
    /// <summary>
    /// Present game phase
    /// </summary>
    [Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
    public enum GamePhase
    {
        /// <summary>
        /// Server waits for notification from the players about ready to start the game
        /// </summary>
        Waiting,
        /// <summary>
        /// Phase of the countdown to go directly to the gameplay
        /// </summary>
        Countdown,
        /// <summary>
        /// Gameplay phase
        /// </summary>
        Play,
        /// <summary>
        /// Game is over
        /// </summary>
        Stop
    }
}