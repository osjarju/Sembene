import React from 'react';
import styled from 'styled-components';

function Card({ movieData, isliked = false }) {
    return <Container>
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt='film' />
    </Container>
}

const Container = styled.div``;

export default Card