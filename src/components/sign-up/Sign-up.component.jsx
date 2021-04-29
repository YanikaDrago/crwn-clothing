import React from "react";
import FormInput from "../form-input/Form-input.component";
import CustomButton from "../custom-button/Custom-button.component";
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPasssword: ''
        }
    }

    handleSubmit = async event =>{
        event.preventDefault();

        const {displayName, email, password, confirmPasssword} = this.state;

        if(password !== confirmPasssword){
            alert("password don't match");
            return;
        }


        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
        
            await createUserProfileDocument(user, {displayName});

            this.setState = ({
                displayName: '',
                email: '',
                password: '',
                confirmPasssword: ''
            });
        } catch(error){
            console.error(error);
        }
    }

    handleChange = event =>{
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    render(){
        const {displayName, email, password, confirmPasssword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I don't have a account</h2>
                <span>Sign up with yuor email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                      type='text'
                      name='displayName'
                      value={displayName}
                      onChange={this.handleChange}
                      label='Display Name'
                      required
                    />
                    <FormInput
                      type='text'
                      name='email'
                      value={email}
                      onChange={this.handleChange}
                      label='Email'
                      required
                    />
                    <FormInput
                      type='password'
                      name='password'
                      value={password}
                      onChange={this.handleChange}
                      label='Password'
                      required
                    />
                    <FormInput
                      type='password'
                      name='confirmPasssword'
                      value={confirmPasssword}
                      onChange={this.handleChange}
                      label='Confirm Passsword'
                      required
                    />  
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;