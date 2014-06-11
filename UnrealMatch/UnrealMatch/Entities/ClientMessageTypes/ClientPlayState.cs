namespace UnrealMatch.Entities.ClientMessageTypes
{
    using UnrealMatch.Entities.Weapons;

    public class ClientPlayState : ClientState
    {
        public ClientShot[] Shots { get; set; }
        public WeaponType Weapon { get; set; }
    }
}