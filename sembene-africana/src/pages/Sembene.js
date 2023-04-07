import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Africa from '../assets/Africa.jpg';
// import MovieLogo from '../assets/MovieLogo.jpg'
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../store';


export default function Sembene() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const genres = useSelector((state) => state.sembene.genres)
  const trendy = useSelector((state) => state.sembene.movies)
  console.log(trendy)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [])

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
          {genres.map((item, index) => <li key={index}>{item.name}</li>)}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div``;
