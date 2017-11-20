/**
 * @version     0.1.0
 * @author      anran758
 * @data        2017.11.20
 * @describe    进入自己的首页, 将代码复制到控制台, 将批量删除全部的微博,
 *              网速过慢可能会弹出警告, 将页面刷新, 重新启动代码即可
 */

var Del = (function() {
  // 经测试, 750ms是相对稳定的频率, 频率过快会弹警告.
  var timer = setTimeout(Delete, 800);
  var item = 0;

  function Delete() {
    /* 这里需要停止定时器等待懒加载, 请求XHR进行加载剩余数据.
     * 这里是微博的一个限制, 当页面中不存在相应的DOM, 就进行页面刷新.
     */
    if (item > 15) {
      item = 0;
      clearTimeout(timer);
      return timer = setTimeout(Delete, 15000);
    }

    // 模拟点击
    document.querySelector('a[action-type="fl_menu"]').click();
    document.querySelector('a[action-type="feed_list_delete"]').click();
    document.querySelector('a[action-type="ok"]').click();

    // `字符是ES6语法, 最新版本的现代浏览器都可以使用
    ++item;
    console.log(`已成功删除了${item}项`);
    timer = setTimeout(Delete, 750);
  }
})();