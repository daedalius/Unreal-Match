/// <reference path="../Libraries/howler.d.ts" />
/// <reference path="../Helpers.ts" />

class MenuHandling
{
    public static MenuThemeHowl: Howl;
    public static BackButtonHowl: Howl;
    public static NextButtonHowl: Howl;
    public static HoverButtonHowl: Howl;
    public static LightHoverButtonHowl: Howl;

    public static Init()
    {
        $('#join-header').on('click', MenuHandling.ShowJoinMenu);
        $('#create-header').on('click', MenuHandling.ShowCreateMenu);
        $('#back-link').on('click', MenuHandling.Back);

        MenuHandling.MenuThemeHowl = new Howl(
            {
                urls: ['/Resources/Audio/Menu/menu-theme.mp3', '/Resources/Audio/Menu/menu-theme.ogg'],
                autoplay: true,
                volume: 0.7,
                loop: true
            });

        MenuHandling.BackButtonHowl = new Howl(
            {
                urls: ['/Resources/Audio/Menu/menu-back.mp3', '/Resources/Audio/Menu/menu-back.ogg']
            });

        MenuHandling.NextButtonHowl = new Howl(
            {
                urls: ['/Resources/Audio/Menu/menu-next.mp3', '/Resources/Audio/Menu/menu-next.ogg']
            });

        MenuHandling.HoverButtonHowl = new Howl(
            {
                urls: ['/Resources/Audio/Menu/menu-hover.mp3', '/Resources/Audio/Menu/menu-hover.ogg']
            });


        MenuHandling.LightHoverButtonHowl = new Howl(
            {
                urls: ['/Resources/Audio/Menu/menu-hover-light.mp3', '/Resources/Audio/Menu/menu-hover-light.ogg']
            });

        $('.howl-back').on('click', function() { MenuHandling.BackButtonHowl.play() });
        $('.howl-next').on('click', function() { MenuHandling.NextButtonHowl.play() });
        $('.howl-back').on('mouseover', function() { MenuHandling.HoverButtonHowl.play() });
        $('.howl-next').on('mouseover', function() { MenuHandling.HoverButtonHowl.play() });
        $('select').on('mouseover', function() { MenuHandling.LightHoverButtonHowl.play() });
        $('input').on('mouseover', function() { MenuHandling.LightHoverButtonHowl.play() });
    }

    private static Back()
    {
        if($('#join-form').hasClass('invisible'))
        {
            // Hide create form
            MenuHandling.ToRight($('#create-form'), function()
            {
                $('#create-form').addClass('invisible');

                // Appear join header from left
                MenuHandling.FromLeft($('#join-header'), function()
                {
                    $('#join-header').removeClass('invisible');
                });

                // Hide back link
                $('#back-link').addClass('hidden');
            });
        }
        else
        {
            // Hide join form
            MenuHandling.ToRight($('#join-form'), function()
            {
                $('#join-form').addClass('invisible');

                // Appear join header from left
                MenuHandling.FromLeft($('#create-header'), function()
                {
                    $('#create-header').removeClass('invisible');
                });

                // Hide back link
                $('#back-link').addClass('hidden');
            });
        }

        // Restore background on hover headers
        $('#join-header').removeClass('disabled-background');
        $('#create-header').removeClass('disabled-background');
    }

    private static ShowJoinMenu()
    {

        MenuHandling.ToLeft($('#create-header'), function()
        {
            // Hide other form
            $('#create-header').addClass('invisible');
            // Show back link
            $('#back-link').removeClass('hidden');
            // Remove background on hover headers
            $('#join-header').addClass('disabled-background');

            // Show this form
            MenuHandling.FromRight($('#join-form'), function()
            {
                $('#join-form').removeClass('invisible');
            });
        });

    }

    private static ShowCreateMenu()
    {
        MenuHandling.ToLeft($('#create-header'), function()
        {
            // Remove background on hover headers
            $('#create-header').addClass('disabled-background');
            // Show back link
            $('#back-link').removeClass('hidden');
            // Hide other form
            $('#join-header').addClass('invisible');

            MenuHandling.FromRight($('#create-form'), function()
            {
                // Show this form
                $('#create-form').removeClass('invisible');
            })
        });
    }

    private static ToLeft(element: JQuery, afterCallback: () => void)
    {
        var callbackClosure = afterCallback;

        element.animate({ 'left': '-200%' }, 200, function()
        {
            jQuery(this).removeAttr('style');
            var c = callbackClosure;
            c();
        });
    }

    private static ToRight(element: JQuery, afterCallback: () => void)
    {
        var callbackClosure = afterCallback;

        element.animate({ 'right': '-200%' }, 200, function()
        {
            jQuery(this).removeAttr('style');
            var c = callbackClosure;
            c();
        });
    }

    private static FromRight(element: JQuery, beforeCallback: () => void)
    {
        element.css({ 'right': '-200%' });
        beforeCallback();
        element.animate({ 'right': '0' }, 200, function()
        {
            jQuery(this).removeAttr('style');
        });
    }

    private static FromLeft(element: JQuery, beforeCallback: () => void)
    {
        element.css({ 'left': '-200%' });
        beforeCallback();
        element.animate({ 'left': '0' }, 200, function()
        {
            jQuery(this).removeAttr('style');
        });
    }

}

window.onload = MenuHandling.Init;