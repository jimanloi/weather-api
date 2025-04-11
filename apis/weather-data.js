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

export default getData;
