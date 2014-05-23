/// <reference path="../Libraries/howler.d.ts" />
/// <reference path="../Helpers.ts" />

class MenuHandling
{
    public static MenuThemeHowl: Howl;
    public static BackButtonHowl: Howl;
    public static NextButtonHowl: Howl;
    public static HoverButtonHowl: Howl;

    public static Init()
    {
        $('#join-header').on('click', MenuHandling.ShowJoinMenu);
        $('#create-header').on('click', MenuHandling.ShowCreateMenu);
        $('#back-link').on('click', MenuHandling.Back);

        MenuHandling.MenuThemeHowl = new Howl(
            {
                urls: ['/Resources/Audio/Menu/menu-theme.mp3', '/Resources/Audio/Menu/menu-theme.ogg'],
                autoplay: true,
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

        $('.howl-back').on('click', function() { MenuHandling.BackButtonHowl.play() });
        $('.howl-next').on('click', function() { MenuHandling.NextButtonHowl.play() });
        $('.howl-back').on('mouseover', function() { Helpers.Log('hover!'); MenuHandling.HoverButtonHowl.play() });
        $('.howl-next').on('mouseover', function() { Helpers.Log('hover!'); MenuHandling.HoverButtonHowl.play() });
    }

    private static Back()
    {
        // Hide forms, hide back link
        $('#back-link').addClass('hidden');
        $('#join-form').addClass('invisible');
        $('#create-form').addClass('invisible');

        // Make all header visible
        $('#join-header').removeClass('invisible');
        $('#create-header').removeClass('invisible');

        // Restore background on hover headers
        $('#join-header').removeClass('disabled-background');
        $('#create-header').removeClass('disabled-background');
    }

    private static ShowJoinMenu()
    {
        // Show this form
        $('#join-form').removeClass('invisible');
        // Hide other form
        $('#create-header').addClass('invisible');
        // Show back link
        $('#back-link').removeClass('hidden');
        // Remove background on hover headers
        $('#join-header').addClass('disabled-background');
    }

    private static ShowCreateMenu()
    {
        // Show this form
        $('#create-form').removeClass('invisible');
        // Hide other form
        $('#join-header').addClass('invisible');
        // Show back link
        $('#back-link').removeClass('hidden');
        // Remove background on hover headers
        $('#create-header').addClass('disabled-background');
    }
}

window.onload = MenuHandling.Init;