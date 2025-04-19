import React, { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";

const Profile = () => {
  const { userData, fetchProfile, loadingUser } = useUserContext()
  useEffect(() => {
    fetchProfile()
  }, [])
  if (loadingUser) return <div>Loading...</div>;

  return <div>Welcome, {userData?.username}</div>;
};

export default Profile;
