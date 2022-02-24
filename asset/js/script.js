const API_URL = document.URL === 'https://api.com' ? 'https://api.com' : 'http://127.0.0.1:8000';

$(window).on('load', () => {
    const prime_btn_prefix  = 'btn_prime_';

    $('button').on('click', (e) => {
        const btnId = e.target.getAttribute('id');
        const number = $(e.target).prev().val();
        switch(btnId){
            case prime_btn_prefix + 'check':
                primeCheck(number);
                break;
            case prime_btn_prefix + 'max':
                maxPrime(number);
                break;
            case prime_btn_prefix + 'list':
                primeList(number);
                break;
        }
    });
});

const primeCheck = (number) => {
    axios.get(`${API_URL}/prime/${number}/check`)
        .then(response => {
            let resultText = response.data.result ? '素数です！' : '素数ではないです！';
            $('#prime_check .result-text').text(resultText)
        })
}

const maxPrime = (number) => {
    axios.get(`${API_URL}/prime/${number}/max`)
        .then(response => {
            let resultText = response.data.result ? response.data.result : '素数が見つかりませんでした。';
            $('#max_prime .result-text').text(resultText)
        })
}

const primeList = (number) => {
    axios.get(`${API_URL}/prime/${number}/list`)
        .then(response => {
            const resultArea =  $('#prime_list .result-area');
            let resultText = '';
            if (response.data.result) {
                resultText = response.data.result.replace(/[\[|\]]/g, '');
                resultArea.removeClass('border-none font-30');
            } else {
                resultText = '素数が見つかりませんでした。';
                resultArea.addClass('border-none font-30');
            }
            resultArea.text(resultText)
        })
}