module Entities
{
    export class WeaponHUD extends AbstractHUD
    {
        // Index of active weapon (in players hand)
        private selectedIndex: number;
        // All weapons cells wraps
        public InnerWeaponCells: WeaponHUDCell[];

        constructor(rootElement: HTMLElement, startSelectedIndex: number)
        {
            super(rootElement);

            this.selectedIndex = startSelectedIndex;

            this.InnerWeaponCells = new Array(9);
            var tempNodes = $(rootElement).children();
            for(var i = 0; i < 9; i++)
            {
                this.InnerWeaponCells[i] = new WeaponHUDCell(<HTMLElement>tempNodes[i]);
            }
        }

        public Refresh()
        {
            
        }

        // Change size of cell buå not save (this approach requires the addition of the required class )
        public AnimateCell(index: number, toWidth: string, toHeight: string, animationDuration: number)
        {
            (function(context)
            {
                $(context.InnerWeaponCells[index].Cell).animate({ width: toWidth, height: toHeight }, animationDuration, function() { context.InnerWeaponCells[index].Cell.removeAttribute('style') });
                $(context.InnerWeaponCells[index].InnerElement).animate({ width: toWidth, height: toHeight }, animationDuration, function() { context.InnerWeaponCells[index].InnerElement.removeAttribute('style') });
            })(this)
    }

        // [TODO] - move it on main logic (when she is appear :D)
        public SelectNextWeapon()
        {
            for(var newIndex = this.selectedIndex + 1; newIndex < 9; newIndex++)
            {
                // if a player has a weapon in cell by new index 
                if($(this.InnerWeaponCells[newIndex].RootElement).hasClass('visible'))
                {
                    // step 1: fade current animation
                    (function(selectedIndex: number)
                    {
                        var tempOldSelectedIndex = selectedIndex;
                        WHUD.AnimateCell(tempOldSelectedIndex, "64px", "50px", 50);
                    })(this.selectedIndex);

                    // step 2: officialy deselect cell after animation
                    this.InnerWeaponCells[WHUD.selectedIndex].Deselect();

                    // step 3: growing new element animation
                    (function(selectedIndex: number)
                    {
                        var tempOldSelectedIndex = selectedIndex;
                        WHUD.AnimateCell(tempOldSelectedIndex, "110px", "80px", 50);
                    })(newIndex);

                    // step 4: officialy select cell after animation
                    this.InnerWeaponCells[newIndex].Select();

                    // step 5: save result selected index
                    this.selectedIndex = newIndex;
                    return;
                }
            }

            // players have no weapons on bigger index:
            // do nothing
            return;
        }

        // [TODO] - move it on main logic (when she is appear :D)
        public SelectPreviousWeapon()
        {
            for(var newIndex = this.selectedIndex - 1; newIndex >= 0; newIndex--)
            {
                // if a player has a weapon in cell by new index 
                if($(this.InnerWeaponCells[newIndex].RootElement).hasClass('visible'))
                {
                    // step 1: fade current animation
                    (function(selectedIndex: number)
                    {
                        var tempOldSelectedIndex = selectedIndex;
                        WHUD.AnimateCell(tempOldSelectedIndex, "64px", "50px", 50);
                    })(this.selectedIndex);

                    // step 2: officialy deselect cell after animation
                    this.InnerWeaponCells[this.selectedIndex].Deselect();


                    // step 3: growing new element animation
                    (function(selectedIndex: number)
                    {
                        var tempOldSelectedIndex = selectedIndex;
                        WHUD.AnimateCell(tempOldSelectedIndex, "110px", "80px", 50);
                    })(newIndex);

                    // step 4: officialy select cell after animation
                    this.InnerWeaponCells[newIndex].Select();

                    // step 5: save result selected index
                    this.selectedIndex = newIndex;
                    return;
                }
            }

            // players have no weapons on lower index:
            // do nothing
            return;
        }

        // [TODO] - move logic to main logic (when she is appear :D)
        public SelectWeaponByIndex(newSelectedIndex: number)
        {
            // if a player has a weapon in cell by new index 
            if($(this.InnerWeaponCells[newSelectedIndex].RootElement).hasClass('visible'))
            {
                this.InnerWeaponCells[this.selectedIndex].Deselect();
                this.InnerWeaponCells[newSelectedIndex].Select();
                this.selectedIndex = newSelectedIndex;
            }
        }

        public SetAmmoByIndex(index: number, quantity: number)
        {
            this.InnerWeaponCells[index].SetAmmo(quantity);
        }
    }
}