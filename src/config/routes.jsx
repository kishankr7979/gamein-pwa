import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import LoginPage from '../modules/login-page/components/loginPage';
import OtpPage from '../modules/otp-page/components/otpScreen';
import WelcomeScreen from "../modules/welcome-screen/components/welcomeScreen";
import HomeScreen from "../modules/home-screen/components/homeScreen";
import routerPaths from './index';

const RouterConfig = () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const isUserLoggedIn = userDetails === null || userDetails?.name === null || userDetails?.name === '';
    console.log(userDetails);
    return (
        <Routes>
            <Route path={routerPaths.initialRoute}
                   element={isUserLoggedIn ? <LoginPage/> : <HomeScreen />}
            />
            <Route path={routerPaths.otpScreen}
                   element={<OtpPage/>}
            />
            <Route path={routerPaths.onboarding}
                   element={<WelcomeScreen/>}
            />
            <Route path={routerPaths.home}
                   element={<HomeScreen />}
                   />
        </Routes>
    );
}
export default RouterConfig;