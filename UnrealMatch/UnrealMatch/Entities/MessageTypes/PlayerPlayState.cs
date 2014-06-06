using UnrealMatch.Entities.Weapons;

namespace UnrealMatch.Entities.MessageTypes
{
    public class PlayerPlayState : PlayerState
    {
        public Shot[] Shots { get; set; }
    }
}