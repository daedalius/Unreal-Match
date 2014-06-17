module SoundManager
{
    export class PlayerAnnouncerStartState
    {
        public FragsStretch: number;
        public Last: Date;

        constructor(fragStretch: number)
        {
            this.FragsStretch = fragStretch;
            this.Last = new Date();
        }

        public AnnounceState()
        { }

        public ReactOnFragStretch(deltaFrags: number, lastFragTime: Date)
        {
            this.FragsStretch = this.FragsStretch + deltaFrags;

            var nowDate: Date = new Date();
            var deltaMilliseconds = nowDate.valueOf() - lastFragTime.valueOf();

            // Only when Last kill was less than 5 seconds
            if(deltaMilliseconds <= 5000)
            {
                switch(this.FragsStretch)
                {
                    case 2: { Announcer.Doublekill.play(); break; }
                    case 3: { Announcer.Multikill.play(); break; }
                    case 4: { Announcer.Megakill.play(); break; }
                    case 5: { Announcer.Ultrakill.play(); break; }
                    case 6: { Announcer.Monsterkill.play(); break; }
                }
            }
            else
            {
                this.FragsStretch = deltaFrags;
            }
        }

        public TryChangeState(frags: number, announcerDelay: number): PlayerAnnouncerStartState
        {
            if(frags >= 5)
            {
                var newState = new KillingspreeState(this.FragsStretch);
                SoundManager.Announcer.StartSpree.play();
                setTimeout(newState.AnnounceState, announcerDelay);
                return newState;
            }
            else
            {
                return this;
            }
        }

        public React(frags, deltaFrags)
        {
            if(deltaFrags > 0)
            {
                var delay: number = (deltaFrags > 1) ? 1500 : 0;
                this.ReactOnFragStretch(deltaFrags, this.Last);
                this.Last = new Date();
                CurrentPlayer.AnnouncerKillsState = this.TryChangeState(frags, delay);
            }
        }
    }

    export class KillingspreeState extends PlayerAnnouncerStartState
    {
        public AnnounceState()
        {
            Announcer.Killingspree.play();
        }

        public TryChangeState(frags: number, announcerDelay: number): PlayerAnnouncerStartState
        {
            if(frags >= 10)
            {
                var newState = new RampageState(this.FragsStretch);
                setTimeout(newState.AnnounceState, announcerDelay);
                return newState;
            }
            else
            {
                return this;
            }
        }
    }

    export class RampageState extends PlayerAnnouncerStartState
    {
        public AnnounceState()
        {
            Announcer.Rampage.play();
        }

        public TryChangeState(frags: number, announcerDelay: number): PlayerAnnouncerStartState
        {
            if(frags >= 15)
            {
                var newState = new DominatingState(this.FragsStretch);
                setTimeout(newState.AnnounceState, announcerDelay);
                return newState;
            }
            else
            {
                return this;
            }
        }
    }

    export class DominatingState extends PlayerAnnouncerStartState
    {
        public AnnounceState()
        {
            Announcer.Dominating.play();
        }

        public TryChangeState(frags: number, announcerDelay: number): PlayerAnnouncerStartState
        {
            if(frags >= 20)
            {
                var newState = new UnstoppableState(this.FragsStretch);
                setTimeout(newState.AnnounceState, announcerDelay);
                return newState;
            }
            else
            {
                return this;
            }
        }
    }

    export class UnstoppableState extends PlayerAnnouncerStartState
    {
        public AnnounceState()
        {
            Announcer.Unstoppable.play();
        }

        public TryChangeState(frags: number, announcerDelay: number): PlayerAnnouncerStartState
        {
            if(frags >= 25)
            {
                var newState = new GodlikeState(this.FragsStretch);
                setTimeout(newState.AnnounceState, announcerDelay);
                return newState;
            }
            else
            {
                return this;
            }
        }
    }

    export class GodlikeState extends PlayerAnnouncerStartState
    {
        public AnnounceState()
        {
            Announcer.Godlike.play();
        }

        public TryChangeState(frags: number, announcerDelay: number): PlayerAnnouncerStartState
        {
            if(frags >= 30)
            {
                return new EmptyState(this.FragsStretch);
            }
            else
            {
                return this;
            }
        }
    }

    export class EmptyState extends PlayerAnnouncerStartState
    {
        public TryChangeState(frags: number, announcerDelay: number): PlayerAnnouncerStartState
        {
            return this;
        }
    }
}