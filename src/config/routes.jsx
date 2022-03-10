import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import LoginPage from '../modules/login-page/components/loginPage';
import OtpPage from '../modules/otp-page/components/otpScreen';
import routerPaths from './index';

const RouterConfig = () => {
  return(
    <Routes>
      <Route path={routerPaths.login}
      element={<LoginPage />}
      />
       <Route path={routerPaths.otpScreen}
      element={<OtpPage />}
      />
    </Routes>
  );
}
export default RouterConfig;