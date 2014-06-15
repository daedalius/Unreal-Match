module Shells
{
    export class BlastManager
    {
        public static Animate(blastsObject: any)
        {
            if(blastsObject && blastsObject.length != 0)
            {
                console.log('animation handling...');

                for(var i = 0; i < blastsObject.length; i++)
                {
                    var position = new Entities.Point(blastsObject[i].Position.X, blastsObject[i].Position.Y);
                    var type = <Shells.BlastType>blastsObject[i].Type;
                    var newBlastAnimation: Animation.Animation;

                    switch(type)
                    {
                        case Shells.BlastType.ASMDBlast:
                            {
                                newBlastAnimation = new Animation.AsmdBlastAnimation(position);
                                console.log('small blast!');
                                break;
                            }

                        case Shells.BlastType.ASMDBigBlast:
                            {
                                newBlastAnimation = new Animation.AsmdBigBlastAnimation(position);
                                console.log('big blast!');
                                break;
                            }
                    }

                    Animation.AnimationManager.Add(newBlastAnimation);
                }
            }
        }
    }
}