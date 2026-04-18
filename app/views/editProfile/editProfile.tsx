import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import defaultProfilePic from "~/assets/default-profile.png";
import "./editProfile.css";
import Dashboard from "~/components/dashboard/dashboard";
import { NULL_PROFILE_PIC } from "~/utils/enum";
import GenericPopUp from "~/components/genericPopUp/genericPopUp";

const EditProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    profile: userProfile,
    editProfileErrorMessage,
    uploadPictureErrorMessage,
    uploadPictureSuccessMessage,
  } = useAppSelector((state) => state.users);
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

  const [profPicPopupOpen, setProfPicPopupOpen] = useState(false);

  const displayedProfilePicture =
    profilePicture && profilePicture !== NULL_PROFILE_PIC
      ? profilePicture
      : defaultProfilePic;

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
      if (file.size > 100 * 1024) {
        alert("ukuran file max 100kb");
        return;
      }
      // const reader = new FileReader();
      // reader.onload = (event) => {
      //   const binaryString = event.target?.result as string;
      //   setProfileImage(binaryString);
      const formData = new FormData();
      formData.append("file", file);
      dispatch({
        type: "UPLOAD_PICTURE",
        payload: {
          image: formData,
        },
      });
      // };
      // reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: {} });
  };

  const handleClosePopup = () => {
    setProfPicPopupOpen(false);
    dispatch({
      type: "CLEAR_UPLOAD_SUCCESS",
      payload: {},
    });
    dispatch({
      type: "CLEAR_UPLOAD_ERROR",
      payload: {},
    });
  };

  useEffect(() => {
    if (uploadPictureSuccessMessage || uploadPictureErrorMessage) {
      setProfPicPopupOpen(true);
    }
  }, [
    uploadPictureErrorMessage,
    uploadPictureSuccessMessage,
    setProfPicPopupOpen,
  ]);

  return (
    <Dashboard selectedMenu="account">
      <div className="profile-container">
        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <div className="profile-picture-wrapper">
            <img
              src={displayedProfilePicture}
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
                readOnly={true}
                className={`form-input read-only`}
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
          {!isEditable ? (
            <button
              type="button"
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          ) : null}
        </form>
      </div>

      <GenericPopUp
        isOpen={profPicPopupOpen}
        onClose={handleClosePopup}
        mode={uploadPictureSuccessMessage ? "success" : "error"}
        title={"Update Profile Image"}
        message={uploadPictureSuccessMessage || uploadPictureErrorMessage}
      />
    </Dashboard>
  );
};

export default EditProfile;
