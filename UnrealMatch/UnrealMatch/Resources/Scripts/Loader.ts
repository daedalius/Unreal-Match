/// <reference path="Network.ts" />


class Loader
{
    public static InitializeVariables()
    {
        // Initializing HTMLElements
        ContentElement = <HTMLElement>document.getElementById('content');

        HeadCanvas = <HTMLCanvasElement>document.getElementById('head0');
        HeadContext = HeadCanvas.getContext('2d');

        BodyCanvas = <HTMLCanvasElement>document.getElementById('body0');
        BodyContext = BodyCanvas.getContext('2d');

        WeaponCanvas = <HTMLCanvasElement>document.getElementById('weapon0');
        WeaponContext = WeaponCanvas.getContext('2d');

        LevelCanvas = <HTMLCanvasElement>document.getElementById('level');
        LevelContext = LevelCanvas.getContext('2d');

        LevelPassCanvas = <HTMLCanvasElement>document.getElementById('levelPass');
        LevelPassContext = LevelCanvas.getContext('2d');
        LevelPassImage = <HTMLImageElement>document.getElementById("LevelPassImage");

        _HeadNova = <HTMLImageElement>document.getElementById("PlayerOneHeadSpritesheet");
        _BodyNova = <HTMLImageElement>document.getElementById("PlayerOneBodySpritesheet");
        _WeaponNova = <HTMLImageElement>document.getElementById("PlayerOneWeaponSpritesheet");
        LevelImage = <HTMLImageElement>document.getElementById("LevelImage");

        // Enabling HUD    
        WHUD = new Entities.WeaponHUD(document.getElementById('weapon-cells-wrapper'), Weapons.WeaponType.Enforcer);
        SHUD = new Entities.StatusHUD(document.getElementById('player-status'));

        // Proportions
        Sizes = new Entities.SizesSet($('#content').width());

        // Initial Offset
        FrameOffset = new Entities.Offset(0, 0);

        // Mouse
        Mouse = new Entities.Point(0, 0);

        // Gravity vector
        Gravitation = new Entities.Vector(0, -80);

        // Game main information
        Game.GameInfo.Host = $('#server-url').text();
        Game.GameInfo.Socket = Game.GameInfo.Host.replace('http', 'ws');
        Game.GameInfo.Name = $('#game-name').text();
        Game.GameInfo.MaxPlayers = parseInt($('#players-count').text());
        Game.GameInfo.Phase = Game.GamePhase.Waiting;
        Game.GameInfo.PhaseHandler = new Game.WaitingGamePhaseHandler();

        // Players and current player
        Players = new Array<Entities.Player>(Game.GameInfo.MaxPlayers);

        // Prepare resources for current player
        CurrentPlayer = new Entities.Player("", parseInt($('#player-number').text()), Game.TeamType.None, new Entities.Point(600, 24), HeadContext, BodyContext, WeaponContext);
        Players[CurrentPlayer.ID] = CurrentPlayer;

        // prepare canvaces for other players
        // [TODO] - refact this shit
        for(var i = 0; i < Game.GameInfo.MaxPlayers; i++)
        {
            if(i < CurrentPlayer.ID)
            {
                var tempHeadCanvas = <HTMLCanvasElement>document.getElementById('head' + (i + 1).toString());
                var tempHeadContext = tempHeadCanvas.getContext('2d');

                var tempBodyCanvas = <HTMLCanvasElement>document.getElementById('body' + (i + 1).toString());
                var tempBodyContext = tempBodyCanvas.getContext('2d');

                var tempWeaponCanvas = <HTMLCanvasElement>document.getElementById('weapon' + (i + 1).toString());
                var tempWeaponContext = tempWeaponCanvas.getContext('2d');

                Players[i] = new Entities.Player("", i, Game.TeamType.None, new Entities.Point(600, 24), tempHeadContext, tempBodyContext, tempWeaponContext);
            }

            if(i > CurrentPlayer.ID)
            {
                var tempHeadCanvas = <HTMLCanvasElement>document.getElementById('head' + i.toString());
                var tempHeadContext = tempHeadCanvas.getContext('2d');

                var tempBodyCanvas = <HTMLCanvasElement>document.getElementById('body' + i.toString());
                var tempBodyContext = tempBodyCanvas.getContext('2d');

                var tempWeaponCanvas = <HTMLCanvasElement>document.getElementById('weapon' + i.toString());
                var tempWeaponContext = tempWeaponCanvas.getContext('2d');

                Players[i] = new Entities.Player("", i, Game.TeamType.None, new Entities.Point(600, 24), tempHeadContext, tempBodyContext, tempWeaponContext);
            }
        }


        // RequestPath format: /{gamename}-{playerIndexNumber}
        Game.GameInfo.Socket += '/' + Game.GameInfo.Name + '-' + CurrentPlayer.ID;

        // Test
        TestCanvas = <HTMLCanvasElement>document.getElementById('test');
        TestContext = TestCanvas.getContext('2d');

        Level = new Game.Map($('#map-name').text(), new Entities.Size(parseInt($('#pass-map-width').text()), parseInt($('#pass-map-height').text())), '#pass-map-content');
        LevelImage.src = "/Resources/Images/Levels/" + Level.Title + ".jpg";
        LevelImageSize = new Entities.Size(LevelImage.naturalWidth, LevelImage.naturalHeight);
        LevelMapImageQualityMultiplier = parseFloat($('#map-quality').text());

        Socket = new WebSocket(Game.GameInfo.Socket);

        //TestPlayers = new Array<Entities.TestPlayer>(3);
        //TestPlayers[0] = new Entities.TestPlayer('player1', 1, 1);
        //TestPlayers[1] = new Entities.TestPlayer('player2', 2, 10);
        //TestPlayers[2] = new Entities.TestPlayer('player3', 3, 5);
        //TestPlayers[3] = new Entities.TestPlayer('player4', 4, 6);
        //TestCurrentPlayer = TestPlayers[0];
        GsHUD = new Entities.GameStatsHUD(document.getElementById('game-stats'));
        GsHUD.Show();
    }

    public static PlugInputEvents()
    {
        document.onmousemove = Handlers.MouseMoveHandler;
        document.onmousewheel = Handlers.MouseWheelHandler;
        document.onkeypress = Handlers.KeyPressHandler;
        document.onkeyup = Handlers.KeyUpHandler;
    }

    public static PlugResizeEvent()
    {
        window.onresize = Helpers.ResizeContentElement;
    }

    public static StartUpdateCycles()
    {
        Interval50ID = setInterval(Interval50, 50);
        Interval100ID = setInterval(Interval100, 100);
    }

    public static StartNetworkExchange()
    {
        Socket.onmessage = Network.NetworkHandlers.Receive;
        Socket.onclose = Network.NetworkHandlers.Close;
        Socket.onopen = Network.NetworkHandlers.Open;
    }

    public static PlayLevelTheme()
    {
        var levelAudio = <HTMLAudioElement>document.getElementById('level-theme');

        if(Helpers.IsIE())
        {
            levelAudio.src = "/Resources/Audio/Levels/" + Level.Title + ".mp3";
            levelAudio.load();
        }
        else
        {
            levelAudio.src = "/Resources/Audio/Levels/" + Level.Title + ".ogg";
            levelAudio.load();
        }
    }
}