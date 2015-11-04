/* Copyright (C) Alexander 'novium' Troshin - All Rights Reserved
* Unless otherwise stated via written permission from the author all
* unauthorized copying and/or use of the content in this file via any medium is
* strictly prohibited. The content of this file is proprietary and confidential.
*/

/* Thanks to @calmh (Jakob Borg) https://github.com/calmh for a few lines of the
* code below.
*/


exports.median = function (data, window) {
  // Only works for odd sized windows above 1 due to the median function
  // Exit if array < window
  if(window % 2 != 1) {
    console.log("window not divisible by 3");
    return 0;
  }
  
  if (data.length < window) {
    return arr;
  }

  // Calculate median value for a given array
  function median(arr) {
    var i;
    // i = odd array (eg. 5) divided with 2 floored
    i = Math.floor(arr.length / 2);
    arr = arr.sort()[i];
    return arr;
  }

  window = window || 3;

  var f = [];
  var w = [];
  var i;

  w.push(data[0]);
  for (i = 0; i < data.length; i++)
  {
    if (data.length - 1 >= i + Math.floor(window / 2))
    w.push(data[i + Math.floor(window / 2)]);
    f.push(median(w));
    if (i >= Math.floor(window / 2))
    w.shift();
  }

  return f;
}
