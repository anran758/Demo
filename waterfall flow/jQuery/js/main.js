(function($) {
	waterfall();

	function waterfall() {
		var $boxs = $('#waterfall > div');
		var width = $boxs.eq(0).outerWidth();
		var clos = Math.floor($(window).width() / width);
		$('#waterfall').width(width * clos).css('margin', '0 auto');

		var arrHei = [];
		$boxs.each(function(index, value) {
			var height = $boxs.eq(index).outerHeight();
			if (index < clos) {
				arrHei.push(height);
			} else {
				var minHei = Math.min.apply(null, arrHei);
				var minIndex = $.inArray(minHei, arrHei);
				$(value).css({
					'position' : 'absolute',
					'top': minHei + 'px',
					'left' : minIndex * width + 'px'
				});
				arrHei[minIndex] += $boxs.eq(index).outerHeight();
			}
		});
		console.log(arrHei)

	}
})(jQuery);