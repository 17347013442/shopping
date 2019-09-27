var dialogModule = (function (dialog) {
    /**
     属性：非对外函数，外部页面不用调用
     描述：设置提示框居中
     **/
    function initMsg(info) {
        dialog.closeMsg();
        $("<div id='phoneMsg'>").css({
            position: "fixed",
            zIndex: "3001",
            padding: "10px",
            maxWidth: "80%",
            background: "#444f69",
            boxShadow: "0 1px 2px rgba(0,0,0,0.7)",
            border: "2px #dfe1e6 solid",
            borderRadius: "10px",
            color: "#ffffff",
            fontSize: "16px",
            wordWrap: "break-word"
        }).html(info).appendTo("body");
    }

    /**
     属性：非对外函数，外部页面不用调用
     描述：设置提示框居中
     **/
    function setMsgCenter() {
        var msg = $("#phoneMsg");
        var msgWidth = msg.outerWidth();
        var msgHeight = msg.outerHeight();
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var top;
        if(windowHeight>1600){
            windowHeight=1000;
        }
        if(windowHeight<800){
            windowHeight=1000;
        }
        if(document.title == ""){
            top = (window.screen.availHeight - msg[0].offsetHeight - 200) / 3 + parent.pageYOffset
        }else{
            top = (windowHeight - msgHeight) /2 - 300 + "px";
        }
        msg.css({
            left: (windowWidth - msgWidth) / 2 + "px",
            top:top
        });
    }

    /**
     描述：关闭消息提示框
     **/
    dialog.closeMsg = function () {
        return $("#phoneMsg").remove();
    };

    /**
     参数：info要给用户提示的信息，call关闭之后的回调
     描述：消息提示框，3秒钟后自动关闭
     **/
    dialog.iTips = function (info, func) {
        $("#mask").hide();
        initMsg(info);
        setMsgCenter();
        setTimeout(function () {
            dialog.closeMsg();
            if (func) func();
        }, 3000);
    };

    /**
     参数：info要给用户提示的信息，call关闭之后的回调
     描述：消息提示框，需要手动关闭
     **/
    dialog.iTipsLonger = function (info) {
        initMsg(info);
        setMsgCenter();
    };
    return dialog;
}(dialogModule || {}));
