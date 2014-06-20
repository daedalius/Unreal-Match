/// <reference path="Shells/ShellManager.ts" />
/// <reference path="NetworkProcesses.ts" />


class Loader
{
    public static InitializeVariables()
    {
        IsMouseInputEnable = false;
        //IsMouseInputEnable = true;
        IsKeyboardInputEnable = false;
        //IsKeyboardInputEnable = true;
        IsPlayerDrawEnable = false;
        //IsPlayerDrawEnable = true;

        ////IsMouseInputEnable = false;
        //IsMouseInputEnable = true;
        ////IsKeyboardInputEnable = false;
        //IsKeyboardInputEnable = true;
        ////IsPlayerDrawEnable = false;
        //IsPlayerDrawEnable = true;

        Weapons.ClientWeaponManager.Init();

        // Sounds
        SoundManager.Announcer.Init();

        // Initializing HTMLElements
        ContentElement = <HTMLElement>document.getElementById('content');

        // Shells
        ShellsCanvas = <HTMLCanvasElement>document.getElementById('shells-canvas');
        ShellsContext = ShellsCanvas.getContext('2d');


        LevelCanvas = <HTMLCanvasElement>document.getElementById('level');
        LevelContext = LevelCanvas.getContext('2d');

        LevelPassCanvas = <HTMLCanvasElement>document.getElementById('levelPass');
        LevelPassContext = LevelCanvas.getContext('2d');
        LevelPassImage = <HTMLImageElement>document.getElementById("LevelImagePass");
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


        var currentPlayerId = parseInt($('#player-number').text());

        if(currentPlayerId != 0)
        {
            // Move canvaces down to make sure that current player will drow in the front
            $('#content').append($('#body' + currentPlayerId).remove());
            $('#content').append($('#head' + currentPlayerId).remove());
            $('#content').append($('#weapon' + currentPlayerId).remove());
        }

        // Get canvaces and add players
        for(var i = 0; i < Game.GameInfo.MaxPlayers; i++)
        {
            HeadCanvas = <HTMLCanvasElement>document.getElementById('head' + i);
            HeadContext = HeadCanvas.getContext('2d');

            BodyCanvas = <HTMLCanvasElement>document.getElementById('body' + i);
            BodyContext = BodyCanvas.getContext('2d');

            WeaponCanvas = <HTMLCanvasElement>document.getElementById('weapon' + i);
            WeaponContext = WeaponCanvas.getContext('2d');

            Players[i] = new Entities.Player("", i,<Game.TeamType>(i+1), new Entities.Point(600, 24), HeadContext, BodyContext, WeaponContext);
        }
        CurrentPlayer = Players[currentPlayerId];





        // RequestPath format: /{gamename}-{playerIndexNumber}
        Game.GameInfo.Socket += '/' + Game.GameInfo.Name + '-' + CurrentPlayer.ID;

        // Test
        TestCanvas = <HTMLCanvasElement>document.getElementById('test');
        TestContext = TestCanvas.getContext('2d');

        Level = new Game.Map($('#map-name').text(), new Entities.Size(parseInt($('#pass-map-width').text()), parseInt($('#pass-map-height').text())), '#pass-map-content');
        LevelImage.src = "/Resources/Images/Levels/" + Level.Title + ".jpg";
        LevelImageSize = new Entities.Size(LevelImage.naturalWidth, LevelImage.naturalHeight);
        LevelMapImageQualityMultiplier = parseFloat($('#map-quality').text());

        // Animations
        Animation.AnimationManager.CanvasContext = (<HTMLCanvasElement>document.getElementById('animation-canvas')).getContext('2d');

        // Shells
        Shells.ShellManager.CanvasContext = (<HTMLCanvasElement>document.getElementById('shells-canvas')).getContext('2d')

        Socket = new WebSocket(Game.GameInfo.Socket);

        WHUD.Refresh();
        GsHUD = new Entities.GameStatsHUD(document.getElementById('game-stats'));
        GsHUD.Show();
    }

    public static PlugInputEvents()
    {
        document.onmousemove = Handlers.MouseMoveHandler;
        //document.onmousewheel = Handlers.MouseWheelHandler;
        document.onmousedown = Handlers.MouseDownHandler;
        document.onmouseup = Handlers.MouseUpHandler;
        document.onkeypress = Handlers.KeyPressHandler;
        document.onkeyup = Handlers.KeyUpHandler;
        document.oncontextmenu = Handlers.ContextMenuHandler;
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
        Socket.onmessage = Network.NetworkProcesses.Receive;
        Socket.onclose = Network.NetworkProcesses.Close;
        Socket.onopen = Network.NetworkProcesses.Open;
        Socket.onerror = Network.NetworkProcesses.Error;
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