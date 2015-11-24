/* Copyright (C) Alexander 'novium' Troshin - All Rights Reserved */

exports.median = function(arr, wl) {
  // Real median function
  /*function median(arr) {
    arr = arr.sort(function(a, b) { return a - b });
    if (arr.length % 2 == 1)
      return arr[Math.floor(arr.length/2)];
    return (arr[arr.length / 2] + arr.sort()[arr.length / 2 - 1]) / 2;
  }*/

  function median(arr) {
    var arr = arr.slice().sort(function(a, b){ return a - b });
    return arr[Math.floor((arr.length - 1) / 2)];
  }

  wl = wl || 3;
  var f = [], w = [], i;

  w.push(arr[0]);
  for (i = 0; i < arr.length; i++)
  {
    if (arr.length - 1 >= i + Math.floor(wl / 2))
      w.push(arr[i + Math.floor(wl / 2)]);
    f.push(median(w));
    if (i >= Math.floor(wl / 2))
      w.shift();
  }

  return f;
}
