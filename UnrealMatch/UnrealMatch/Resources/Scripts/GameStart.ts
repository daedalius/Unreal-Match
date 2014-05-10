
window.onload = function(onloadEvent)
{
    // Workflow: resize -> initilize variables -> plug envents -> ...

    // Resizing
    Loader.PlugResizeEvent();
    Helpers.ResizeContentElement();

    // Attention! After first resize need to initialize all variables cause from content size depends sizing
    Loader.InitializeVariables();
    //WHUD.Show();
    //SHUD.Show();

    // Input handlers
    Loader.PlugInputEvents();
    Loader.StartUpdateCycles();

    // Plug socket handlers
    Loader.StartNetworkExchange();

    // Start drawing
    requestAnimationFrame(Draw);

    // Any experiments
    {
        (function()
        {
            var tempArray = TestPlayers.sort(function(a, b)
            {
                if(a && b)
                {
                    return a.Score - b.Score
                }
                else
                {
                    return -1;
                }
            }).reverse();
        })();
    }
}