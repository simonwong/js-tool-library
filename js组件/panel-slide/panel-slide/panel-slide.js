/**
 * 收缩panel。wsj.2017.5.16
 * @param  {[type]} el  [父极节点对象, $("#panel")]
 * @param  {[type]} obj [对象]
 */

// example.
// html
// <div id="panel">
//     <div id="treegrid"></div>
// </div>
// 
// js
// var showFunction = function () {
//     console.log("you click show button")
// }
// panelSlide($("#panel"), { title: "标题", showOnly: true, showFn: showFunction });

function panelSlide (el, obj) {
    var theObj = {
        title: "panel", // 标题
        width: "100%",  // 宽度
        height: "100%", // 内容高度，如果panel里面放置多个节点，设置的是每个节点高度
        isShow: true, // 初始渲染是否显示，隐藏
        showOnly: false,  // 是否只展示当前，隐藏其他
        showFn: function () {}, // 显示时，调用
        closeFn: function () {} // 关闭时， 调用函数
    }
    var arrowClass = "";
    // 添加一个content节点
    el.children().wrap("<div class='j_panel_content'></div>");
    var content = el.children();

    if (el) {
        if (obj) {
            // 判断obj参数，有的替换，没有用默认
            for (var item in obj) {
                if (obj.hasOwnProperty(item) && theObj.hasOwnProperty(item)) {
                    theObj[item] = obj[item];
                }
            }
        }
        // 判断初始是否隐藏.down是show
        if (theObj.isShow) {
            arrowClass = "j_arrow_down";
            content.show();
        } else {
            arrowClass = "j_arrow_up";
            content.hide();
        }
        // 设置样式
        el.css({
            "width": theObj.width
        })
        content.css({
            "width": theObj.width,
            "height": theObj.height
        })

        // 添加头部
        var panelHead = 
            $("<div class='j_panel_head'>" +
                "<span class='j_head_title'>" + theObj.title + "</span>" +
                "<span class='j_arrow_button " + arrowClass + "'></span>" +
            "</div>")
        el.prepend(panelHead);

        // 显示隐藏点击事件
        panelHead.children(".j_arrow_button").click(function () {
            var _this = $(this)
            if (_this.hasClass("j_arrow_up")) { // 展示
                if (theObj.showOnly) {
                    // 只让当前的展示，其他的关闭
                    // 遍历content，关闭
                    $(document).find(".j_panel_content").each(function () {
                        if (!$(this).is(":hidden")) {
                            $(this).slideToggle("fast");
                        }
                    })
                    // 遍历按钮，箭头变向上
                    $(document).find(".j_arrow_button").each(function () {
                        if ($(this).hasClass("j_arrow_down")) {
                            $(this).removeClass("j_arrow_down").addClass("j_arrow_up");
                        }
                    })
                }
                _this.removeClass("j_arrow_up").addClass("j_arrow_down");
                content.slideToggle("fast");
                theObj.showFn();
            } else if (_this.hasClass("j_arrow_down")) { // 隐藏
                _this.removeClass("j_arrow_down").addClass("j_arrow_up");
                content.slideToggle("fast");
                theObj.closeFn();
            }
        })
    }
}