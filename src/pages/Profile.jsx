import { useState } from "react";
import { useSelector } from "react-redux";

import { authSelector } from "../store/slices/authSlice";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileView from "../components/Profile/ProfileView";
import ProfileForm from "../components/Profile/ProfileForm";

const Profile = () => {
  const { user } = useSelector(authSelector);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: "",
  });

  const handleEdit = () => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      age: user.age || "",
      gender: user.gender || "",
      photoUrl: user.photoUrl || "",
      about: user.about || "",
      skills: user.skills?.join(", ") || "",
    });

    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log(formData);

    // API baad me
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="overflow-hidden rounded-3xl border border-base-content/10 bg-base-100 shadow-lg">
        <ProfileHeader user={user} />

        <div className="p-6">
          {isEditing ? (
            <ProfileForm
              formData={formData}
              onChange={handleChange}
              onSave={handleSave}
              onCancel={handleCancel}
              saving={false}
              error={null}
            />
          ) : (
            <ProfileView user={user} onEdit={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
