const API_URL = document.URL === 'https://the-number.vercel.app/'
  ? 'https://the-number-api.herokuapp.com'
  : 'http://127.0.0.1:8000';

$(window).on('load', () => {
  $('.js-submit-btn').on('click', (e) => {
    const self = $(e.target);
    const type = self.data('type');
    const number = self.prev().val();
    if (number === '') {
      emptyResultText(type);
      return;
    } else if (!isNumeric(number)) {
      self.next().text('整数を入力してください。');
      return;
    }

    self.next().text('');
    check(number, type);
    max(number, type);
    list(number, type);
  });
});

const isNumeric = (val) => {
  return /^\d+$/.test(val);
}

const emptyResultText = (type) => {
  $(`.js-${type}-check span`).text('');
  $(`.js-max-${type} span`).text('');
  $(`.js-${type}-list .list-area`).addClass('border-none')
  $(`.js-${type}-list .list-area`).text('');
  $(`.js-${type}-list .list-count`).text('');
};

const check = (number, type) => {
  axios.get(`${API_URL}/${type}/${number}/check`)
    .then(response => {
      let resultText = response.data.result ? 'YES' : 'NO';
      $(`.js-${type}-check span`).text(resultText)
    });
};

const max = (number, type) => {
  axios.get(`${API_URL}/${type}/${number}/max`)
    .then(response => {
      let resultText = response.data.result ? response.data.result : 'NO';
      $(`.js-max-${type} span`).text(resultText)
    });
};

const list = (number, type) => {
  axios.get(`${API_URL}/${type}/${number}/list`)
    .then(response => {
      const resultArea = $(`.js-${type}-list .list-area`);
      let resultText = '';
      if (response.data.count > 0) {
        resultText = response.data.result.replace(/[\[|\]]/g, '');
      } else {
        resultText = 'NO';
      }
      resultArea.removeClass('border-none').text(resultText);
      $(`.js-${type}-list .list-count`).text(`(${response.data.count})`);
    });
};
