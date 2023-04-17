import React from 'react';
import CardSlider from '../cardslides/CardSlider';
// import Sembene from '../../pages/Sembene';

export default function Slider({ movies }) {
    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    };

    //RETURN TEN MOVIES ON EACH CARD
    return (
        <div>
            <CardSlider title='Africana' data={getMoviesFromRange(0, 10)} />
            <CardSlider title='Pan-African' data={getMoviesFromRange(10, 20)} />
            <CardSlider title='North Africa' data={getMoviesFromRange(20, 30)} />
            <CardSlider title='South Africa' data={getMoviesFromRange(30, 40)} />
            <CardSlider title='West Africa' data={getMoviesFromRange(40, 50)} />
            <CardSlider title='East Africa' data={getMoviesFromRange(50, 60)} />
        </div>
    );
}

