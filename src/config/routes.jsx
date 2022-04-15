import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import LoginPage from '../modules/login-page/components/loginPage';
import OtpPage from '../modules/otp-page/components/otpScreen';
import WelcomeScreen from "../modules/welcome-screen/components/welcomeScreen";
import HomeScreen from "../modules/home-screen/components/homeScreen";
import ProfileScreen from "../modules/profile-screen/components/profileScreen";
import routerPaths from './index';

const RouterConfig = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const id = localStorage.getItem('phoneNumber');
    const isUserEnteredPhoneNumber = id === null || id === undefined || id === '';
    const isUserLoggedIn = userDetails?.id === null || userDetails?.id === '' || userDetails?.id === undefined;
    console.log(isUserEnteredPhoneNumber);
    return (
        <Routes>
            <Route path={routerPaths.initialRoute}
                   element={isUserLoggedIn ? <LoginPage/> : <HomeScreen/>}
            />
                <Route path={routerPaths.otpScreen}
                       element={isUserEnteredPhoneNumber ? <LoginPage/> : <OtpPage/>}
                />
            <Route path={routerPaths.onboarding}
                   element={isUserEnteredPhoneNumber ? <LoginPage/> : <WelcomeScreen/>}
            />
            {!isUserLoggedIn && (
                <>
                <Route path={routerPaths.home}
                element={<HomeScreen/>}
                />
                <Route path={routerPaths.profile}
                element={<ProfileScreen/>}/>
                </>
                )}

        </Routes>
    );
}
export default RouterConfig;