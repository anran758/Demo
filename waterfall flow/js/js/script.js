(function($) {
	var dog = {
		$: function(id) {
			return documemt.querySelector(id);
		}
	};

	waterfall("waterfall", ".box");

	function waterfall(parent, box) {
		var container = document.getElementById(parent);
		var sons = document.querySelectorAll(box);

		// 首先计算整个页面的列数
		var sonsWidth = sons[0].offsetWidth;
		var clos = Math.floor(document.documentElement.clientWidth / sonsWidth);

		// Set the width of the Mian
		container.style.width = (sonsWidth * clos) + "px";

		var arrHei = [];
		// 存放每列的高度
		for(var i = 0; i < sons.length; i ++) {
			if(i < clos) {
				arrHei.push(sons[i].offsetHeight);
			} else {
				// 获取每列最小的高度, 来进行排序
				var minHeight = Math.min.apply(null, arrHei);
				var index = arrHei.indexOf(minHeight);
				sons[i].style.position = "absolute";
				sons[i].style.top = minHeight + "px";

				// 就是获取左边的偏移量, 两种方式都是一样的
				sons[i].style.left = sonsWidth * index + "px";
				// sons[i].style.left = sons[index].offsetLeft + "px";

				// 原来 arrHei 的值 + 新加图片的图片的高
				arrHei[index] += sons[i].offsetHeight;
			}
		}
				console.log(arrHei);
	}
})();