/* Copyright (C) Alexander 'novium' Troshin - All Rights Reserved
 * Unless otherwise stated via written permission from the author all
 * unauthorized copying and/or use of the content in this file via any medium is
 * strictly prohibited. The content of this file is proprietary and confidential.
 */

var filter = {
median:
  function (data, window) {
    // Only works for odd sized windows above 1
    if(window % 2 == 1)
      return 0;

    function median(arr) {
      var arr, i;
      i = Math.floor(arr.length / 2);
      arr = arr.sort()[i];

      return arr;
    }

    return median(data);
  }
};

var testData1 = [2, 3, 2, 4, 4, 10, 3, 2];
var testData2 = [2, 5, 3];

console.log(filter.median(testData2, 3));
