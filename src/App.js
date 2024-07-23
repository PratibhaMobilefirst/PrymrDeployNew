import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import SignupPage from "./Components/SignUpPage/SignUpPage";
import OnBoarding from "./Components/OnboardingScreen/OnBoardingMain";
import BoardBuilderPage from "./Components/Board/BoardBuilderPage";
import CreateBoard from "./Components/Board/CreateBoard";
import EditBoard from "./Components/Board/EditBoard";
import LayersPanel from "./Components/Board/ActionBar/Layers/Layers";
import { ImageProvider } from "./Components/Board/ImageContext/ImageContext";
import TapAction from "./Components/Board/ActionBar/Layers/TapAction";
import NewBoard from "./Components/Board/CreateNewBoard/NewBoard";
import ImageFromGalary from "./Components/Board/CreateNewBoard/ImageFromGalary";
// import ImageFromCamera from "./Components/Board/CreateNewBoard/ImageFromCamera";
import Share from "./Components/common/Share";
import Bookmarks from "./Components/HomePage/Bookmarks";
import Ads from "./Components/Board/CreateNewBoard/ADS/Ads";
import SaveBoard from "./Components/Board/SaveBoard";
import AllCreators from "./Components/HomePage/AllCreators";
import AboutPrymr from "./Components/HomePage/AboutPrymr";
import Blank from "./Components/Blank.jsx";
import EditBoardInfo from "./Components/Board/ActionBar/BoardEditor/EditBoardInfo";
import ActionBar from "./Components/Board/ActionBar/ActionBar";
import VisitorProfile from "./Components/Rework/VisitorProfile";
import Header from "./Components/common/Header";
import Navbar from "./Components/common/Navbar";
import LoginScreen from "./Components/OnboardingScreen/LoginScreen";
import SignIn from "./Components/OnboardingScreen/SignupIn/SignIn";
// import SignupPage from "./Components/OnboardingScreen/SignupIn/signup";
import BoardEdit from "./Profile Settings/BoardEdit";
import ForgetPassword from "./Components/OnboardingScreen/SignupIn/forgetPassword";
import Contact from "./Components/HomePage/Contact";
import HomePage from "./Components/HomePage/HomePage";
import SaveDesktopView from "./Components/Board/CreateNewBoard/SaveDesktopView";
import AddContentPage from "./Components/Board/ActionBar/Layers/AddContentPage";

function App() {
  return (
    <BrowserRouter>
      <ImageProvider>
        <Routes>
          {/* <Route path="/" element={<Blank />} /> */}
          <Route path="/user-profile" element={<VisitorProfile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          {/* old code */}
          {/* <Route path="/" element={<OnBoarding />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/home-about-allcreators" element={<AllCreators />} />
          <Route path="/home-about-prymr" element={<AboutPrymr />} />
          <Route path="/home-share" element={<Share />} />
          <Route path="/signuppage" element={<SignupPage />} />
          <Route path="/boardBuilder" element={<BoardBuilderPage />} />
          <Route path="/create-new-board" element={<NewBoard />} />
          <Route path="/create-new-board-ADS" element={<Ads />} />
          <Route path="/create-new-board-saved" element={<SaveBoard />} />
          <Route path="/actionbar" element={<ActionBar />} />
          <Route
            path="/create-new-board-edit-board-info"
            element={<EditBoardInfo />}
          />
          <Route
            path="/create-new-board-galary"
            element={<ImageFromGalary />}
          />
          <Route
            path="/boardBuilder-BoardInfo-createPost"
            element={<CreateBoard />}
          />
          {/* <Route path="/Camera" element={<ImageFromCamera />} /> */}
          <Route path="/board-builder-edit-board" element={<EditBoard />} />
          <Route
            path="/create-new-board-edit-board-info"
            element={<EditBoardInfo />}
          />
          <Route
            path="/board-builder-actionbar-layers"
            element={<LayersPanel />}
          />
          <Route
            path="/board-builder-actionbar-image-edit"
            element={<BoardEdit />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route
            path="/create/new-board/desktop-view"
            element={<SaveDesktopView />}
          />
          <Route path="/add-content" element={<AddContentPage />} />
        </Routes>
      </ImageProvider>
    </BrowserRouter>
  );
}

export default App;
