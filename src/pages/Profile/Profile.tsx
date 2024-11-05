import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Common/NavBar";

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();
  const tok = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setUserInfo({ username });
    }
  }, [navigate]);

  if (!userInfo) return <p>Loading...</p>;

  return (
    <>
      <NavBar loggedIn={!!tok} />
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center">
          Welcome, {userInfo.username}!
        </h1>
      </div>
    </>
  );
};

export default ProfilePage;
