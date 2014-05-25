module SoundManager
{
    export class Announcer
    {
        public static Killingspree: Howl;
        public static Rampage: Howl;
        public static Dominating: Howl;
        public static Unstoppable: Howl;
        public static Godlike: Howl;

        public static Init()
        {
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
        }
    }
}