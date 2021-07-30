import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/Form-input.component';
import CustomButton from '../custom-button/Custom-button.component';
// import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import { signUpStart } from '../../redux/user/user.actions';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const  SignUp = ({signUpStart}) => {

  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = userCredentials;
  
  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({displayName, email, password});

    // Удаляем этот код, теперь все через Sagas

    //   try {
    //     const { user } = await auth.createUserWithEmailAndPassword(
    //       email,
    //       password
    //     );

    //     await createUserProfileDocument(user, { displayName });

    //     this.setState({
    //       displayName: '',
    //       email: '',
    //       password: '',
    //       confirmPassword: ''
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }

  };

  const handleChange = event => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };
    
    return (
      <SignUpContainer>
        <SignUpTitle> I do not have a account </SignUpTitle>
        <span> Sign up with your email and password </span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </SignUpContainer>
    );
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);


// меняем классовый компонент на функциональный - хуки
// constructor() {
//   super();

//   this.state = {
//     displayName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   };
// }