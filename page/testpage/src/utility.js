import $ from 'jquery';

export default class Utility
{
  constructor()
  {
    this.host = "http://localhost:4000";
    this.ajaxPromise = this.ajaxPromise.bind(this);
  }

  ajaxPromise(url,method,data)
  {
    return new Promise((resolve,reject)=>{
      $.ajax({
        url: url,
        type: method,
        dataType: "json",
        data: data
      })
      .done(function(a) {
        resolve(a);
      })
      .fail(function(a) {
        reject(a);
      })
      .always(function() {});
    });
  }

  // pagination(c,m)
  // {
  //   var current = c,
  //     last = m,
  //     delta = 1,
  //     left = current - delta,
  //     right = current + delta + 1,
  //     range = [],
  //     rangeWithDots = [],
  //     l;
  //
  //   for (let i = 1; i <= last; i++) {
  //       if (i == 1 || i == last || i >= left && i < right) {
  //           range.push(i);
  //       }
  //   }
  //
  //   for (let i of range) {
  //       if (l) {
  //           if (i - l === 2) {
  //               rangeWithDots.push(l + 1);
  //           } else if (i - l !== 1) {
  //               rangeWithDots.push('...');
  //           }
  //       }
  //       rangeWithDots.push(i);
  //       l = i;
  //   }
  //
  //   return rangeWithDots;
  // }

}
