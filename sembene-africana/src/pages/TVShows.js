import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/navbar/Navbar';
import Slider from '../components/slider/Slider';
import NotAvailable from '../components/notavailable/NotAvailable';
import GenreChoice from '../components/genrechoice/GenreChoice';


export default function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const genresLoaded = useSelector((state) => state.sembene.genresLoaded);
    const movies = useSelector((state) => state.sembene.movies);
    const genres = useSelector((state) => state.sembene.genres);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    //FETCH MOVIES IF GENRES ARE LOADED
    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: 'tv' }));
    }, [genresLoaded]);

    //WINDOW SCROLL FUNCTIONALITY
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if (currentUser) navigate('/');
    });
    return (
        <Container>
            <div className='navbar'>
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className='data'>
                <GenreChoice genres={genres} type='tv' />
                {
                    movies.length ? <Slider movies={movies} /> :
                        <NotAvailable />
                }
            </div>
        </Container>
    );
}

const Container = styled.div`
.data {
    margin-top: 8rem;
    .not-available {
        text-align: center;
        color: white;
        margin-top: 4rem;
    }
}
`;

