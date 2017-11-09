import './../css/index.css';

require(['./common.js'],(common) => {
	common.initIndex();
	$(function() {
		console.log("this is jquery");
	});
});