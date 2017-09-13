var canvas = document.getElementById('clock');
var c = canvas.getContext('2d');

var width = c.canvas.width;
var height = c.canvas.height;
var r = width / 2;

function drawBackground() {
  c.translate(r, r);
  c.beginPath();
  c.arc(0, 0, r, 0, 2*Math.PI, false);
  c.stroke();

  var hourNum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  hourNum.forEach(function(number, i) {
    var rad = 2 * Math.PI / 12 * i;
  });
}

drawBackground();
