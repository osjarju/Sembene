import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getUserLikedMovies } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/navbar/Navbar';
import Card from '../components/card/Card';
// import Slider from '../components/slider/Slider';
// import NotAvailable from '../components/notavailable/NotAvailable';
// import GenreChoice from '../components/genrechoice/GenreChoice';

export default function UserLiked() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const genresLoaded = useSelector((state) => state.sembene.genresLoaded);
    const movies = useSelector((state) => state.sembene.movies);
    const genres = useSelector((state) => state.sembene.genres);

    const [email, setEmail] = useState(undefined);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate('/login');
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
    }, []);

    //FETCH MOVIES IF GENRES ARE LOADED
    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: 'movies' }));
    }, [genresLoaded]);

    //WINDOW SCROLL FUNCTIONALITY
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className='content flex column'>
                <h1>My List</h1>
                <div className='grid flex'>
                    {movies.map((movie, index) => {
                        return (
                            <Card movieData={movie} index={index}
                                key={movie.id} isLiked={true} />
                        );
                    })}
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
.content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
        margin-left: 3rem;
    }
.grid {
    flex-wrap: wrap;
    gap: 1rem;
}
}

`;