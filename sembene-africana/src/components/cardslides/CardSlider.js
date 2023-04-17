import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Card from '../card/Card';
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';

export default function CardSlider({ data, title }) {
    //SET SLIDER CONTROLS
    const [showControls, setShowControls] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(0);
    const listRef = useRef();

    //HANDLE SLIDER BEHAVIOR/DIRECTION
    const handleDirection = (direction) => {

        if (direction === 'left') {
            // listRef.current.style.transform = `translateX(${230 + distance}px)`;
            // setSliderPosition(sliderPosition - 1);
            listRef.current.scrollLeft -= 230
        }
        if (direction === 'right') {
            // listRef.current.style.transform = `translateX(${-230 + distance}px)`;
            // setSliderPosition(sliderPosition + 1);
            listRef.current.scrollLeft += 230
        }
    };

    return (
        <Container className='flex column'
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}>
            <h1>{title}</h1>
            <div className='wrapper' ref={listRef}>
                <div className={`slider-action left
                 ${!showControls ? 'none' : ''} flex j-center a-center`}>

                    <AiOutlineLeft onClick={() => handleDirection('left')} />
                </div>
                <div className='flex slider' >
                    {data.map((movie, index) => {
                        return <Card movieData={movie} index={index} key={movie.id} />;
                    })}
                </div>
                <div className={`slider-action right
                 ${!showControls ? 'none' : ''} flex j-center a-center`}>

                    <AiOutlineRight onClick={() => handleDirection('right')} />
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
gap: 1rem;
position: relative;
padding: 2rem 0;
h1 {
    margin-left: 50px;
}
.wrapper {
    overflow-y: scroll;
    scroll-behavior: smooth;
    overflow: hidden;

    .slider {
        width: max-content;
        gap: 1rem;
        transform: translateX(0px);
        transition: 0.3s ease-in-out;
        margin-left: 50px;
       
    }
    .slider-action {
        position: absolute;
        z-index: 99;
        height: 100%;
        top: 0;
        bottom: 0;
        width: 50px;
        transition: 0.3s ease-in-out;
        svg {
            font-size: 2rem;
        }
    }
        .none {
            display: none;
        }
        .left {
            left: 0;
        }
        .right {
            right: 0;
        }
    }
}
`;
