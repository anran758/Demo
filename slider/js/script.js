var data = [
  {img: '1', h2: 'Crear', h3: 'Dute'},
  {img: '2', h2: 'Braek', h3: 'Date'},
  {img: '3', h2: 'Deck', h3: 'Aasaas'},
  {img: '4', h2: 'Event', h3: 'BDSA'},
];

var $ = function(id) {
	if (id.substr(0, 1) == '.') {
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
};

// Add sliders (all sliders and button)
function addSliders() {
	// 取内部模块
	var tpl_main = $('template_main').innerHTML
										.replace(/^\s*/, '')
								    .replace(/\s*$/, '');
	var tpl_ctrl = $('template_ctrl').innerHTML
										.replace(/^\s*/, '')
								    .replace(/\s*$/, '');

	// output
	var out_main = [];
	var out_ctrl = [];


	// 遍历数据, 构建输出HTML
	for(var i in data) {
		var _html_main = tpl_main
											.replace(/{{index}}/g, data[i].img)
											.replace(/{{h2}}/g, data[i].h2)
											.replace(/{{h3}}/g, data[i].h3)
											.replace(/{{css}}/g, ['', 'main-i-right'][i % 2]);
		var _html_ctrl = tpl_ctrl
											.replace(/{{index}}/g, data[i].img);

    out_main.push(_html_main);
    out_ctrl.push(_html_ctrl);
	}

	// 把 HTML 回写到对应的 DOM 里面
	$('template_main').innerHTML = out_main.join('');
	$('template_ctrl').innerHTML = out_ctrl.join('');

	// add main background, replace id
	$('template_main').innerHTML += tpl_main
											.replace(/{{index}}/g, 'background')
											.replace(/{{h2}}/g, data[i].h2)
											.replace(/{{h3}}/g, data[i].h3);
  $('main_background').className += ' main-backg';
}

// Slider switch
function switchSlider(n) {
	// get control buttom
	var main = $('main_' + n);
	var ctrl = $('ctrl_' + n);

	var clear_main = $('.main-i');
	var clear_ctrl = $('.ctrl-i');

	// 先清除 active 样式, 后添加
	for (var i = 0; i < clear_ctrl.length; i++) {
		clear_main[i].className = clear_main[i].className.replace('active', '');
		clear_ctrl[i].className = clear_ctrl[i].className.replace('active', '');
	}
	main.className += ' active';
	ctrl.className += ' active';

	// 切换时,复制上一张
	setTimeout(function() {
		$('main_background').innerHTML = main.innerHTML;
	}, 1000);
}

function movePic() {
	var pic = $('.picture');

	for (var i = 0; i < pic.length; i ++) {
		pic[i].style.marginTop = (-1 * pic[i].clientHeight / 2) + 'px';
	}
}

window.onload = function() {
	addSliders();
	switchSlider(1);
	setTimeout(function() {
		movePic();
	}, 100);
};