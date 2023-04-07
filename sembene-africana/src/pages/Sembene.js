import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Africa from '../assets/Africa.jpg';
// import MovieLogo from '../assets/MovieLogo.jpg'
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
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
  });

  //WINDOW SCROLL FUNCTIONALITY
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className='hero'>
        <img src={Africa}
          alt='background'
          className='background-image' />
        <div className='container'>
          <div className='logo'>
            {/* <img src={MovieLogo} alt='Movie Logo' /> */}
          </div>
          <div className='buttons flex'>
            <button className='flex j-center a-center' onClick={() => navigate('/player')}>
              <FaPlay /> Play </button>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle /> Learn More </button>
          </div>
          {/* {genres.map((item, index) => <li key={index}>{item.name}</li>)} */}
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div``;
