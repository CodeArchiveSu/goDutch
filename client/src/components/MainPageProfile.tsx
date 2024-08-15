import React, { useEffect, useState } from "react";
import styles from "./MainPageProfile.module.css";
import { useSelector } from "react-redux";
import { Group, loggedInUser } from "../@types/CustomTypes";
import { getToken } from "../utils/tokenServices";
import { get } from "https";

function MainPageProfile({ groups }: { groups: Group[] }) {
  type state = {
    user: loggedInUser;
  };

  const LoggedInUser = useSelector((state: state) => {
    return state.user;
  });

 

  return (
    <div className={styles.miniProfile}>
      <div className={styles.profileIamge}>
        <img src={LoggedInUser?.user.avatar.url} />
      </div>
      <div className={styles.title}>Hello, {LoggedInUser?.user.name}</div>
    </div>
  );
}

export default MainPageProfile;
