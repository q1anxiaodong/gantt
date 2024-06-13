var a = 3;
var total = 0;
var res = [];

function foo(a) {
  for (var i = 0; i < 3; ++i) {
    res[i] = function () {
      total += i * a;
      console.log(total);
    };
  }
}
foo(1);

res[0]();
res[1]();
res[2]();