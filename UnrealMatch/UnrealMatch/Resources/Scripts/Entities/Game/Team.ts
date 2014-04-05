module Game
{
    export class Team
    {
        public GetTeamWeaponsPresentation(): HTMLImageElement
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class.");
        }

        public GetTeamHeadPresentation(): HTMLImageElement
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class");
        }

        public GetTeamBodyPresentation(): HTMLImageElement
        {
            throw new Exceptions.InvalidOperationException("Called method in abstact class");
        }

        public static CreateCharacter(team: Game.TeamType): Team
        {
            switch(team)
            {
                case Game.TeamType.None:
                    {
                        return new Game.NoTeam();
                    }
            }
        }
    }

    export class NoTeam extends Team
    {
        public GetTeamWeaponsPresentation(): HTMLImageElement
        {
            return _WeaponNova;
        }

        public GetTeamHeadPresentation(): HTMLImageElement
        {
            return _HeadNova;
        }

        public GetTeamBodyPresentation(): HTMLImageElement
        {
            return _BodyNova;
        }
    }
} 