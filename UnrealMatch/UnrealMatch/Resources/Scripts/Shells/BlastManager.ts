module Shells
{
    export class BlastManager
    {
        public static Handle(blastsObject: any)
        {
            if(blastsObject && blastsObject.length != 0)
            {
                for(var i = 0; i < blastsObject.length; i++)
                {
                    var position = new Entities.Point(blastsObject[i].Position.X, blastsObject[i].Position.Y);
                    var type = <Shells.BlastType>blastsObject[i].Type;
                    var newBlastAnimation: Animation.Animation;

                    // Positioning in 2D
                    var yDiff = position.Y - CurrentPlayer.Position.Y;
                    var xDiff = position.X - CurrentPlayer.Position.X;

                    // Expanding the range to cover a greater distance in the function with the limit values in 1000
                    yDiff = yDiff / 300;
                    xDiff = xDiff / 300;

                    switch(type)
                    {
                        case Shells.BlastType.ASMDBlast:
                            {
                                CurrentPlayer.Sounds.WeaponBundle.AsmdBlast.pos3d(xDiff, yDiff, 0);
                                CurrentPlayer.Sounds.WeaponBundle.AsmdBlast.play();
                                newBlastAnimation = new Animation.AsmdBlastAnimation(position);
                                break;
                            }

                        case Shells.BlastType.ASMDBigBlast:
                            {
                                CurrentPlayer.Sounds.WeaponBundle.AsmdBigBlast.pos3d(xDiff, yDiff, 0);
                                CurrentPlayer.Sounds.WeaponBundle.AsmdBigBlast.play();
                                newBlastAnimation = new Animation.AsmdBigBlastAnimation(position);
                                break;
                            }
                    }

                    Animation.AnimationManager.Add(newBlastAnimation);
                }
            }
        }
    }
}