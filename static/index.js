var screenLogin = (function ($) {
    function ScreenLogin() {
    }

    ScreenLogin.prototype = {
        login: function() {
            var me = this;
            var userid = $("input[name='usr']").val();
            var pass = $("input[name='pwd']").val();
            $.ajax({
                url: "/login",
                data: JSON.stringify({
                    userid: userid,
                    pass: pass
                }),
                type: "post",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result.status > 0) {
                        window.location.replace("/main/main.html");
                    } else {
                        alert('用户名或密码错误');
                    }
                }
            });
        }
    };
    return new ScreenLogin();
})(window["jQuery"]);