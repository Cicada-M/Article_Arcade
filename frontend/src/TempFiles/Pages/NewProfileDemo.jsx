// src/components/ProfilePage.js
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfilePosts from "../components/profile/ProfilePosts";
import Navbar from "../components/NewNavbar";
import Footer from "../components/Footer";
const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-black min-h-screen flex flex-col">
        <ProfileHeader />
        <ProfileInfo />
        <p className="flex justify-center mt-20 text-4xl font-bold ">Posts</p>
        <ProfilePosts />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
