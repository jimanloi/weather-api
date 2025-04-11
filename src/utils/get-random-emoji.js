const getRandomEmoji = () => {
    const emojis = {
        sun: '&#127774;',
        halfSun: '&#9925;',
        rain: '&#9748;',
        wind: '&#127744;'
    };

    const emojiValues = Object.values(emojis);
    const randomEmoji =
        emojiValues[Math.floor(Math.random() * emojiValues.length)];

    return randomEmoji;
};

export default getRandomEmoji;
