// import getData from "../apis/weatherData.js";
// import dom from "./dom.js";

//Data
const getData = async () => {
    try {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=51.2089&longitude=3.2242&hourly=temperature_2m&forecast_days=10'
        );
        if (res.status !== 200) {
            throw new Error('Failed to fetch data.');
        }
        return res.json();
    } catch (error) {
        console.error(error);
    }
};

//DOM
const dom = {
    container: document.querySelector('.weather-api')
};

//Components
const createComponents = async (data) => {
    const time = data.hourly.time;
    const temperature = data.hourly.temperature_2m;
    const degreeCelsius = '℃';
    const components = [];

    for (let i = 0; i < time.length; i += 24) {
        //Create a card
        const dayCard = document.createElement('div');
        dayCard.className = 'dayCard';

        // Add title (the date)
        const dateH3 = document.createElement('h3');
        const date = new Date(time[i]).toLocaleDateString('en-GB');
        dateH3.className = 'date-h3';
        dateH3.innerText = date;

        //Add div for 24 hours inside the card
        const hourlyInfo = document.createElement('div');
        hourlyInfo.className = 'hourly-info-container';

        // Add temperature and hour for each hour
        for (let h = 0; h < 24; h++) {
            const eachHour = document.createElement('div');
            eachHour.className = 'each-hour';
            const index = i + h;

            //Add the hour
            const hourlyHour = document.createElement('p');
            hourlyHour.className = 'hourly-hour';

            //format the hour
            const formatHour = (iso) => {
                const date = new Date(iso);
                const hour = date.getHours();
                return `${hour % 12 || 12}${hour < 12 ? 'am' : 'pm'}`;
            };

            const formattedHour = formatHour(time[index]);
            hourlyHour.innerText = formattedHour;

            //Add temperature
            const hourlyTemp = document.createElement('p');
            hourlyTemp.className = 'hourly-temp';
            hourlyTemp.innerText = temperature[index] + degreeCelsius;

            //Add emoji
            const emojis = {
                sun: '&#127774;',
                halfSun: '&#9925;',
                rain: '&#9748;',
                wind: '&#127744;'
            };
            const emoji = document.createElement('p');
            emoji.className = 'weather-icon';
            const emojiValues = Object.values(emojis);
            const randomEmoji =
                emojiValues[Math.floor(Math.random() * emojiValues.length)];
            emoji.innerHTML = randomEmoji;

            eachHour.append(hourlyHour, emoji, hourlyTemp);
            hourlyInfo.append(eachHour);
        }
        dayCard.append(dateH3, hourlyInfo);
        components.push(dayCard);
    }
    return components;
};

//Handler

const loadHandler = async () => {
    const data = await getData();
    const components = await createComponents(data);
    components.forEach((component) => dom.container.appendChild(component));
};

//Events

window.addEventListener('load', loadHandler);

console.log(getData());
