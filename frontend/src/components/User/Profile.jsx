import React from "react";

const Profile = () => {
  const profile = {
    avatar:
      "https://i.pinimg.com/originals/8c/2b/08/8c2b08fd3b64011234b011b408cf6a6c.jpg",
    name: "Raushan Gupta Unofficial",
    email: "raushanguptaunofficial@gmail.com",
    mobile: "+91 9258423983",
    college: "Subharti Engineering College, Meerut",
    gender: "Male",
    dob: "2000-01-01",
    bio: "Full-stack developer and anime enthusiast. Striving to become the world’s greatest swordsman.",
  };

  return (
    <div className="min-h-screen  flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl  p-8 rounded-lg ">
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover shadow"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>

        <div className="mt-8 space-y-6">
          <ProfileItem label="Mobile" value={profile.mobile} />
          <ProfileItem label="College" value={profile.college} />
          <ProfileItem label="Gender" value={profile.gender} />
          <ProfileItem label="Date of Birth" value={profile.dob} />
          <ProfileItem label="Bio" value={profile.bio} />
        </div>

        <div className="mt-8 text-center">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

export default Profile;
