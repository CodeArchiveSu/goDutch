import React, { useEffect, useRef, useState } from "react";
import styles from "./Mainpage.module.css";
import moment from "moment";
import { motion } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";

import "react-quill/dist/quill.snow.css";
import {
  Group,
  ListGroup,
  User,
  currency,
  loggedInUser,
} from "../@types/CustomTypes";
import GroupList from "../components/GroupList";
import { getToken } from "../utils/tokenServices";
import { useSelector } from "react-redux";
import { LoadingAllUsers } from "../function/AllUsers";
import MainPageProfile from "../components/MainPageProfile";
import { fetchCurrency } from "../function/fetchCurrency";

function Mainpage() {
  const [searchEmailValue, setSearchEmailValue] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [names, setNames] = useState<User[]>([]);
  const [groupName, setGroupName] = useState<string>("");
  const [emailValue, setEmailValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<currency | null>(null);
  // const [date, setDate] = useState("");
  const date = moment().format("YYYY-MM-DD"); // 년도-월-일
  //   moment().format("hh:mm:ss"); // 시:분:초
  const day = moment().format("dddd"); // Tuesday
  const [shake, setShake] = useState(false);
  // console.log(date, day);

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

  type state = {
    user: loggedInUser;
  };

  let LoggedInUser = useSelector((state: state) => {
    return state.user;
  });

  // console.log(":)", LoggedInUser);

  const token = getToken();

  const fetchGroups = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      if (LoggedInUser) {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/groups/${LoggedInUser.user._id}`,
          requestOptions
        );
        if (response.ok) {
          const result = (await response.json()) as ListGroup;
          setGroups(result.groups);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [LoggedInUser]);

  useEffect(() => {
    const getCurrency = async () => {
      const currency = await fetchCurrency();
      setCurrency(currency); // This will log the fetched currency
    };

    getCurrency();
  }, []);

  const addEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setEmailValue(e.target.value);
  };

  const addEmailList = async () => {
    if (emailValue === "") {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setEmailValue("");
      // console.log(token);

      if (token && emailValue) {
        // LoadingAllUsers(token, emailValue);
        const foundUsers = (await LoadingAllUsers(token, emailValue)) as User[];
        console.log(foundUsers);
        if (foundUsers && foundUsers.length > 0) {
          setNames((prev) => [...prev, foundUsers[0]]);
        }
      }
    }
  };

  const addGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const creatNewGroup = async () => {
    console.log({
      name: groupName,
      members: names,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("name", groupName);
    urlencoded.append("members", LoggedInUser.user._id);
    names.map((item) => urlencoded.append("members", `${item._id}`));

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/groups/newGroup`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as Group;
        console.log("new group created", result);
        setNames([]);
        setGroupName("");
        setIsOpen(false);
        setGroups((prev) => [...prev, result]);
      }
      if (!response.ok) {
        console.log("error creating new group");
      }
    } catch (error) {
      console.log("error creating new group", error);
    }
  };

  const [TotalOwned, setTotalOwned] = useState(0);

  const getSum = () => {
    let sum = 0;
    groups.forEach((item) =>
      item.bills.forEach((subItem) => {
        if (subItem.payer !== LoggedInUser.user._id) {
          //아닐때 LoggedInUser.user._id  와 같은 아이디 있는 bill들의 값을 다 더한다
          const filterBills = subItem.bill.filter(
            (filter) => filter.user._id === LoggedInUser.user._id
          );
          filterBills.forEach((amount) => (sum += amount.amount));
        }
      })
    );
    return sum;
  };

  useEffect(() => {
    const result = getSum();
    setTotalOwned(result);
  }, [groups]);

  // console.log(TotalOwned);

  return (
    <div className={styles.mainPage}>
      <MainPageProfile groups={groups} />
      <div className={styles.maintop}>
        <div style={{ fontSize: "14px" }}>I'm owned</div>
        <div style={{ fontFamily: "Akkurat" }}>
          {TotalOwned} {currency?.code}{" "}
        </div>
      </div>

      <div
        className={`${groups.length === 0 ? styles.notice : styles.groupList}`}
      >
        {groups.length === 0 ? (
          <div>No group found</div>
        ) : (
          <GroupList groups={groups} currency={currency} />
        )}
      </div>

      <div className={styles.addGroupList}>
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={styles.addContainer}
        >
          <motion.button
            className={styles.addBtn}
            onClick={() => setIsOpen(!isOpen)}
          >
            CREATE NEW GROUP
            {/* <div className={styles.addBar}></div> */}
          </motion.button>

          <motion.div
            animate={isOpen ? show : hide}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={styles.inputBoxes}
          >
            <div id="InputElements">
              <div className={styles.boxElements}>
                <input
                  type="text"
                  placeholder="Add here group name"
                  maxLength={30}
                  className={styles.inputField}
                  onChange={(e) => {
                    addGroupName(e);
                  }}
                />
              </div>

              <div className={styles.nameBox}>
                <div className={styles.inputTitle}>Members</div>
                <div>
                  <div className={styles.nameList}>
                    {names.map((item) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeOut", duration: 0.4 }}
                        key={item._id}
                      >
                        {item.name}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={styles.boxElements}
                style={{ alignItems: "center" }}
              >
                Email
                <input
                  type="email"
                  // type="text"
                  // maxLength={10}
                  placeholder="Add new member..."
                  className={`${styles.inputField} ${
                    shake ? styles.shake : ""
                  }`}
                  value={emailValue}
                  onChange={(e) => {
                    addEmailValue(e);
                  }}
                />{" "}
                <motion.button
                  onClick={() => {
                    addEmailList();
                  }}
                  className={styles.addBtnIcon}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoIosAddCircle
                    style={{
                      color: " rgb(26, 26, 26)",
                      borderRadius: "50%",
                      width: "3vh",
                      height: "3vh",
                    }}
                  />
                </motion.button>
              </div>
              <div className={styles.boxElements}>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.saveBtn}
                  onClick={() => {
                    creatNewGroup();
                  }}
                >
                  SAVE
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Mainpage;
