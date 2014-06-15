module Animation
{
    export class AnimationManager
    {
        public static CanvasContext: CanvasRenderingContext2D;
        private static Animations: Array<Animation> = new Array<Animation>(0);

        public static DoNextStep()
        {
            AnimationManager.CanvasContext.clearRect(0, 0, 3000, 3000);

            for(var i = 0; i < AnimationManager.Animations.length; i++)
            {
                if(AnimationManager.Animations[i])
                {
                    var isAnimationOver = AnimationManager.Animations[i].DoNextStep();
                    if(isAnimationOver)
                    {
                        // Mark element as unusual
                        AnimationManager.Animations[i] = null;
                    }
                }
            }

            // Maybe run animations array cleanup?
            //AnimationManager.Animations = Calculations.Get.CleanedArray(AnimationManager.Animations)
        }

        public static Add(animation: Animation)
        {
            var length = AnimationManager.Animations.push(animation);
            //// Run animation instantly
            //this.Animations[length-1].DoNextStep();
        }
    }
}