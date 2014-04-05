module Entities
{
    export class Multiplier
    {
        public onWidth;
        public onHeight;

        constructor(w: number, h: number)
        {
            this.onWidth = w;
            this.onHeight = h;
        }

        public ConvertToOpposite()
        {
            return new Multiplier(1 - this.onWidth, 1 - this.onHeight);
        }
    }
}