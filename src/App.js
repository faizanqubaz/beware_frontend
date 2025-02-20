import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/Admin/ProtectedRoute"; // Import the ProtectedRoute component
import NavbarComponent from "./components/Navbar/navbar";
import { Helmet } from "react-helmet";
import NavbarComponentClass from "./components/Navbar/navbarcontainer";
import AlertMessage from "./components/AlertMessage/alertmessage";
import SliderComponent from "./components/Slider/slider";
import IntroductionComponent from "./components/Introduction/introduction";
import MapContainerComponent from "./components/map/mapcontainer";
import DiscountComponent from "./components/Discounts_New_Hunt/discount";
import PopularHuntComponent from "./components/Popular_Hunt/popularhunt";
import NewHuntComponent from "./components/New_Hunt/newhunt";
import GuideComponent from "./components/guides/guide";
import PartnersComponents from "./components/partners/partners";
import FooterComponents from "./components/Footer/footer";
import TeamComponent from "./components/Team/team";
import DetailDiscountComponent from "./components/Discounts_New_Hunt/detail_discount";
import DetailPopularHuntComponent from "./components/Popular_Hunt/popular_hunt_detail";
import NewHuntDetailContainer from "./components/New_Hunt/new_hunt_detail";
import ContactUSContainer from "./components/contactus/contactus";
import TermsAndConditionComponent from "./components/terms_and_condition/terms_and_condition";
import AboutUsContainer from "./components/AboutUS/aboutus";
import SponsorsContainer from "./components/Sponsors/sponsors";
import GalleryComponent from "./components/Gallery/gallery";
import VideoComponent from "./components/Video/video";
import AdminComponentForm from "./components/Admin/admin";
import AdminDashboardComponent from "./components/admin-dashboard/admin-dashboard";

function MainContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/dashboard" && (
        <>
          <NavbarComponent />
          <NavbarComponentClass />
          <AlertMessage />
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SliderComponent />
              <IntroductionComponent />
              <MapContainerComponent />
              <DiscountComponent />
              <PopularHuntComponent />
              <NewHuntComponent />
              <PartnersComponents />
              <GuideComponent />
              <TeamComponent />
              <FooterComponents />
            </>
          }
        />
        <Route path="/discount/:id" element={<DetailDiscountComponent />} />
        <Route path="/popularhunt/:id" element={<DetailPopularHuntComponent />} />
        <Route path="/newhunt/:id" element={<NewHuntDetailContainer />} />
        <Route path="/contactus" element={<ContactUSContainer />} />
        <Route path="/terms_and_conditions" element={<TermsAndConditionComponent />} />
        <Route path="/aboutus" element={<AboutUsContainer />} />
        <Route path="/sponsors" element={<SponsorsContainer />} />
        <Route path="/gallery" element={<GalleryComponent />} />
        <Route path="/video" element={<VideoComponent />} />
        <Route path="/admin-sigin" element={<AdminComponentForm />} />

        {/* Protect the Dashboard Route */}
        <Route
          path="/dashboard"
          element={
         
              <AdminDashboardComponent />
          
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <MainContent />
      </Router>
      <Helmet>
        <meta name="google-site-verification" content="90IHVEH5oGbjRplp10PygNPJxoz_QixrK6oUN-yjsfw" />
      </Helmet>
    </>
  );
}

export default App;
