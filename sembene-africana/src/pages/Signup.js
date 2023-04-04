import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
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
            <div>
                <Header login />
                <div>
                    <div>
                        <h1>Made In Africa - Films & TV Shows</h1>
                        <h4>Watch anywhere . Any time</h4>
                        <h6>Become a member and start watching. Enter your email
                        </h6>
                    </div>
                    <div className>
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

const Container = styled.div``;

// export default Signup