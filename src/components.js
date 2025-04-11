import formatHour from './utils/format-hour.js';
import getRandomEmoji from './utils/get-random-emoji.js';

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
            const formattedHour = formatHour(time[index]);
            hourlyHour.innerText = formattedHour;

            //Add temperature
            const hourlyTemp = document.createElement('p');
            hourlyTemp.className = 'hourly-temp';
            hourlyTemp.innerText = temperature[index] + degreeCelsius;

            //Add emoji
            const emoji = document.createElement('p');
            emoji.className = 'weather-icon';
            emoji.innerHTML = getRandomEmoji();

            eachHour.append(hourlyHour, emoji, hourlyTemp);
            hourlyInfo.append(eachHour);
        }
        dayCard.append(dateH3, hourlyInfo);
        components.push(dayCard);
    }
    return components;
};

export default createComponents;
