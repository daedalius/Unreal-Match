/// <reference path="../Helpers.ts" />

class MenuHandling
{
    public static Init()
    {
        $('#join-header').on('click', MenuHandling.ShowJoinMenu);
        $('#create-header').on('click', MenuHandling.ShowCreateMenu);
        $('#back-link').on('click', MenuHandling.Back);

        var menuThemePlayer: HTMLAudioElement = <HTMLAudioElement>document.getElementById('menu-theme');

        if(Helpers.IsIE())
        {
            menuThemePlayer.src = "/Resources/Audio/Menu/menu-theme.mp3";
            menuThemePlayer.load();
        }
        else
        {
            menuThemePlayer.src = "/Resources/Audio/Menu/menu-theme.ogg";
            menuThemePlayer.load();
        }
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