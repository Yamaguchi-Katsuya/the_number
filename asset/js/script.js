$(window).on('load', () => {
  $('.js-number-form').on('submit', function(event) {
    console.log('click submit')
    event.preventDefault(); // フォームの通常の送信を防ぐ

    var result = true;
    const form = $(this);
    resetTxt(form)
    const type = form.data('type');
    var numbers = [];
    form.find('input').each(function() {
      var currentNumber = $(this).val();
      console.log(currentNumber);
      if (isNaN(currentNumber) || Math.sign(currentNumber) < 0) {
        setErrorTxt(form, '0以上の自然数を入力してください。');
        result = false;
        return false;
      }
      numbers.push(parseInt($(this).val()));
    });

    if (!result) {
      return false;
    }

    var result = '';
    if (type in numberFuncList) {
      result = numberFuncList[type](...numbers);
    }

    // 結果メッセージをセット
    setResultTxt(form, result);

    return false;
  });
});


// 結果メッセージとエラーテキストをリセット
const resetTxt = (form) => {
  // formと兄弟要素のjs-result-txtクラスのテキストを空にして非表示にする
  $(form).siblings('.js-result-txt').text('').hide();
  // formと兄弟要素のjs-error-txtクラスのテキストを空にして非表示にする
  $(form).siblings('.js-error-txt').text('').hide();
}

// 結果メッセージをセット
const setResultTxt = (form, message) => {
  // formと兄弟要素のjs-result-txtクラスのテキストを書き換える
  $(form).siblings('.js-result-txt').text(message).show();
}

// エラーメッセージをセット
const setErrorTxt = (form, message) => {
  // formと兄弟要素のjs-error-txtクラスのテキストを書き換える
  $(form).siblings('.js-error-txt').text(message).show();
}
