import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authSelector, updateProfile } from "../store/slices/authSlice";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileView from "../components/Profile/ProfileView";
import ProfileForm from "../components/Profile/ProfileForm";

import { updateProfileApi } from "../services/profile.service";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(authSelector);

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

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      age: Number(formData.age),

      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    try {
      await dispatch(updateProfile(payload)).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
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
              saving={loading}
              error={error}
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
