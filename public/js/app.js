console.log('Client side javascript file is loaded!');

const weatherForm1 = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm1.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:5000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = 'Forecast -' + data.forecast + ', Temperature : ' + data.temperature
                + '°C, Feels Like: ' + data.feelsLike + '°C';
            }
        });
    });
});