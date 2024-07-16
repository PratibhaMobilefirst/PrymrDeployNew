import React from "react";
import Home from "./Home";
import LoginScreen from "../OnboardingScreen/LoginScreen";

const HomePage = () => {
  return (
    <>
      <div className="lg:w-[30%]">
        <Home />
      </div>
      <div className="hidden lg:block lg:w-[70%] fixed right-0 top-0">
        <LoginScreen />
      </div>
    </>
  );
};

export default HomePage;
