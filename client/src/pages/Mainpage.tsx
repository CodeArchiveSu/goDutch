import React, { useEffect, useRef, useState } from "react";
import styles from "./Mainpage.module.css";
import moment from "moment";
import { Variants, motion } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";

import "react-quill/dist/quill.snow.css";
import { currency } from "../@types/CustomTypes";

function Mainpage() {
  const [emails, setEmails] = useState<string[]>([]);
  const [emailValue, setEmailValue] = useState("");
  const [add, setAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<currency | null>(null);
  // const [date, setDate] = useState("");
  const date = moment().format("YYYY-MM-DD"); // 년도-월-일
  //   moment().format("hh:mm:ss"); // 시:분:초
  const day = moment().format("dddd"); // Tuesday
  const [shake, setShake] = useState(false);
  console.log(date, day);

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

  const fetchCurrency = () => {
    console.log(process.env.REACT_APP_API_KEY_LOCATION);
    fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_API_KEY_LOCATION}`
    )
      .then((response) => response.json())
      .then((data) => {
        const currency = data.currency;
        console.log(currency);
        setCurrency(currency);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  const addEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setEmailValue(e.target.value);
  };

  const addEmailList = () => {
    if (emailValue === "") {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setEmails((prev) => [...prev, emailValue]);
      setEmailValue("");
    }
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.maintop}>
        <div style={{ fontSize: "14px" }}>I'm owned</div>
        <div>0 {currency?.symbol}</div>
        <div>
          <button className={styles.detailBtn}>go to Details</button>
        </div>
      </div>

      <div className={styles.groupList}>
        Create your firtst new group
        {/* <div className={styles.groupDiv}>
          <div className={styles.groupTitle}>Create your firtst new group</div>
        </div> */}
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
            <div className={styles.addBar}></div>
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
                />
              </div>
              {/* <div className={styles.boxElements}>
                {currency?.name}
                <input type="number" name="" id="" style={{ border: "none" }} />
              </div> */}

              <div className={styles.nameBox}>
                <div className={styles.inputTitle}>Members</div>
                <div>
                  <div className={styles.nameList}>
                    {emails.map((item) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: "easeOut", duration: 0.4 }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={styles.boxElements}
                style={{ alignItems: "center" }}
              >
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
