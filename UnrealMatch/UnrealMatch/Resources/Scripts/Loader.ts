/// <reference path="Network.ts" />


class Loader
{
    public static InitializeVariables()
    {
        // Initializing HTMLElements
        ContentElement = <HTMLElement>document.getElementById('content');

        HeadCanvas = <HTMLCanvasElement>document.getElementById('head');
        HeadContext = HeadCanvas.getContext('2d');

        BodyCanvas = <HTMLCanvasElement>document.getElementById('body');
        BodyContext = BodyCanvas.getContext('2d');

        WeaponCanvas = <HTMLCanvasElement>document.getElementById('weapon');
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
        Game.GameInfo.Phase = Game.GamePhase.PlayersWaiting;

        // Players and current player
        Players = new Array<Entities.Player>(Game.GameInfo.MaxPlayers);
        CurrentPlayer = new Entities.Player("Nova", parseInt($('#player-number').text()), Game.TeamType.None, new Entities.Point(600, 24), HeadContext, BodyContext, WeaponContext);
        Players[CurrentPlayer.ID] = CurrentPlayer;

        // RequestPath format: /{gamename}-{playerIndexNumber}
        Game.GameInfo.Socket += '/' + Game.GameInfo.Name +'-' + CurrentPlayer.ID;

        // Test
        TestCanvas = <HTMLCanvasElement>document.getElementById('test');
        TestContext = TestCanvas.getContext('2d');

        Level = new Game.Map($('#map-name').text(), new Entities.Size(parseInt($('#pass-map-width').text()), parseInt($('#pass-map-height').text())), '#pass-map-content');
        LevelImage.src = "/Resources/Images/Levels/" + Level.Title + ".jpg";
        LevelImageSize = new Entities.Size(LevelImage.naturalWidth, LevelImage.naturalHeight);
        LevelMapImageQualityMultiplier = parseFloat($('#map-quality').text());

        Socket = new WebSocket(Game.GameInfo.Socket);
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
        Socket.onclose = function() {
            console.log('socket has been closed');
        }
    }
}