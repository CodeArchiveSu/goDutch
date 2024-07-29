import React, { useEffect, useRef, useState } from "react";
import styles from "./Mainpage.module.css";
import moment from "moment";
import { Variants, motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { currency } from "../@types/CustomTypes";

function Mainpage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<currency | null>(null);
  const date = moment().format("YYYY.MM.DD"); // 년도-월-일
  //   moment().format("hh:mm:ss"); // 시:분:초
  const day = moment().format("dddd"); // Tuesday
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

  return (
    <div className={styles.mainPage}>
      <div className={styles.maintop}>
        <div>I'm owned 0 {currency?.symbol}</div>
      </div>
      {/* <button>+</button> */}
      <div className={styles.todoList}>
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={styles.addContainer}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={styles.addBtn}
            onClick={() => setIsOpen(!isOpen)}
          >
            ADD YOUR FIRST GROUP
          </motion.button>

          <motion.div
            animate={isOpen ? show : hide}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={styles.inputBoxes}
          >
            <div>
              <div> </div>
              <div className={styles.boxElements}>
                <textarea className={styles.textArea} />
                <div>{currency?.name}</div>
              </div>
              <div className={styles.boxElements}>
                Deadline
                <input type="datetime-local" name="deadline" id="start" />
              </div>{" "}
              <div className={styles.boxElements}>
                Add by email
                <button>+</button>
              </div>
              <button className={styles.boxElements}>Add to do</button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Mainpage;
