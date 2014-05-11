/// <reference path="../../Libraries/jquery.d.ts" />

module Entities
{
    export class WeaponHUDCell extends AbstractHUD
    {
        public InnerElement: HTMLElement;
        public AmmoElement: HTMLElement;

        constructor(cell: HTMLElement)
        {
            super(cell);
            this.InnerElement = <HTMLElement>$(this.RootElement).children()[0];
            this.AmmoElement = <HTMLElement>this.InnerElement.querySelector('p');
        }

        public Activate()
        {
            // Remove class for overall appearance (ammo has been found)
            $(this.InnerElement).removeClass('deactivated');
        }

        public Deactivate()
        {
            // Add class to fading weapon without ammo (ammo is over)
            $(this.InnerElement).addClass('deactivated');
        }

        public Select()
        {
            // Select as active (take up arms)
            $(this.RootElement).addClass('active-cell');
        }

        public Deselect()
        {
            // Deselect (put weapon to select another)
            $(this.RootElement).removeClass('active-cell');
        }

        public SetAmmo(quantity: number)
        {
            // If this is not a impact-hammer
            if(this.AmmoElement)
            {
                this.AmmoElement.innerText = quantity.toString();
            }
            else
            {
                console.log('WARNING: trying to set ammo to weapon without rounds');
            }
        }
    }
}