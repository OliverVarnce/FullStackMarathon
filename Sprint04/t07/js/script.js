let apiLink = 'https://api.openweathermap.org/data/2.5/onecall';
let access_key = 'a401f7940ff2b18e959cce2a0d596582';
let city = 'lat=50.450001&lon=30.523333';
let dateNow = Math.floor(Date.now() / 1000);
let dateDiv = '';


fetch(apiLink + '?' + city + '&dt='+ dateNow +'&units=metric&exclude=daily&appid=' + access_key)
    .then(response => response.json())
    .then(data => showDays(data))

function showDays(data) {
    for (let i = 0; i < 6; i++) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        if(dd < 10) {
            dd='0'+dd;
        }
        if(mm < 10) {
            mm='0'+mm;
        }
        let ddd = dd + 1;

        let daysDiv = `
        <div class="day">
                <div class="date"><b>${ddd + '.' + mm}</b></div>
                <div class="state">${weather(data.daily[i].weather[0].main)}</div>
                <div class="temp">${Math.round(data.daily[i].temp.day)}℃</div>
            </div>
    `;
        dateDiv += daysDiv;
    }
    document.querySelector('.days').innerHTML = dateDiv;
}

function weather (state) {
    if (state === 'Snow') {
        return `<img src="assets/images/snow.jpg\">`;
    } else if (state === 'Rain') {
        return `<img src="assets/images/sun.jpg\">`;
    } else if (state === 'Clouds') {
        return `<img src="assets/images/blizzard.jpg\">`;
    }
}