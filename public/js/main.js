/**
 * Created by minyi on 2016/12/13.
 */
var main = (function () {
    return {
        showMenu: function(){
            var hasMenu = false;
            $('.nav-bar-btn').on('click', function () {
                if (!hasMenu) {
                    $('nav').show();
                    $('#content').css('padding-top', '116px');
                    hasMenu = true;
                } else {
                    $('nav').hide();
                    $('#content').css('padding-top', '56px');
                    hasMenu = false;
                }
            });
        },
        initStyle: function () {
            var contentHeight = $(window).height() - $('#mainFooter').height();
            $('#content').css('min-height', contentHeight);
        }
    };
})();

main.showMenu();
main.initStyle();