import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { React, useState } from 'react';
import styled from "styled-components";
import BgImage from '../components/bgimage/BgImage';
import Header from '../components/header/Header';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    // const [showPassword, SetShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    //HANDLE LOG IN
    const handleLogIn = async () => {
        // console.log(formValues);
        try {
            const { email, password } = formValues;
            await signInWithEmailAndPassword(firebaseAuth, email, password)
        } catch (err) {
            console.log(err)
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate('/');
    });

    return (
        <Container>
            <BgImage />
            <div>
                <Header />
                <div>
                    <div>
                        <div>
                            <h3>Login</h3>
                        </div>
                        <div className>
                            <input
                                type='email' placeholder='Email Address' name='email'
                                value={formValues.email} onChange={(e) =>
                                    setFormValues({
                                        ...formValues, [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <input type='password' placeholder='Password' name='password' value={formValues.password}
                                onChange={(e) => setFormValues({
                                    ...formValues, [e.target.name]: e.target.value,
                                })
                                }
                            />
                            <button onClick={handleLogIn}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div``;

// export default Signup

// export default Login