namespace UnrealMatch.Entities.ClientMessageTypes
{
    using UnrealMatch.Entities.Weapons;

    public class ClientPlayState : ClientState
    {
        public Shot[] Shots { get; set; }
        public WeaponType Weapon { get; set; }
    }
}