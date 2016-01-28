function drawNumberline(){
  // remove existing canvas
  $('#numberline.canvas svg').remove()
  // get and set basic canvas attributes
  var canvas = $('#numberline.canvas')[0];
  var width = canvas.offsetWidth;
  var height = canvas.offsetHeight;
  var paper = Raphael(canvas, width, height);
  var leftMargin = 50;
  var rightMargin = width - leftMargin;
  var fontSize = 20;
  var circleRadius = 30;
  var hours = { min:      Number($('#min_hours').val()),
                desired:  Number($('#desired_hours').val()),
                assigned: Number($('#assigned_hours').val()),
                max:      Number($('#max_hours').val()) };
  var colors = { min:      '#70a5ff',
                 desired:  '#fecc76',
                 assigned: '#90f390',
                 max:      '#d26a6a' };
  var highest = Math.max(hours.min, hours.desired, hours.assigned, hours.max);
  var lowest = Math.min(hours.min, hours.desired, hours.assigned, hours.max);

  // draw the line
  var lineStart = { x: leftMargin, y: height / 2 };
  var lineEnd = { x: rightMargin, y: height / 2 };
  var line = paper.path(['M', lineStart.x, lineStart.y,
                         'L', lineEnd.x, lineEnd.y]);
  line.attr('stroke-width', '3');
  var lineLength = lineEnd.x - lineStart.x;

  // draw the minimum hours circle
  var minPixels = placeHours(hours.min, lowest, highest, lineStart.x, lineEnd.x);
  var minCircle = paper.circle(minPixels, lineStart.y, circleRadius);
  minCircle.attr({ fill: colors.min });
  paper.text(minPixels, lineStart.y, hours.min).attr('font-size', fontSize);

  // draw the desired hours circle
  var desiredPixels = placeHours(hours.desired, lowest, highest, lineStart.x, lineEnd.x);
  var desiredCircle = paper.circle(desiredPixels, lineStart.y, circleRadius);
  desiredCircle.attr({ fill: colors.desired });
  paper.text(desiredPixels, lineStart.y, hours.desired).attr('font-size', fontSize);

  // draw the assigned hours circle
  var assignedPixels = placeHours(hours.assigned, lowest, highest, lineStart.x, lineEnd.x);
  var assignedCircle = paper.circle(assignedPixels, lineStart.y, circleRadius);
  assignedCircle.attr({ fill: colors.assigned });
  paper.text(assignedPixels, lineStart.y, hours.assigned).attr('font-size', fontSize);

  // draw the max hours circle
  var maxPixels = placeHours(hours.max, lowest, highest, lineStart.x, lineEnd.x);
  var maxCircle = paper.circle(maxPixels, lineStart.y, circleRadius);
  maxCircle.attr({ fill: colors.max });
  paper.text(maxPixels, lineStart.y, hours.max).attr('font-size', fontSize);
}

function placeHours(hours, minHours, maxHours, lineStartX, lineEndX){
  var step = (lineEndX - lineStartX) / (maxHours - minHours);
  return lineStartX + (hours - minHours) * step;
}

$(document).ready(function(){
  drawNumberline();

  $('#form').on('change', 'input', drawNumberline);
})
