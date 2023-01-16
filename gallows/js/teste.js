var current = 0;


var frames = [
  'frame1', 'frame2', 'frame3', 'frame4', 'frame5',
  'frame6', 'frame7', 'frame8', 'frame9'
];

var last = frames.length - 1;


var hasNext = function() {
  return current + 1 <= last;
}

console.log(hasNext());
console.log(last);