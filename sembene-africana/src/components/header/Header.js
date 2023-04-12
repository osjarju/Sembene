import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

export default function Header(props) {

    const navigate = useNavigate();

    // const Header = () => {
    return (
        <Container className='flex a-center j-between'>
            <div className='logo'>
                <img src={logo} alt='logo' />
            </div>
            <button onClick={() => navigate(props.login ? '/login' : '/signup')}>
                {props.login ? 'Log In' : 'Sign In'}
            </button>
        </Container>
    );
}

const Container = styled.div`
padding: 0 6rem;
.logo {
    img {
        height: 11rem;
    }
}
button {
    padding: 0.5rem 1rem;
    background-color: orange;
    border: none;
    cursor: pointer;
    color: red;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
}

button:hover {
    background-color: orange;
    color: #ff4a02;
  }
`;

