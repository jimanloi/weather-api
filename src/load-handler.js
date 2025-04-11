import getData from '../apis/weather-data.js';
import dom from './dom.js';
import createComponents from './components.js';

const loadHandler = async () => {
    const data = await getData();
    const components = await createComponents(data);
    components.forEach((component) => dom.container.appendChild(component));
};
export default loadHandler;
