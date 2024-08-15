import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Variants, motion } from "framer-motion";
import { FiAlignJustify } from "react-icons/fi";
import { TbTimelineEventText } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="menu"
      >
        <motion.button
          whileTap={{ scale: 0.97 }} //눌고있을 떄
          onClick={() => setIsOpen(!isOpen)}
          className="menuBtn"
        >
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            {/* <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg> */}
            <BiDotsHorizontalRounded style={{ color: "black" }} />
          </motion.div>
        </motion.button>
        <motion.ul
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3, // 리스트 하나씩
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)", //상  좌 우 하단
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.li
            variants={itemVariants}
            className="list"
            onClick={() => {
              navigate("/");
              setIsOpen(!isOpen);
            }}
          >
            Home
            <FiAlignJustify style={{ strokeWidth: 1 }} />
          </motion.li>
          <motion.li
            variants={itemVariants}
            className="list"
            onClick={() => {
              navigate("/profile");
              setIsOpen(!isOpen);
            }}
          >
            Profile <TbTimelineEventText style={{ strokeWidth: 1 }} />
          </motion.li>
          {/* <motion.li variants={itemVariants} className="list" on>
            Search <IoIosSearch style={{ strokeWidth: 0.1 }} />
          </motion.li> */}
        </motion.ul>
      </motion.nav>
    </>
  );
}

export default Nav;
