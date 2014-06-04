module SoundManager
{
    export class PlayerSounds
    {
        public Respawn: Howl;
        public Death: Howl;
        // Moving
        public Move: Howl;  // [TODO] - Search for this sound
        public Landing: Howl;
        // Medical
        public HealthPickup: Howl;
        public MedkitPickup: Howl;
        public ArmourPickup: Howl;
        // All about ammunition
        public WeaponBundle: WeaponsSoundBundle;

        constructor()
        {
            this.WeaponBundle = new WeaponsSoundBundle();
            this.Respawn = new Howl(
                {
                    urls: ['/Resources/Audio/Player/respawn.mp3', '/Resources/Audio/Player/respawn.ogg']
                });
            this.Death = new Howl(
                {
                    urls: ['/Resources/Audio/Player/nova-death.mp3', '/Resources/Audio/Player/nova-death.ogg']
                });

            this.Landing = new Howl(
                {
                    urls: ['/Resources/Audio/Player/landing.mp3', '/Resources/Audio/Player/landing.ogg']
                });

            this.HealthPickup = new Howl(
                {
                    urls: ['/Resources/Audio/Items/health-pickup.mp3', '/Resources/Audio/Items/health-pickup.ogg']
                });
            this.MedkitPickup = new Howl(
                {
                    urls: ['/Resources/Audio/Items/medkit-pickup.mp3', '/Resources/Audio/Items/medkit-pickup.ogg']
                });
            this.ArmourPickup = new Howl(
                {
                    urls: ['/Resources/Audio/Items/armour-pickup.mp3', '/Resources/Audio/Items/armour-pickup.ogg']
                });
        }
    }
} 