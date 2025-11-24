import React, { useEffect, useRef, useState } from "react";
import {
  User,
  UserProfile as Profile,
  loggedInUser,
} from "../@types/CustomTypes";
import { getToken } from "../utils/tokenServices";
import styles from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser } from "../store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef<File | null>(null);
  // const imageRef = useRef<HTMLInputElement | null>(null);
  // const imageRef = useRef<any | null>(null);
  const [images, setImages] = useState<string | null>(null);

  type state = {
    user: loggedInUser;
  };

  let user = useSelector((state: state) => {
    return state.user;
  });

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser(null));
    navigate("/Login");
  };

  const show = {
    opacity: 1,
    display: "block",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
    y: 40,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  };

  const imagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageRef.current) {
      console.log("imageRef.current)", imageRef.current);
    }

    if (e.target.files && e.target.files.length > 0) {
      imageRef.current = e.target.files[0];
    }

    const files = e.currentTarget?.files;
    // if (files) {
    //   imageRef.current = files;
    // }
    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = () => {
        setImages(reader.result as string);
      };

      reader.readAsDataURL(file as Blob);
    } else {
      setImages(null);
    }
  };

  // if (user) {
  //   console.log("userid", user.user._id);
  //   console.log("publicId", user.user.avatar.public_id);
  if (imageRef.current) {
    console.log("imageRef.current", imageRef.current);
  }
  // }

  const updateProfile = async () => {
    const myHeaders = new Headers();
    const token = getToken();

    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();

    if (imageRef.current) {
      formdata.append("avatar", imageRef.current);
    }

    formdata.append("_id", user.user._id);
    if (user.user.avatar.public_id) {
      formdata.append("prevImg", user.user.avatar.public_id);
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/updateUser`,
        requestOptions
      );

      if (response.ok) {
        const result = (await response.json()) as loggedInUser;
        console.log("user image updated", result);
        setIsOpen(false);
        // setImages;
      }

      if (!response.ok) {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  return (
    <div>
      {user && (
        <>
          <div className={styles.profileContainer}>
            <div
              className={styles.imageBox}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img
                src={user.user.avatar.url}
                alt=""
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.name}>{user.user.name}</div>
              <div>{user.user.email}</div>
            </div>

            {/* <button className={styles.button}>UPDATE USER PROFILE</button> */}
            <button className={styles.LogOut} onClick={logout}>
              Log out
            </button>
            {/* <button
              className={styles.LogOut}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Edit Profile
            </button> */}
          </div>
          <div className={styles.addContainer}>
            <motion.div
              initial={false}
              animate={isOpen ? show : hide}
              className={styles.inputBoxes}
            >
              {images && (
                <div
                  className={`${styles.imagePreviewBox} ${
                    images ? styles.show : ""
                  }`}
                >
                  <div className={styles.imagePreview}>
                    {images && <img src={images} alt="Image Preview" />}
                  </div>
                </div>
              )}

              {images ? (
                <button onClick={updateProfile} className={styles.saveBtn}>
                  SAVE
                </button>
              ) : (
                <div className={styles.labelBox}>
                  <label
                    htmlFor="file-upload"
                    className={styles.imageLabel}
                    // onChange={() => {
                    //   updateProfile();
                    // }}
                  >
                    CHANGE IMAGE
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className={styles.file}
                    accept="image/*"
                    // ref={imageRef}
                    onChange={(e) => {
                      imagePreview(e);
                    }}
                  />
                </div>
              )}
            </motion.div>
          </div>
          {imageRef.current &&
            console.log("imageRef.current", imageRef.current)}
        </>
      )}
    </div>
  );
}

export default UserProfile;
