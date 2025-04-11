import getData from '../apis/weatherData';
import dom from './dom.js';

const loadHandler = async () => {
    const data = await getData();
    const components = createComponents(data);
    if (Array.isArray(components)) {
        components.forEach((el) => dom.container.append(el));
    } else {
        dom.container.append(components);
    }
};

export default loadHandler;
