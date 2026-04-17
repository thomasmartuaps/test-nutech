import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import defaultProfilePic from "~/assets/default-profile.png";
import "./editProfile.css";
import Dashboard from "~/components/dashboard/dashboard";

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.users.profile);
  const {
    email,
    first_name: firstName,
    last_name: lastName,
    profile_image: profilePicture,
  } = userProfile || {};
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    email,
    firstName,
    lastName,
  });
  const [profileImage, setProfileImage] = useState<string>(
    profilePicture || defaultProfilePic,
  );

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
    if (isEditable) {
      setFormData({ email, firstName, lastName });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryString = event.target?.result as string;
        setProfileImage(binaryString);
        dispatch({
          type: "UPLOAD_PICTURE",
          payload: binaryString,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: {} });
  };

  return (
    <Dashboard selectedMenu="account">
      <div className="profile-container">
        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <div className="profile-picture-wrapper">
            <img
              src={profileImage}
              alt="Profile"
              className="profile-picture"
              onClick={handleProfilePictureClick}
            />
            <button
              className="picture-edit-icon"
              onClick={handleProfilePictureClick}
              title="Change profile picture"
            >
              ✎
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden-file-input"
          />
        </div>

        {/* User Name */}
        <h1 className="profile-name">
          {formData.firstName} {formData.lastName}
        </h1>

        {/* Form Section */}
        <form className="profile-form">
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="form-input-wrapper">
              <span className="input-icon">@</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                readOnly={!isEditable}
                className={`form-input ${!isEditable ? "read-only" : ""}`}
              />
            </div>
          </div>

          {/* First Name Field */}
          <div className="form-group">
            <label className="form-label">Nama Depan</label>
            <div className="form-input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                readOnly={!isEditable}
                className={`form-input ${!isEditable ? "read-only" : ""}`}
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="form-group">
            <label className="form-label">Nama Belakang</label>
            <div className="form-input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                readOnly={!isEditable}
                className={`form-input ${!isEditable ? "read-only" : ""}`}
              />
            </div>
          </div>

          {/* Edit Button */}
          <button
            type="button"
            onClick={handleEditToggle}
            className="edit-button"
          >
            {isEditable ? "Simpan" : "Edit Profil"}
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </form>
      </div>
    </Dashboard>
  );
};

export default EditProfile;
