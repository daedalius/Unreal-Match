module Shells
{
    export class ShellManager
    {
        public static CanvasContext: CanvasRenderingContext2D;
        private static Shells: Array<ShellPresentation> = new Array<ShellPresentation>(0);

        public static Draw()
        {
            // Firstable earse all shells
            ShellManager.CanvasContext.clearRect(-2500, -2500, 5000, 5000);

            // If there is some shells...
            if(ShellManager.Shells)
            {
                // ...draw them
                for(var i = 0; i < ShellManager.Shells.length; i++)
                {
                    ShellManager.Shells[i].Draw();
                }
            }
        }

        public static Refresh(shellsObject: any)
        {
            ShellManager.Shells = new Array<ShellPresentation>(0);

            if(shellsObject && shellsObject.length != 0)
            {
                for(var i = 0; i < shellsObject.length; i++)
                {
                    var position = new Entities.Point(shellsObject[i].CurrentPosition.X, shellsObject[i].CurrentPosition.Y);
                    var weapon: Weapons.WeaponType = <Weapons.WeaponType>shellsObject[i].Weapon;
                    var newShellpresentation: ShellPresentation;

                    switch(weapon)
                    {
                        case Weapons.WeaponType.Shockrifle:
                            {
                                newShellpresentation = new ASMDShellPresentation(position);
                                break;
                            }
                    }
                    var length = ShellManager.Shells.push(newShellpresentation);
                }

                ShellManager.Draw();
            }
        }
    }

    export class ShellPresentation
    {
        public Image: HTMLImageElement;
        public CenterPoint: Entities.Point;
        public SpriteSize: Entities.Size;
        public DefaulShelltSize: Entities.Size;
        public SpriteDrawableSize: Entities.Size;

        constructor(center: Entities.Point, image: HTMLImageElement, defaultSize: Entities.Size, drawingSize: Entities.Size, spriteSize: Entities.Size)
        {
            this.CenterPoint = center;
            this.Image = image;
            this.DefaulShelltSize = defaultSize;
            this.SpriteDrawableSize = drawingSize;
            this.SpriteSize = spriteSize;
        }

        public Draw()
        {
            var startPointScreen = new Entities.Point(this.CenterPoint.X - this.DefaulShelltSize.Width / 2, this.CenterPoint.Y + this.DefaulShelltSize.Height / 2).Translate().ToScreen(Sizes.Canvas.Height);
            ShellManager.CanvasContext.drawImage(this.Image, 0, 0, this.SpriteSize.Width, this.SpriteSize.Height, startPointScreen.X, startPointScreen.Y, this.SpriteDrawableSize.Width, this.SpriteDrawableSize.Height);
        }
    }

    export class ASMDShellPresentation extends ShellPresentation
    {
        constructor(center: Entities.Point)
        {
            super(center, <HTMLImageElement>document.getElementById('asmd-sphere'), Sizes._originSizes.AsmdSphereSprite, Sizes.AsmdSphereSprite, Sizes.AsmdSphereInSpritesheet);
        }
    }
}