//适用于移动端的弹出层插件
//MIT
//from me
//var a=new Dialog();
//a.close();
; (function (win, $) {
            //生成唯一id
            function getid() {
                var temp = window.GUID + 1 || 0;
                window.GUID = temp;
                return temp;
            }
            function Dialog(options) {
                var defaults = {
                    width: "80%",
                    height: 108,
                    background: "#fff",
                    locked: true,
                    ok: null,
                    cancel: null,
                    content: "",
                };
                //获取配置项
                var options = $.extend({}, defaults, options);
                //获取id
                var id = "dialog" + getid(),
                     width = $(win).width(),
                     height = $(win).height(),
                     bg,
                     btnbg,
                     btnok,
                     btncancel,
                     btnw,
                     offset = {
                         left: 0
                     };
                if (typeof options.width === "string") {
                    var temp = 1 - parseInt(options.width) / 100;
                    offset = {
                        left: width * temp / 2,
                    };
                } else {
                    offset = {
                        left: (width - options.width) / 2,
                    }
                }
                var box = $("<div>", { id: id, "class": "animated slideInDown" }).css({
                    "position": "absolute", "top": "45%", "left": offset.left, "z-index": 99999,
                    "background": "rgba(0,0,0,.5)", "border-radius": "5px", "-webkit-border-radius": "5px",
                    "overflow": "hidden",
                    width: options.width, height: options.height
                });
                var content = $("<div>").css({
                    "background": options.background,
                    "padding": "25px 10px",
                    "text-align": "center",
                }).html(options.content).appendTo(box);

                function close() {
                        btnbg&&box.remove();
                        bg&&bg.remove();
                }
                $("body").append(box);
                options.height = box.height();
                box.css({
                    "top": height / 2 - options.height / 2
                });
                //如果要锁定背景层
                if (options.locked) {
                    bg = $("<div>").css({
                        "background": "rgba(0,0,0,.8)",
                        "width": "100%", "height": "100%",
                        "z-index": 99990,
                        "position": "absolute", "top": 0, "left": 0
                    }).appendTo($("body"));
                }
                //设置按钮背景
                function setButton() {
                    if (!btnw) {
                        btnw = box.width();
                    }
                    if (!btnbg) {
                        btnbg = $("<div>").css({
                            "width": btnw, "height": 40
                        }).appendTo(box);
                    }
                }
                //如果要返回
                if (options.ok) {
                    setButton();
                    btnok = $("<button>").css({
                        "margin": "0", "font-size": "20px", "float": "left",
                        "width": btnw, "height": "40px", "border": "none",
                        "background": "#FBA733"
                    }).text("确定").appendTo(btnbg);
                    btnok.on("touchend", function () {
                        close();
                        options.ok();
                    });
                }
                //如果要取消
                if (options.cancel) {
                    setButton();
                    btncancel = $("<button>").css({
                        "margin": "0", "font-size": "20px", "float": "right",
                        "width": "100%", "height": "40px", "border": "none",
                        "background": "#E6E6E6"
                    }).text("取消").appendTo(btnbg);
                    btncancel.on("touchend", function () {
                        close();
                        options.cancel();
                    });
                    if (btnok) {
                        btnok.width(btnw / 2 - 1);
                        btncancel.width(btnw / 2);
                    }
                }
                return {
                    id: id,
                    close: close,
                };
            }
            if (!win.Dialog) {
                win.Dialog = Dialog;
            }
        })(window, Zepto || jQuery);
