import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { React, useState } from 'react';
import styled from "styled-components";
import BgImage from '../components/bgimage/BgImage';
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [showPassword, SetShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    //HANDLE SIGN UP
    const handleSignUp = async () => {
        // console.log(formValues);
        try {
            const { email, password } = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        } catch (err) {
            console.log(err)
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate('/');

    });


    return (
        <Container showPassword={showPassword}>
            <BgImage />
            <div className='content'>
                <Header login />
                <div className='body flex column a-center j-center'>
                    <div className='text flex column'>
                        <h1>Movies Made In Africa</h1>
                        <h4>Exclusive Content . For everyone</h4>
                        <h6>Enter your email and watch Exclusive Content
                        </h6>
                    </div>
                    <div>
                        <input type='email' placeholder='Email Address' name='email' value={formValues.email}
                            onChange={(e) => setFormValues({
                                ...formValues, [e.target.name]: e.target.value,
                            })
                            }
                        />
                        {showPassword && (
                            <input type='password' placeholder='Password' name='password' value={formValues.password}
                                onChange={(e) => setFormValues({
                                    ...formValues, [e.target.name]: e.target.value,
                                })
                                }
                            />
                        )}
                        {!showPassword && (
                            <button onClick={() => SetShowPassword(true)}>Click Here</button>
                        )}
                    </div>
                    <button onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
position: relative;
.content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
        gap: 1rem;
        .text {
            gap: 1rem;
            text-align: center;
            font-size: 2rem;
            h1 {
                padding: 0 25rem;
            }
        }
        .form {
            display: grid;
            grid-template-columns:${({ showPassword }) => showPassword ? '1fr 1fr' : '2fr 1fr'};
            width: 60%;
            input {
                color: black;
                border: none;
                padding: 1.5rem;
                font-size: 1.2rem;
                border: 1px solid black;
                &:focus {
                    outline: none;
                }
            }
            button {
            padding: 0.5rem 1rem;
            background-color: orange;
            border: none;
            cursor: pointer;
            color: red;
            font-weight: bolder;
            font-size: 1.05rem;
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
`;

