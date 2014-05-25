module SoundManager
{
    export class PlayerAnnouncerStartState
    {
        public AnnounceState()
        {
        }

        public TryChangeState(frags: number, announcerDelay : number): PlayerAnnouncerStartState
        {
            if(frags >= 5)
            {
                var newState = new KillingspreeState();
                setTimeout(newState.AnnounceState, announcerDelay);
                return newState;
            }
            else
            {
                return this;
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
                var newState = new RampageState();
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
                var newState = new DominatingState();
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
                var newState = new UnstoppableState();
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
                var newState = new GodlikeState();
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
                return new EmptyState();
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