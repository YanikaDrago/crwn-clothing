import React from "react";
import SignIn from "../../components/sign-in/Sign-in.component";
import SignUp from "../../components/sign-up/Sign-up.component";
import "./sign-in-and-sign-up.styles.scss"

const SignInAndSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp/>
    </div>
);

export default SignInAndSignUpPage;