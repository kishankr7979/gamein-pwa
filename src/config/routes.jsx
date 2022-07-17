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
    const l = JSON.parse(localStorage.getItem('token'));
    const user = l;
    console.log(user);
    // const [user] = useAuthState(auth);
    // console.log(user);
    return (
        user ? (
            <Routes>
           <Route path={routerPaths.initialRoute}
                element={<HomeScreen/>}
                />
                 <Route path={routerPaths.home}
                element={<HomeScreen/>}
                />
                  <Route path={routerPaths.onboarding}
                element={<WelcomeScreen/>}
                />
                <Route path={routerPaths.profile}
            element={<ProfileScreen/>}/>
            </Routes>
        ) : (  <Routes>
            <Route path={routerPaths.initialRoute}

                element={<LoginPage/>}
                />
                 <Route path={routerPaths.login}
            
            element={<LoginPage/>}
            />
        </Routes>)
    );
}
export default RouterConfig;