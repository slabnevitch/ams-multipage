var de = document.getElementById('days'),
he = document.getElementById('hours'),
me = document.getElementById('minutes'),
se = document.getElementById('seconds');

function render(){
  var d = +de.innerHTML,
  h = +he.innerHTML,
  m = +me.innerHTML,
  s = +se.innerHTML;

  --s;
  if( s < 0 ) { s = 59; --m; }
  if( m < 0 ) { m = 59; --h; }
  if( h < 0 ) { h = 23; --d; }
  if( d < 0 ) d = 3;

  de.innerHTML = d;
  he.innerHTML = leadZero(h);
  me.innerHTML = leadZero(m);
  se.innerHTML = leadZero(s);
}
function leadZero(n) { 
  return (n < 10 ? '0' : '') + n; 
}
function step() {
  var time = performance.now();
  render();
  setTimeout(step, 1000 - (performance.now() - time));
}
step();

