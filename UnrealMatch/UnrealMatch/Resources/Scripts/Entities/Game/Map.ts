module Game
{
    export class Map
    {
        // Map ID
        public Title: string;
        // true - wall, false - empty space
        public PassablenessMap: Array<boolean[]>;

        /// Limiters of passability sides
        // Left limiter
        public MinX: number;
        // Right limiter
        public MaxX: number;

        /// Map outher size
        public OutherSize: Entities.Size;

        constructor(title: string, outherSize: Entities.Size, passablenessMapSelector: string)
        {
            this.Title = title;
            this.OutherSize = outherSize;

            // Get pass map
            this.PassablenessMap = new Array(this.OutherSize.Height);
            var liElements = jQuery(passablenessMapSelector).find('ul li');            
            var tempArrayLine;
            for(var h = 0; h < this.OutherSize.Height; h++)
            {
                // Initialize new line in array
                this.PassablenessMap[h] = new Array(this.OutherSize.Width);
                // Get string array from li element
                tempArrayLine = jQuery(liElements[h]).text().split('');
                // Convert to boolean
                for(var w = 0; w < this.OutherSize.Width; w++)
                {
                    this.PassablenessMap[h][w] = (tempArrayLine[w] == '0') ? false : true;
                }
            }

            // Detecting Min X and Max X from last line of pass map
            var isFirst = true;
            for(var w = 0; w < this.OutherSize.Width; w++)
            {
                if(this.PassablenessMap[this.OutherSize.Height - 1][w])
                {
                    if(isFirst)
                    {
                        this.MinX = w;
                        isFirst = false;
                    }
                    else
                    {
                        this.MaxX = w;
                    }
                }
            }
        }
    }
}
