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
        if (currentUser) {
            console.count('Auth is running')
            createUserWithEmail();
            navigate('/');
        }

    });

    const createUserWithEmail = async () => {
        try {
            const { email } = formValues;
            await fetch('/api/user', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ email }),
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container showPassword={showPassword}>
            <BgImage />
            <div className='content'>
                <Header login />
                <div className='body flex column a-center j-center'>
                    <div className='text flex column'>
                        <h1>Movies Made In Africa</h1>
                        <h4>Exclusive Content . For everyone</h4>
                        <h6>Enter your email
                        </h6>
                    </div>
                    <form>
                        <input type='email' placeholder='Email Address' name='email' value={formValues.email}
                            onChange={(e) => setFormValues({
                                ...formValues, [e.target.name]: e.target.value,
                            })
                            }
                        />
                        {showPassword && (
                            <input type='password' placeholder='Create Password' name='password' value={formValues.password}
                                onChange={(e) => setFormValues({
                                    ...formValues, [e.target.name]: e.target.value,
                                })
                                }
                            />
                        )}
                        {!showPassword && (
                            <button onClick={() => SetShowPassword(true)}>Click Here</button>
                        )}
                    </form>
                    <button onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
position: relative;
.content {
//     position: absolute;
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
        form {
            display: grid;
            grid-template-columns:${({ showPassword }) => showPassword ? '1fr 1fr' : '2fr 1fr'};
            width: 50%;
            input {
                color: black;
                border: none;
                padding: 1rem;
                font-size: 1.2rem;
                border: 1px solid orange;
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
            padding: 0.5rem 17.1rem;
            background-color: orange;
            border: none;
            cursor: pointer;
            color: red;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
        }       
`;

