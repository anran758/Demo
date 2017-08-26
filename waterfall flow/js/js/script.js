(function($) {
	var dataInt = {
		"data" : [
			{'src': "01.jpg"},
			{'src': "02.jpg"},
			{'src': "03.jpg"},
			{'src': "04.jpg"},
			{'src': "05.jpg"},
			{'src': "06.jpg"}
		]
	};

	Ajax('GET', 'js/script.js' ,dataInt , function(data) {
		console.log(data)
	})

	function Ajax(type, url, data, success, failed) {
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			// IE6
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		var type =  type.toUpperCase();
		var random = Math.random();

		// 进行转码
		if (typeof data == 'object') {
			var str = '';
			for (var key in data) {
				str += key + "=" + '&';
			}
			data = str.replace(/&$/,'');
		}

		if(type == 'GET') {
			if(data) {
				xhr.open('GET', url + "?" + data, true);
			} else {
				xhr.open('GET', url + "?t=" + data, true);
			}
			xhr.send();
		} else if (type == 'POST') {
			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(data);
		}

		// 处理返回的数据
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.staus == 200) {
					success(xhr.responseText);
				} else {
					if (failed) {
						failed(xhr.status);
					}
				}
			}
		}
	}

	window.onscroll = function() {
		if(checkScrollSlide()) {
			var parent = document.getElementById("waterfall");
			for (var i = 0; i < dataInt.data.length; i ++) {
				var son = document.createElement('div');
				var sonPic = document.createElement('div');
				var sonImg = document.createElement('img');

				son.className = "box";
				sonPic.className = "pic";
				sonImg.src = "images/" + dataInt.data[i].src;
				parent.appendChild(son);
				son.appendChild(sonPic);
				sonPic.appendChild(sonImg);
			}
			waterfall("waterfall", ".box");
		}
	};

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
	}

	// 检测是否具备滚动加载数据块的条件
	function checkScrollSlide() {
		var container = document.getElementById('waterfall');
		var sons = document.querySelectorAll(".box");

		// 最后一个盒子相对于 top 的偏移量再加上自身一半的高度.
		var lastBoxH = sons[sons.length - 1].offsetTop +
		              Math.floor(sons[sons.length - 1].offsetHeight / 2);
	  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	  var pageHeight = document.body.clientHeight || document.documentElement.clientHeight;

	  return (lastBoxH < scrollTop + pageHeight) ? true : false;
	}

})();