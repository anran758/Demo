/*!
 * PageSwitch 1.0
 * PageSwitch.defaults 是参数列表
 *
 * @param [selectors]               要选择的DOM节点
 * @param [loop]                    是否循环切换, 默认为false
 * @param [index]                   页面开始索引
 * @param [easing]                  动画执行效果, 可选参数如下
 *        {ease || ease-in || ease-out || ease-in-out}
 * @param [keyborder]               是否触发键盘事件
 * @param [direction]               滑动方向
 * @param [direction]               滑动方向
 *        {vertical || horizontal}
 * @param [pagination]              是否进行分页
 * @param [callback]                自定义回调函数
 */
(function($) {
  "use strict";
  var _prefix = (function(temp) {
    var aPrefix = ["webkit", "moz", "o", "ms"],
        props = "";

    for (var i in aPrefix) {
      props = aPrefix[i] + "Transition";
      if (temp.style[props] !== undefined) {
        return "-" + aPrefix[i].toLowerCase() + "-";
      }
    }
    return false;
  })(document.createElement(PageSwitch));

  var PageSwitch = (function() {
    function PageSwitch(element, options) {
      // 从这里传入 default 默认值.
      this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
      this.element = element;
      this.init();
    }

    PageSwitch.prototype = {
      /* 初始化插件 */
      /* 初始化dom结构, 布局, 分页及绑定事件 */
      init : function() {
        var me = this;

        // 获取字符串
        console.log(me);
        me.selectors = me.settings.selectors;
        me.sections = me.element.find(me.selectors.sections);
        me.section = me.sections.find(me.selectors.section);

        me.direction = me.sections.direction ==
                       'vertical' ? true : false;
        me.pagesCount = me.pagesCount();
        me.index = (me.settings.index >= 0 &&
                    me.settings.index < me.pagesCount) ?
                    me.settings.index : 0;

        me.canscroll = true;

        // 如果是横屏, 就调用针对横屏的布局
         if(!me.direction || me.index) {
          me._initLayout();
         }

         if (me.settings.pagination) {
          me._initPaging();
         }

         me._initEvent();
      },
      /* 获取页面数量 */
      pagesCount : function() {
        return this.section.length;
      },
      /* 获取页面的宽或高度(横 / 竖屏滑动) */
      switchLength : function() {
        return this.direction ? this.element.height() :
                                this.element.width();
      },
      /* 页面滑动 */
      prev: function() {
        var me = this;
        if(me.index > 0) {
          me.index--;
        } else if (me.settings.loop) {
          me.index = me.pagesCount - 1;
        }
        me._scrollPage();
      },
      next: function() {
        var me = this;
        if (me.index < me.pagesCount) {
          me.index ++;
        } else if (me.settings.loop) {
          me.index = 0;
        }
        me._scrollPage();
      },
      /* 针对横屏情况进行布局 */
      _initLayout : function() {
        var me = this;
        if(!me.direction) {
          var width = (me.pagesCount * 100) + "%",
              cellWidth = (100 / me.pagesCount).toFixed(2) + "%";

          // 给容器及每个页面设置宽度
          me.sections.width(width);
          me.section.width(cellWidth).css('float', 'left');
        }
        if(me.index) {
          me._scrollPage(true);
        }
      },
      /* 实现分页结构及css样式 */
      _initPaging : function() {
        var me = this,
            pagesClass = me.selectors.page.substring(1);
        me.activeClass = me.selectors.active.substring(1);

        var pageHTML = '<ul class=' + pagesClass + '>';
        for (var i = 0; i < me.pagesCount; i++) {
          pageHTML += "<li></li>";
        }
        pageHTML += "</ul>";
        me.element.append(pageHTML);

        var pages = me.element.find(me.selectors.page);
        me.pageItem = pages.find('li');
        me.pageItem.eq(me.index).addClass(me.activeClass);

        // 判断横竖屏
        if (me.direction) {
          page.addClass('vertical');
        } else {
          page.addClass('horizontal');
        }
      },
      _initEvent : function() {
        var me = this;

        /* 鼠标滚轮事件 */
        me.element.on('mousewheel DOMMouseScroll', function(e) {
          e.preventDefault();
            var delta = e.originalEvent.wheelDelta ||
                        -e.originalEvent.datail;

          if(me.canscroll) {
            if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
              me.prev();
            } else if (delta < 0 && (me.index < (me.pagesCount - 1) &&
                      !me.settings.loop || me.settings.loop)) {
              me.next();
            }
          }
        });

        /* 分页点击事件 */
        me.element.on('click', me.selectors.pages + " li", function() {
          me.index = $(this).index();
          me._scrollPage();
        });

        /* 键盘事件 */
        if (me.settings.keyboard) {
          $(window).on("keydown", function(e) {
            var keyCode = e.keyCode;

            // Determine the direction key
            if (keyCode == 37 || keyCode == 38) {
              me.prev();
            } else if (keyCode == 39 || keyCode == 40) {
              me.next();
            }
          });
        }

        // 窗口变动事件
        $(window).resize(function() {
          var currentLength = me.switchLength(),
              // 获取当前页面相对于文档的坐标值
              offset = me.settings.direction ?
                       me.section.eq(me.index).offset().top :
                       me.section.eq(me.index).offset().left;

          if (Math.abs(offset) > currentLength / 2 &&
             me.index < (me.pagesCount - 1)) {
            me.index ++;
          }

          // me.index不为 0 的话
          if (me.index) {
            me._scrollPage();
          }
        });

        // 监听 Transiton
        me.sections.on('transtionend webkitTranstionEnd oTransitionEnd otransitionend', function() {
          me.canScroll = true;
          // 用户自定义回调函数, 判断类型为函数, 否则为无效参数
          if(me.settings.callback && $.type(me.settings.callback) == "function") {
            me.settings.callback();
          }
        });
      },
      _scrollPage: function() {
        var me = this,
            dest = me.section.eq(me.index).position();

        if(!dest) {
          return;
        }
        me.canScroll = false;

        // 动态添加 CSS3 属性
        if (_prefix) {
          me.sections.css(_prefix + "transtion", "all" + me.settings.duration +
                          " ms" + me.settings.easing);
          var translate = me.direction ? "translateY(-" + dest.top  + "px":
                                         "translateX(-" + dest.left + "px";
          me.sections.css(_prefix + "transform" + translate);
        } else {
          // 没有CSS3的浏览器, 使用 animate
          var animateCss = me.direction ? {top : -dest.top} : {left : -dest.left};

          me.sections.animate(animateCss. me.settings.duration, function() {
            me.canScroll = true;
            if(me.settings.callback && $.type(me.settings.callback) == "function") {
              me.settings.callback();
            }
          });
        }

        if (me.settings.pagination) {
          me.pageItem.eq(me.index).addClass(me.ativeClass).siblings("li").removerclass(me.activeClass);
        }
      }
    };
    return PageSwitch;
  })();

  $.fn.PageSwitch = function(options) {
    return this.each(function() {
      var me = $(this),
          instance = me.data("PageSwitch");

      // 非空
      if (!instance) {
        me.data('PageSwitch', (instance = new PageSwitch(me, options)));
      }

      if ($.type(options) === "string") {
        return instance[options]();
      }
    });
  };

  $.fn.PageSwitch.defaults = {
    selectors : {
      sections : ".sections",
      section : ".section",
      page : ".pages",
      active : ".active"
    },
    index : 0,
    loop : false,
    easing: "ease",
    duration : 500,
    keyboard : true,
    pagination : true,
    direction : "vertical",
    callback : ""
  };

  $(function() {
    $('[data-PageSwitch').PageSwitch();
  });
})(jQuery);