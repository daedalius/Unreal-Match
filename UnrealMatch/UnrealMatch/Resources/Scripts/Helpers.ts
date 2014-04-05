/// <reference path="Variables.ts" />

class Helpers
{
    // Resize parent div for scale game on full browser window size
    public static ResizeContentElement()
    {
        // Get current orientation info
        var newWidth: number = jQuery(window).width();
        var newHeight: number = jQuery(window).height();

        if(newWidth > newHeight * 1.333)
        {
            // This is album orientation
            newWidth = Math.round(newHeight * 1.33333);

            // Height
            jQuery('#content').height(newHeight);

            // Width
            // Change width regarding current height
            jQuery('#content').width(Math.round(newHeight * 1.33333));
        }
        else
        {
            // This is portrait orientation 
            newHeight = Math.round(newWidth / 1.33333);

            // Width
            jQuery('#content').width(newWidth);
            // Change height regarding current width
            jQuery('#content').height(newHeight);
        }

        var contentSize: Entities.Size = new Entities.Size(newWidth, newHeight);
        Helpers.ResizeCanvases(contentSize);
    }

    // Resize all child canvases of content parents element
    private static ResizeCanvases(toSize: Entities.Size)
    {
        jQuery('#content canvas').attr('width', toSize.Width);
        jQuery('#content canvas').attr('height', toSize.Height);

        // Synchronize players angles
        if(CurrentPlayer != undefined && CurrentPlayer.OldAngleOfView != undefined)
        {
            CurrentPlayer.OldAngleOfView = 0;
            CurrentPlayer.AngleOfView = 0;
        }


        if(Sizes)
        {
            Sizes.ComputeActualSizes(toSize.Width);
        }
    }

    // Outputs string in browser console
    public static Log(message: any)
    {
        console.log(message);
    }
}
