const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.outputTextMsgToDB = functions.https.onRequest((request, response) => {

  const admin = require('firebase-admin');
  admin.initializeApp(functions.config().firebase);
  let db = admin.firestore();
  let docRef = db.collection('TextRequests(UTC)').doc(dateToFormatString(new Date(), '%YYYY%-%MM%-%DD% %HH%:%mm%:%ss%'));

  if (request.method === "POST"){
    let setAda = docRef.set({
      SmsInfo: request
      //SmsSid: request.body.SmsSid//["SmsSid]
      //Status: request.body.SmsStatus,//["SmsStatus"],
      //Body: request.body.Body//["Body"]
    });
    //console.log("Genarate a document of textmsg in a DB Successfully!");
  } 
  else {
      response.status(200).send("The method of this request was not POST");
      //console.warn("The method of this request was not POST");
      return;
  }

  response.status(200).send("Genarate a document of textmsg in a DB Successfully!");

});

 
exports.helloWorld = functions.https.onRequest((request, response) => {

  //let temp = new String();
  //var currentTime = new Date();
  //currentTime = now() 
  //format = format.replace(/YYYY/, currentTime.getFullYear());
  //format = format.replace(/MM/, currentTime.getMonth() + 1);
  //format = format.replace(/DD/, currentTime.getDate());
  //format = format.replace(/hh/, currentTime.getHours());
  //format = format.replace(/mm/, currentTime.getMinutes);
  //format = format.replace(/ss/, currentTime.getSeconds());

  let temp = "Hello from Firebase!" + "!!!!!!!!!!!!!!!!"

  response.status(200).send("Hello from Firebase!" + ' ' + dateToFormatString(new Date(), '%DD%-%MMM%-%YYYY%(%w%)%HH%:%mm%:%ss%', 'en-US') );

});

function dateToFormatString(date, fmt, locale, pad) {
  // %fmt% を日付時刻表記に。
  // 引数
  //  date:  Dateオブジェクト
  //  fmt:   フォーマット文字列、%YYYY%年%MM%月%DD%日、など。
  //  locale:地域指定。デフォルト（入力なし）の場合はja-JP（日本）。現在他に対応しているのはen-US（英語）のみ。
  //  pad:   パディング（桁数を埋める）文字列。デフォルト（入力なし）の場合は0。
  // 例：2016年03月02日15時24分09秒
  // %YYYY%:4桁年（2016）
  // %YY%:2桁年（16）
  // %MMMM%:月の長い表記、日本語では数字のみ、英語ではMarchなど（3）
  // %MMM%:月の短い表記、日本語では数字のみ、英語ではMar.など（3）
  // %MM%:2桁月（03）
  // %M%:月（3）
  // %DD%:2桁日（02）
  // %D%:日（2）
  // %HH%:2桁で表した24時間表記の時（15）
  // %H%:24時間表記の時（15）
  // %h%:2桁で表した12時間表記の時（03）
  // %h%:12時間表記の時（3）
  // %A%:AM/PM表記（PM）
  // %A%:午前/午後表記（午後）
  // %mm%:2桁分（24）
  // %m%:分（24）
  // %ss%:2桁秒（09）
  // %s%:秒（9）
  // %W%:曜日の長い表記（水曜日）
  // %w%:曜日の短い表記（水）
  var padding = function(n, d, p) {
      p = p || '0';
      return (p.repeat(d) + n).slice(-d);
  };
  var DEFAULT_LOCALE = 'ja-JP';
  var getDataByLocale = function(locale, obj, param) {
      var array = obj[locale] || obj[DEFAULT_LOCALE];
      return array[param];
  };
  var format = {
      'YYYY': function() { return padding(date.getFullYear(), 4, pad); },
      'YY': function() { return padding(date.getFullYear() % 100, 2, pad); },
      'MMMM': function(locale) {
          var month = {
              'ja-JP': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              'en-US': ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'],
          };
          return getDataByLocale(locale, month, date.getMonth());
      },
      'MMM': function(locale) {
          var month = {
              'ja-JP': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              'en-US': ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June',
                        'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
          };
          return getDataByLocale(locale, month, date.getMonth());
      },
      'MM': function() { return padding(date.getMonth()+1, 2, pad); },
      'M': function() { return date.getMonth()+1; },
      'DD': function() { return padding(date.getDate(), 2, pad); },
      'D': function() { return date.getDate(); },
      'HH': function() { return padding(date.getHours(), 2, pad); },
      'H': function() { return date.getHours(); },
      'hh': function() { return padding(date.getHours() % 12, 2, pad); },
      'h': function() { return date.getHours() % 12; },
      'mm': function() { return padding(date.getMinutes(), 2, pad); },
      'm': function() { return date.getMinutes(); },
      'ss': function() { return padding(date.getSeconds(), 2, pad); },
      's': function() { return date.getSeconds(); },
      'A': function() {
          return date.getHours() < 12 ? 'AM' : 'PM';
      },
      'a': function(locale) {
          var ampm = {
              'ja-JP': ['午前', '午後'],
              'en-US': ['am', 'pm'],
          };
          return getDataByLocale(locale, ampm, date.getHours() < 12 ? 0 : 1);
      },
      'W': function(locale) {
          var weekday = {
              'ja-JP': ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
              'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          };
          return getDataByLocale(locale, weekday, date.getDay());
      },
      'w': function(locale) {
          var weekday = {
              'ja-JP': ['日', '月', '火', '水', '木', '金', '土'],
              'en-US':  ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
          };
          return getDataByLocale(locale, weekday, date.getDay());
      },
  };
  var fmtstr = ['']; // %%（%として出力される）用に空文字をセット。
  Object.keys(format).forEach(function(key) {
      fmtstr.push(key); // ['', 'YYYY', 'YY', 'MMMM',... 'W', 'w']のような配列が生成される。
  })
  var re = new RegExp('%(' + fmtstr.join('|') + ')%', 'g');
  // /%(|YYYY|YY|MMMM|...W|w)%/g のような正規表現が生成される。
  var replaceFn = function(match, fmt) {
  // match には%YYYY%などのマッチした文字列が、fmtにはYYYYなどの%を除くフォーマット文字列が入る。
      if(fmt === '') {
          return '%';
      }
      var func = format[fmt];
      // fmtがYYYYなら、format['YYYY']がfuncに代入される。つまり、
      // function() { return padding(date.getFullYear(), 4, pad); }という関数が代入される。
      if(func === undefined) {
          //存在しないフォーマット
          return match;
      }
      return func(locale);
  };
  return fmt.replace(re, replaceFn);
}

//exports.outputTextMsg = functions.storage.bucket('Test').object().onRequest((request, response) => {
//    response.status(200).send("Succeeded!");
//  });

//// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
//const functions = require('firebase-functions');

//// The Firebase Admin SDK to access the Firebase Realtime Database.
//const admin = require('firebase-admin');
//admin.initializeApp();