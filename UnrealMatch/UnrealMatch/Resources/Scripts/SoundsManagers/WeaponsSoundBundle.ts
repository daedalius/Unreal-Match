module SoundManager
{
    export class WeaponsSoundBundle
    {
        // Pickup any weapon or ammo
        public ArmamentPickup: Howl;
        // Enforcer
        public EnforcerSelect: Howl;
        public EnforcerFire: Howl;
        // ASMD
        public AsmdPickup: Howl;
        public AsmdSelect: Howl;
        public AsmdFire: Howl;
        public AsmdAltFire: Howl;
        public AsmdBlast: Howl;
        public AsmdBigBlast: Howl;

        constructor()
        {
            this.ArmamentPickup = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/ammo-pick.mp3', '/Resources/Audio/Weapons/ammo-pick.ogg']
                });
            this.EnforcerSelect = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/Enforcer/enforcer-select.mp3', '/Resources/Audio/Weapons/Enforcer/enforcer-select.ogg']
                });
            this.EnforcerFire = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/Enforcer/enforcer-fire.mp3', '/Resources/Audio/Weapons/Enforcer/enforcer-fire.ogg']
                });
            this.AsmdPickup = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/ASMD/asmd-pickup.mp3', '/Resources/Audio/Weapons/ASMD/asmd-pickup.ogg']
                });
            this.AsmdFire = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/ASMD/asmd-main-fire.mp3', '/Resources/Audio/Weapons/ASMD/asmd-main-fire.ogg']
                });
            this.AsmdAltFire = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/ASMD/asmd-alt-fire.mp3', '/Resources/Audio/Weapons/ASMD/asmd-alt-fire.ogg']
                });
            this.AsmdSelect = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/ASMD/asmd-select.mp3', '/Resources/Audio/Weapons/ASMD/asmd-select.ogg']
                });
            this.AsmdBlast = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/ASMD/asmd-balst.mp3', '/Resources/Audio/Weapons/ASMD/asmd-balst.ogg']
                });
            this.AsmdBigBlast = new Howl(
                {
                    urls: ['/Resources/Audio/Weapons/ASMD/asmd-big-balst.mp3', '/Resources/Audio/Weapons/ASMD/asmd-big-balst.ogg']
                });
        }
    }
} 