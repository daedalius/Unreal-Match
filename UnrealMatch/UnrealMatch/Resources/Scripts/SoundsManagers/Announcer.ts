module SoundManager
{
    export class Announcer
    {
        // Spries replics
        public static Killingspree: Howl;
        public static Rampage: Howl;
        public static Dominating: Howl;
        public static Unstoppable: Howl;
        public static Godlike: Howl;

        // Kills replics
        public static Doublekill: Howl;
        public static Multikill: Howl;
        public static Megakill: Howl;
        public static Ultrakill: Howl;
        public static Monsterkill: Howl;

        // Other replics
        public static Firstblood: Howl;
        public static Headshot: Howl;
        public static Prepare: Howl;
        public static Winner: Howl;
        public static Lostmatch: Howl;

        // Time replics
        public static Second1: Howl;
        public static Second2: Howl;
        public static Second3: Howl;
        //public static Second4: Howl;
        //public static Second5: Howl;
        //public static Second6: Howl;
        //public static Second7: Howl;
        //public static Second8: Howl;
        //public static Second9: Howl;
        //public static Second10: Howl;

        public static Init()
        {
            // Spries replics initialize
            Announcer.Killingspree = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/killingspree.mp3', '/Resources/Audio/Announcer/Kills/killingspree.ogg']
                });
            Announcer.Rampage = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/rampage.mp3', '/Resources/Audio/Announcer/Kills/rampage.ogg']
                });
            Announcer.Dominating = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/dominating.mp3', '/Resources/Audio/Announcer/Kills/dominating.ogg']
                });

            Announcer.Unstoppable = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/unstoppable.mp3', '/Resources/Audio/Announcer/Kills/unstoppable.ogg']
                });

            Announcer.Godlike = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/godlike.mp3', '/Resources/Audio/Announcer/Kills/godlike.ogg']
                });

            // Kills replics initialize
            Announcer.Doublekill = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/doublekill.mp3', '/Resources/Audio/Announcer/Kills/doublekill.ogg']
                });
            Announcer.Multikill = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/multikill.mp3', '/Resources/Audio/Announcer/Kills/multikill.ogg']
                });
            Announcer.Megakill = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/megakill.mp3', '/Resources/Audio/Announcer/Kills/megakill.ogg']
                });

            Announcer.Ultrakill = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/ultrakill.mp3', '/Resources/Audio/Announcer/Kills/ultrakill.ogg']
                });

            Announcer.Monsterkill = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/monsterkill.mp3', '/Resources/Audio/Announcer/Kills/monsterkill.ogg']
                });


            // Other replics initialize
            Announcer.Firstblood = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/firstblood.mp3', '/Resources/Audio/Announcer/Kills/firstblood.ogg']
                });
            Announcer.Headshot = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Kills/headshot.mp3', '/Resources/Audio/Announcer/Kills/headshot.ogg']
                });
            Announcer.Prepare = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Game/prepare.mp3', '/Resources/Audio/Announcer/Game/prepare.ogg']
                });

            Announcer.Winner = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Game/winner.mp3', '/Resources/Audio/Announcer/Game/winner.ogg']
                });

            Announcer.Lostmatch = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Game/lostmatch.mp3', '/Resources/Audio/Announcer/Game/lostmatch.ogg']
                });

            // Time replics initialize
            Announcer.Second1 = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Time/second-1.mp3', '/Resources/Audio/Announcer/Time/second-1.ogg']
                });
            Announcer.Second2 = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Time/second-2.mp3', '/Resources/Audio/Announcer/Time/second-2.ogg']
                });
            Announcer.Second3 = new Howl(
                {
                    urls: ['/Resources/Audio/Announcer/Time/second-3.mp3', '/Resources/Audio/Announcer/Time/second-3.ogg']
                });

        }
    }
}