/* Copyright (C) Alexander 'novium' Troshin - All Rights Reserved
 * Unless otherwise stated via written permission from the author all
 * unauthorized copying and/or use of the content in this file via any medium is
 * strictly prohibited. The content of this file is proprietary and confidential.
 */

var filter = {
median:
  function (data, window) {
    // Only works for odd sized windows above 1 due to the median function
    if(window % 2 != 1)
      return 0;

    // Calculate median value for a given array
    function median(arr) {
      var arr, i;
      // i = odd array (eg. 5) divided with 2 floored
      i = Math.floor(arr.length / 2);
      arr = arr.sort()[i];
      return arr;
    }

    // DEV CODE - RETURN MEDIAN FUNCTION
    return median(data);
  }
};

// DEV CODE - TEST DATA
var testData1 = [2, 3, 2, 4, 4, 10, 3, 2];
var testData2 = [2, 10, 3];
var testData3 = [3, 5, 20, 5, 5, 2, 4]

console.log(filter.median(testData2, 3));
