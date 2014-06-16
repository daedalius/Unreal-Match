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
                        throw new Exceptions.InvalidOperationException('There is no neutral players');
                    }
                case Game.TeamType.Red:
                    {
                        return new Game.RedTeam();
                    }
                case Game.TeamType.Blue:
                    {
                        return new Game.BlueTeam();
                    }
                case Game.TeamType.Green:
                    {
                        return new Game.GreenTeam();
                    }
                case Game.TeamType.Yellow:
                    {
                        return new Game.YellowTeam();
                    }
            }
        }
    }

    //export class NoTeam extends Team
    //{
    //    public GetTeamWeaponsPresentation(): HTMLImageElement
    //    {
    //        return _WeaponNova;
    //    }

    //    public GetTeamHeadPresentation(): HTMLImageElement
    //    {
    //        return _HeadNova;
    //    }

    //    public GetTeamBodyPresentation(): HTMLImageElement
    //    {
    //        return _BodyNova;
    //    }
    //}

    export class RedTeam extends Team
    {
        public GetTeamWeaponsPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('weapons-team-0');
        }

        public GetTeamHeadPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('head-team-0');
        }

        public GetTeamBodyPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('body-team-0');
        }
    }

    export class BlueTeam extends Team
    {
        public GetTeamWeaponsPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('weapons-team-1');
        }

        public GetTeamHeadPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('head-team-1');
        }

        public GetTeamBodyPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('body-team-1');
        }
    }

    export class GreenTeam extends Team
    {
        public GetTeamWeaponsPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('weapons-team-2');
        }

        public GetTeamHeadPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('head-team-2');
        }

        public GetTeamBodyPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('body-team-2');
        }
    }

    export class YellowTeam extends Team
    {
        public GetTeamWeaponsPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('weapons-team-3');
        }

        public GetTeamHeadPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('head-team-3');
        }

        public GetTeamBodyPresentation(): HTMLImageElement
        {
            return <HTMLImageElement>document.getElementById('body-team-3');
        }
    }
} 