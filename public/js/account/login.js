/**
 * Created by minyi on 2016/11/25.
 */
var account = (function () {

    return {
        clickEvent: function () {
            var that = this;
            $('#loginBtn').on('click', function () {
                that.loginAjax();
            });
        },
        loginAjax: function () {
            var redirectUri = Url.queryString('redirect');
            $.ajax({
                url: '/account/login',
                type: 'post',
                data: $('form').serialize(),
                success: function (json) {
                    console.log(json.status);
                    if (json.status === 'ok') {
                        window.location.href = redirectUri;
                    } else {
                        alert('密码错误');
                    }
                },
                error: function () {
                    console.log('哪里出错了');
                }
            });
        }
    }
})();


account.clickEvent();




