(function ($) {
  waterfall();
  $(window).on('scroll resize', function () {
    if (checkScrollSlide()) {
      $.ajax({
        url: "js/_images.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
          $.each(data.data, function (key, value) {
            // 创建DOM节点
            var box = $('<div>').addClass('box').appendTo($('#waterfall'));
            var pic = $('<div>').addClass('pic').appendTo($(box));
            var img = $('<img>').attr('src', '_images/' + $(value).attr('src')).appendTo($(pic));
          });
        }
      });
    }
    waterfall();
  });

  function waterfall() {
    var $boxs = $('#waterfall > div');
    var width = $boxs.eq(0).outerWidth();
    var clos = Math.floor($(window).width() / width);
    $('#waterfall').width(width * clos).css('margin', '0 auto');

    var arrHei = [];
    $boxs.each(function (index, value) {
      var height = $boxs.eq(index).outerHeight();
      if (index < clos) {
        arrHei.push(height);
      } else {
        var minHei = Math.min.apply(null, arrHei);
        var minIndex = $.inArray(minHei, arrHei);

        // 每个遍历的节点都添加css属性
        $(value).css({
          'position': 'absolute',
          'top': minHei + 'px',
          'left': minIndex * width + 'px'
        });
        arrHei[minIndex] += $boxs.eq(index).outerHeight();
      }
    });
  }

  // 数据块加载的条件
  function checkScrollSlide() {
    // 获取最后一个节点
    var $lastBox = $('#waterfall > div').last();

    // $lastBox.offset().top 只是相对最后一个节点向上的偏移量 再加上自身高度的一半
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    var scrollTop = $(window).scrollTop();
    var documentHei = $(window).height();
    return (lastBoxDis < scrollTop + documentHei) ? true : false;
  }
})(jQuery);
