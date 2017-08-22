(function($) {
  var PageSwitch = (function() {
    function PageSwitch(element, options) {
      this.settins = $.extend(true, $.fn.PageSwitch.default, options || {});
      this.element = element;
      this.init();
    }

    PageSwitch.prototype = {
      // 初始化插件
      // 初始化dom结构, 布局, 分页及绑定事件
      init : function() {
        var me = this;
        console.log(me);
        me.selectors = me.settings.selectors;
        me.sections
      },
      /* 获取页面数量 */
      pagesCount : function() {

      },
      /* 获取页面的宽或高度(横 / 竖屏滑动) */
      switchLength : function() {},

      /* 针对横竖屏情况进行布局 */
      _initLayout : function() {},
      _initPaging : function() {},
      _initEvent : function() {}
    };

    return PageSwitch;
  });

  $.fn.PageSwitch = function(options) {
    return this.each(function() {
      var me = $(this),
          instance = me.data("PageSwitch");

      // 非空
      if (!instance) {
        instance = new PageSwitch(me, options);
        me.data('PageSwitch', instance);
      }

      if ($.type(options) === "string") {
        return instance[options]();
      }

      $('div').PageSwitch('init');
    });
  };

  $.fn.PageSwitch.default = {
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
  })
})(jQuery);