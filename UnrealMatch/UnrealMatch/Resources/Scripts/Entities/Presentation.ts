//module Entities
//{
//    export class Presentation
//    {
//        // [TODO] - передавать PresentationInfo
//        constructor(imageSrc: string, object : Player)
//        {
//            this.image = new Image();    
//            this.image.src = imageSrc;
//            this.previousPoint = null;
//            this.presentationObject = object;
//            this.frame = 0;
//        }

//        private image: HTMLImageElement;
//        private frame: number;
//        private previousPoint: Entities.Point;
//        private presentationObject: Player;

//        public NextFrame()
//        {
//            if (this.frame === 5)
//            {
//                this.frame = 0;
//            }
//            this.frame++;
//        }

//        public Draw()
//        {
//            // For the first time of drawing
//            if (this.previousPoint !== null)
//            {
//                testCanvasContext.clearRect(0, 0, 800, 600);
//            }

//            this.previousPoint = this.presentationObject.Coordinates;

//            if (this.presentationObject.SelfVelocity.X != 0)
//            {
//                testCanvasContext.drawImage(this.image, 110 * this.frame, 0, 110, 151, this.presentationObject.Coordinates.X, this.presentationObject.Coordinates.Y, 110, 151);
//            }
//            else
//            {
//                testCanvasContext.drawImage(this.image, 0, 302, 110, 151, this.presentationObject.Coordinates.X, this.presentationObject.Coordinates.Y, 110, 151);
//            }
//        }
//    }
//}