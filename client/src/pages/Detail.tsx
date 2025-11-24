import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Group,
  NotOkType,
  currency,
  loggedInUser,
  newBill,
} from "../@types/CustomTypes";
import styles from "./Detail.module.css";
import { IoIosAddCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { fetchCurrency } from "../function/fetchCurrency";
import { GoDotFill } from "react-icons/go";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { GoCheckCircle } from "react-icons/go";

function Detail() {
  let { id } = useParams();
  const groupId = id;

  type state = {
    user: loggedInUser;
  };

  const LoggedInUser = useSelector((state: state) => {
    return state.user;
  });

  type array = {
    user: string;
    amount: number;
  };

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dividedAmount, setDividedAmount] = useState(0);
  const [valuesToAdd, setValuesToAdd] = useState<array[]>([]);
  const [equally, setEqually] = useState(true);
  const [billTitle, setBillTitle] = useState("");
  const [payer, setPayer] = useState("");
  const [bills, setBills] = useState<newBill[] | null>(null);
  const [loadNewBill, setLoadNewBill] = useState(true);
  const [currency, setCurrency] = useState<currency | null>(null);

  const [people, setPeople] = useState<array[]>([{ user: "", amount: 0 }]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillTitle(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("selected", e.target.value);
    setPayer(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const amountValue = e.target.value === "" ? 0 : Number(e.target.value);
    let amounts: number[] = [];
    // let sum = 0;

    setPeople((prevPeople) => {
      const updatedPeople = prevPeople.map((person, i) =>
        i === index ? { ...person, amount: amountValue } : person
      );

      amounts = updatedPeople.map((item) => item.amount);

      const sum = amounts.reduce((accumulator, item) => {
        return accumulator + item;
      }, 0);

      setTotalAmount(sum);

      return updatedPeople;
    });
  };

  const handleSave = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      totalAmount: totalAmount,
      group_id: groupId,
      name: billTitle,
      payer: payer === "" ? LoggedInUser.user._id : payer,
      bill: people,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/bills/addNewBills`,
        requestOptions
      );
      if (response.ok) {
        const result = await response.json();
        console.log("new bills in group added", result);
        setPeople([{ user: "", amount: 0 }]);
        setBillTitle("");
        setLoadNewBill(!loadNewBill);
      }
      if (!response.ok) {
        const result = (await response.json()) as NotOkType;
        console.log(result);
      }
    } catch (error) {
      console.log(error);

      //add error handling
    }
  };

  useEffect(() => {
    if (selectedGroup?.members) {
      const newPeople = selectedGroup.members.map((item) => ({
        user: item._id,
        amount: 0,
      }));
      setPeople(newPeople);
    }
  }, [selectedGroup]);

  const divideAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    const Amount = Number(e.target.value);
    setTotalAmount(Amount);
    const divided = (Amount / (selectedGroup?.members?.length ?? 1)).toFixed(2);
    const numberDivided = Number(divided);
    setDividedAmount(numberDivided);

    setPeople(people.map((person) => ({ ...person, amount: numberDivided })));
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

  const fetchDetail = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/groups//detail/${groupId}`,
        requestOptions
      );
      if (response.ok) {
        const result = (await response.json()) as Group[];
        console.log(result);
        setSelectedGroup(result[0]);
      }
      if (!response.ok) {
        console.log("failed to load details of result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBills = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/bills/laodBills/${groupId}`,
        requestOptions
      );

      if (response.ok) {
        const result = (await response.json()) as newBill[];
        setBills(result);
        console.log("bills", result);
      }
      if (!response.ok) {
        const result = (await response.json()) as NotOkType;
        console.log("error", result);
      }
    } catch (error) {
      console.log(error);
    }
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  useEffect(() => {
    fetchBills();
  }, [loadNewBill]);

  useEffect(() => {
    const getCurrency = async () => {
      const currency = await fetchCurrency();
      console.log(currency);
      setCurrency(currency); // This will log the fetched currency
    };

    getCurrency();
  }, []);

  useEffect(() => {
    setTotalAmount(0);
    setPeople(people.map((person) => ({ ...person, amount: 0 })));
  }, [equally]);

  return (
    <div className={styles.detailPage}>
      <div className={styles.maintop}>
        <div>{selectedGroup && selectedGroup.name}</div>
        <div style={{ fontFamily: "Akkurat", fontSize: "16px" }}>
          {selectedGroup && selectedGroup.createdAt.split("T")[0]}
        </div>
      </div>

      <div className={styles.names}>
        {selectedGroup?.members.map((item) => (
          <>
            <div className={styles.imageBox}>
              <img src={item.avatar.url} />
            </div>
            <div className={styles.nameBox}>{item.name}</div>
          </>
        ))}
      </div>

      <div className={styles.billContainer}>
        {bills &&
          bills.map((item, index) => (
            <div className={styles.billBox}>
              <div className={styles.billBoxName}>
                <div>{item.name}</div>
                <div>
                  {item.totalAmount} {currency?.code}
                </div>
              </div>

              <div className={styles.dividedBillContainer}>
                {item.bill.map((subItem, subindex) => (
                  <div className={styles.dividedBill}>
                    <div className={styles.nameBoxinBill}>
                      <div>
                        {subItem.amount} {currency?.code}
                      </div>
                      <div className={styles.icon}>
                        {bills[index].payer._id === subItem.user._id && (
                          <GoDotFill style={{ color: "green" }} />
                        )}
                        <div>{subItem.user.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className={styles.addGroupList}>
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={styles.addContainer}
        >
          <motion.button
            className={styles.plus}
            onClick={() => setIsOpen(!isOpen)}
          >
            <IoIosAddCircle
              style={{
                color: " rgb(26, 26, 26)",
                borderRadius: "50%",
                width: "3vh",
                height: "3vh",
              }}
              onClick={() => setIsOpen(!isOpen)}
            />
          </motion.button>

          <motion.div
            animate={isOpen ? show : hide}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className={styles.inputBoxes}
          >
            <div id="InputElements">
              <div className={styles.boxElements}>
                <div className={styles.selectContainer}>
                  <select
                    name="user"
                    onChange={(e) => {
                      handleSelectChange(e);
                    }}
                    className={styles.nameSelect}
                  >
                    {selectedGroup?.members.map((item) => (
                      <>
                        <option value={item._id}>{item.name}</option>
                      </>
                    ))}
                  </select>
                  SPENT
                </div>
              </div>

              {/* totalamount */}
              <div className={styles.boxElements}>
                TOTAL
                <input
                  type="number"
                  disabled={!equally}
                  value={totalAmount}
                  maxLength={30}
                  name="amount"
                  className={styles.inputField}
                  onChange={(e) => {
                    divideAmount(e);
                  }}
                />
              </div>
              {/* description */}
              <div className={styles.boxElements}>
                FOR
                <input
                  type="text"
                  maxLength={30}
                  value={billTitle}
                  className={styles.inputField}
                  onChange={(e) => handleTitleChange(e)}
                />
              </div>
              <div className={styles.boxElements}>
                {selectedGroup &&
                  selectedGroup.members.map((item, index) => (
                    <div>
                      <div>{item.name}</div>
                      <input
                        type="number"
                        maxLength={30}
                        className={styles.inputField}
                        // value={dividedAmount} // 해당 멤버의 입력값을 보여줍니다.
                        value={people[index]?.amount}
                        disabled={equally}
                        name={item.name}
                        onChange={(e) => handleInputChange(e, index)} // 멤버의 ID를 전달합니다.
                      />
                    </div>
                  ))}
              </div>

              <div
                className={`${styles.boxElements} ${styles.checkboxElement}`}
              >
                {equally ? (
                  <GoCheckCircle
                    className={styles.smallCheckbox}
                    onClick={() => {
                      setEqually(!equally);
                    }}
                  />
                ) : (
                  <MdRadioButtonUnchecked
                    className={styles.smallCheckbox}
                    onClick={() => {
                      setEqually(!equally);
                    }}
                  />
                )}

                <span>DIVIDE EQUALLY</span>
                {/* <label>DIVIDE EQUALLY</label> */}
                {/* <div className={styles.checkboxLabel}>DIVIDE EQUALLY</div> */}
              </div>
              <div className={styles.boxElements}>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={styles.saveBtn}
                  onClick={() => {
                    setIsOpen(false);
                    handleSave();
                    // setLoadNewBill(!loadNewBill);
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

export default Detail;
