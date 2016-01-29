function drawNumberline(){
  // remove existing canvas
  $('#numberline.canvas svg').remove()
  // get and set basic canvas attributes
  var canvas = $('#numberline.canvas')[0];
  var width = canvas.offsetWidth;
  var height = canvas.offsetHeight;
  var paper = Raphael(canvas, width, height);
  var leftMargin = 75;
  var rightMargin = width - leftMargin;
  var hoursFontSize = 25;
  var descriptionFontSize = 15;
  var circleRadius = 48;
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

  var circleY = lineStart.y;
  var textY = circleY - 1.5;
  var descY = textY - hoursFontSize - 50;

  // draw the minimum hours circle
  var minPixels = placeHours(hours.min, lowest, highest, lineStart.x, lineEnd.x);
  var minCircle = paper.circle(minPixels, circleY, circleRadius);
  //var minCircle = paper.rect(minPixels - 37.5, circleY - 50, 75, 100);
  minCircle.attr({ fill: colors.min, 'stroke-width': 2 });
  paper.text(minPixels, textY, hours.min).attr('font-size', hoursFontSize);
  paper.text(minPixels, descY, 'Minimum')
       .attr('font-size', descriptionFontSize);

  // draw the desired hours circle
  var desiredPixels = placeHours(hours.desired, lowest, highest, lineStart.x, lineEnd.x);
  var desiredCircle = paper.circle(desiredPixels, circleY, circleRadius);
  desiredCircle.attr({ fill: colors.desired, 'stroke-width': 2 });
  paper.text(desiredPixels, textY, hours.desired).attr('font-size', hoursFontSize);
  paper.text(desiredPixels, descY, 'Desired')
       .attr('font-size', descriptionFontSize);

  // draw the max hours circle
  var maxPixels = placeHours(hours.max, lowest, highest, lineStart.x, lineEnd.x);
  var maxCircle = paper.circle(maxPixels, circleY, circleRadius);
  //var maxCircle = paper.rect(maxPixels - 37.5, circleY - 50, 75, 100);
  maxCircle.attr({ fill: colors.max, 'stroke-width': 2 });
  paper.text(maxPixels, textY, hours.max).attr('font-size', hoursFontSize);
  paper.text(maxPixels, descY, 'Maximum')
       .attr('font-size', descriptionFontSize);

  // draw the assigned hours circle last, since it's the only one that moves
  var assignedPixels = placeHours(hours.assigned, lowest, highest, lineStart.x, lineEnd.x);
  var assignedCircle = paper.circle(assignedPixels, circleY, circleRadius - 10);
  assignedCircle.attr({ fill: colors.assigned, 'stroke-width': 2 });
  paper.text(assignedPixels, textY + 2, hours.assigned)
       .attr('font-size', hoursFontSize - 2);
       //.attr('font-weight', 'bold');
  paper.text(assignedPixels, circleY - circleRadius - descriptionFontSize, 'Assigned')
       .attr('font-size', descriptionFontSize);
       //.attr('font-weight', 'bold');
}

function placeHours(hours, minHours, maxHours, lineStartX, lineEndX){
  var step = (lineEndX - lineStartX) / (maxHours - minHours);
  return lineStartX + (hours - minHours) * step;
}

$(document).ready(function(){
  drawNumberline();

  $('input.hours_input').on('change', function(){
    var val = +$(this).val();
    $(this).val(val.toFixed(2));
  });
  $('#form').on('change', 'input', drawNumberline);
})
