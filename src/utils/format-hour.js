const formatHour = (iso) => {
    const date = new Date(iso);
    const hour = date.getHours();
    return `${hour % 12 || 12}${hour < 12 ? 'am' : 'pm'}`;
};

export default formatHour;
