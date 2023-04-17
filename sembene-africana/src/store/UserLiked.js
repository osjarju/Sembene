import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getUserLikedMovies } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../components/navbar/Navbar';
import Card from '../components/card/Card';

export default function UserLiked() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    const movies = useSelector((state) => state.sembene.movies);

    const [email, setEmail] = useState(undefined);
    console.log(movies)
    console.log(email)

    // onAuthStateChanged(firebaseAuth, (currentUser) => {
    //     if (currentUser) setEmail(currentUser.email);
    //     else navigate('/login');
    // });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, currentUser => {
            if (currentUser) {
                dispatch(getUserLikedMovies(currentUser.email));
            } else navigate('/login');
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (email) {
    //         dispatch(getUserLikedMovies(email));
    //     }
    // }, [email]);

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
                    {Array.isArray(movies) && movies.map((movie, index) => {

                        return (
                            <Card
                                movieData={movie}
                                index={index}
                                key={movie.id}
                                isLiked={true}
                            />
                        );
                    })}
                </div>
            </div>
        </Container>
    );
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