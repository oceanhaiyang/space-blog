/**
 * Created by minyi on 2016/11/25.
 */
$.ajax({
    url: '/account/login',
    type: 'post',
    data: $('form').serialize(),
    success: function (data) {
        console.log(data);
    }
});