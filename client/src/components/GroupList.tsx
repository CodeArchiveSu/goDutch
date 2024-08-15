import React, { useEffect, useMemo, useState } from "react";
import { resultingClientExists } from "workbox-core/_private";
import {
  Group,
  ListGroup,
  currency,
  loggedInUser,
} from "../@types/CustomTypes";
import styles from "./GroupList.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type state = {
  user: loggedInUser;
};

function GroupList({
  groups,
  currency,
}: {
  groups: Group[];
  currency: currency | null;
}) {
  const navigate = useNavigate();
  const navigateToDetail = (groupId: string) => {
    navigate(`/detail/${groupId}`);
  };

  const [arrayOfTotal, setArrayOfTotal] = useState<number[]>([]);

  let user = useSelector((state: state) => {
    return state.user;
  });

  console.log(groups);

  const sumlist = () => {
    const show = groups.flatMap((item) => {
      if (item.bills.length === 0) {
        return [0]; // bills 배열이 비어 있으면 0을 반환
      } else {
        return item.bills.reduce(
          (subTotal, subItem) => subTotal + Number(subItem.totalAmount),
          0
        );
      }
    });
    console.log(show);
    setArrayOfTotal(show);
  };

  useEffect(() => {
    sumlist();
  }, []);

  return (
    <div className={styles.groupDiv}>
      {groups &&
        groups.map((item, index) => (
          <div
            className={styles.groupBox}
            onClick={() => {
              navigateToDetail(item._id);
            }}
          >
            {/* <div>{item.createdAt}</div> */}
            <div className={styles.groupName}>
              <div>{item.name}</div>
              <div className={styles.totalAmount}>
                {arrayOfTotal[index] == undefined ? 0 : arrayOfTotal[index]}
                <div style={{ fontFamily: "Helvetica" }}>
                  {currency?.symbol}
                </div>
              </div>
            </div>

            <div className={styles.name}>
              {item.members.map((names, index) => (
                <div style={{ fontFamily: "Akkurat" }}> {names.name}</div>
              ))}
            </div>
            <div style={{ fontFamily: "Akkurat", fontSize: "10px" }}>
              {item.createdAt.split("T")[0]}
            </div>
          </div>
        ))}
    </div>
  );
}

export default GroupList;
