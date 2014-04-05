// HTML Elements
var ContentElement: HTMLElement;

// Player canvases
var HeadCanvas: HTMLCanvasElement;
var BodyCanvas: HTMLCanvasElement;
var WeaponCanvas: HTMLCanvasElement;
// Player contexts
var HeadContext: CanvasRenderingContext2D;
var BodyContext: CanvasRenderingContext2D;
var WeaponContext: CanvasRenderingContext2D;

// Nova images
var _WeaponNova: HTMLImageElement;
var _HeadNova: HTMLImageElement;
var _BodyNova: HTMLImageElement;

// HUD
var SHUD: Entities.StatusHUD;
var WHUD: Entities.WeaponHUD;

// Sizes
var Sizes: Entities.SizesSet;

// Frame offset (Cortesian CS)
var FrameOffset: Entities.Offset;

// Mouse
var Mouse: Entities.Point;

// Players
var PlayerOne: Entities.Player;
var CurrentPlayer: Entities.Player;

var Gravitation: Entities.Vector;

// Pass map
var LevelPassCanvas: HTMLCanvasElement;
var LevelPassContext: CanvasRenderingContext2D;
var LevelPassImage: HTMLImageElement;

// Level
var LevelCanvas: HTMLCanvasElement;
var LevelContext: CanvasRenderingContext2D;
var LevelImage: HTMLImageElement;
// Level image width and height
var LevelImageSize: Entities.Size;
var Level: Game.Map;

// Determines the ratio of the origin frame (800x600) to map frame. Value "1" means that the frames are equal.
var LevelMapImageQualityMultiplier: number;

// Test
var TestCanvas: HTMLCanvasElement;
var TestContext: CanvasRenderingContext2D;

// Intervals
var Interval50ID: number;