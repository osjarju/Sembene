import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Background from '../assets/Background.jpg';
// import MovieLogo from '../assets/MovieLogo.jpg'
import { FaPlay } from 'react-icons/fa';
// import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Slider from '../components/slider/Slider';

export default function Sembene() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.sembene.genresLoaded);
  const movies = useSelector((state) => state.sembene.movies)
  const dispatch = useDispatch();

  // const trendy = useSelector((state) => state.sembene.movies)
  // console.log(trendy)

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  //FETCH MOVIES IF GENRES ARE LOADED
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: 'all' }));
  }, [genresLoaded]);

  //WINDOW SCROLL FUNCTIONALITY
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className='hero'>
        <img src={Background}
          alt='background'
          className='background-image' />
        <div className='container'>
          <div className='logo'>
            {/* <img src={MovieLogo} alt='Movie Logo' /> */}
          </div>
          <div className='buttons flex'>
            <button className='flex j-center a-center' onClick={() => navigate('/player')}>
              <FaPlay /> Play </button>
            {/* <button className='flex j-center a-center'>
              <AiOutlineInfoCircle /> Learn More 
              </button> */}
          </div>
          {/* {genres.map((item, index) => <li key={index}>{item.name}</li>)} */}
        </div>
      </div>
      {Array.isArray(movies) && <Slider movies={movies} />}
    </Container>
  );
}

const Container = styled.div`
// background-color: grey;

.hero {
  position: relative;
  .background-image {
    filter:brightness(60%);
  }
  img {
    height: 100vh;
    width: 100vw;
  }
  .container {
    postion: absolute;
    bottom: 5rem;
    .logo {
      img {
        width:100%;
        height: 100%;
        margin-left: 5rem;
      }
    }
    .buttons {
margin: 5rem;
gap: 2rem;

button {
  font-size: 1.4rem;
  gap: 1rem;
  border-radius: 0.2rem;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2.4rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background-color: rgb(220, 74, 7);
  &:hover{
    opacity: 0.8;
  }
  &:nth-of-type(2) {
    background-color: rgba(109, 109 110, 0.7);
    color: black;
    svg {
      font-size: 1.8rem;
    }
  }
}
    }
  }
}

`;
