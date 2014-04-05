module Entities
{
    // Present a size on canvas for smth element        
    export class Size
    {
        public Width: number;
        public Height: number;

        constructor(w: number, h: number)
        {
            this.Width = w;
            this.Height = h;
        }

        public ReturnMultiplied(multiplier: number): Size
        {
            return new Size(this.Width * multiplier, this.Height * multiplier);
        }
    }
} 