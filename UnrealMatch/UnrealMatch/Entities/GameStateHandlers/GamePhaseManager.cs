namespace UnrealMatch.Entities.GameStateHandlers
{
    using UnrealMatch.Entities.Enums;

    public abstract class GamePhaseManager
    {
        /// <summary>
        /// Game that will change the state
        /// </summary>
        public Game Game { get; protected set; }
        /// <summary>
        /// Current game phase in enum presentation
        /// </summary>
        public GamePhase Phase { get; protected set; }
        /// <summary>
        /// Handle received client message and changing game state
        /// </summary>
        /// <param name="clientMessage"></param>
        public abstract void HandleClientMessage(string clientMessage);
        /// <summary>
        /// Take all input messages and compute next game state
        /// </summary>
        public abstract void NextState();
        /// <summary>
        /// Broadcast game state changes to all connected players
        /// </summary>
        public abstract void BroadcastState();
        /// <summary>
        /// Go next phase
        /// </summary>
        public abstract void NextPhase();
        /// <summary>
        /// Generate optimal delay for next cycle iteration
        /// </summary>
        public abstract void MakeDelay();
    }
}