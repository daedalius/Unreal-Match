interface Howler
{
    mute(): HowlerGlobal;
    unmute(): HowlerGlobal;
    noAudio: boolean;
    usingWebAudio: boolean;
    volume: (volumeLevel?: number) => number;
}

interface Howl
{
    fade: (fromVolume: number, toVolume: number, duration: number, callback?: () => any, id?: string) => Howl;
    load: () => Howl;
    loop: (loop: boolean) => any;
    mute: (id?: string) => Howl;
    off: (eventName: string, funcToRemove: () => any) => Howl;
    on: (eventName: string, funcToCall: () => any) => Howl;
    pause: (id?: string) => Howl;
    play: (sprite?: string, callback?: () => string) => Howl;
    pos: (positionInSeconds: number, id?: string) => any;
    pos3d: (x: number, y: number, z: number, id?: string) => any;
    sprite: (obj: any) => any;
    stop: (id?: string) => Howl;
    unmute: (id?: string) => Howl;
    urls: (urls: Array<any>) => any;
    volume: (volumeLevel?: number, id?: string) => Howl;
}

interface HowlerGlobal
{
    _howls: Array<Howl>;
    _muted: boolean;
    _volume: number;
    noAudio: boolean;
    usingWebAudio: boolean;
}

declare var Howler: Howler;

declare var Howl: {
    new (object: any): Howl;
}

