import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function NavBar({ title, content, isBack, isPerson, children }) {
  const navigate = useNavigate();

  return (
    <header className={`fl-center ${styles.header}`}>
      {title && <div className={`${styles.left} fl-center`}>{title}</div>}
      {isBack && (
        <img
          onClick={() => {
            if (history?.state?.idx == 0) {
              navigate('/')
              return
            }
            navigate(-1)
          }}
          src="https://img.cacheserv.com/web/webai/back-icon-new.png"
          className={`${styles.backIcon} ${styles.img40}`}
        ></img>
      )}
      {content && <div className={styles.content}>{content}</div>}
      {isPerson && (
        <img
          className={styles.img40}
          onClick={() => navigate("/person")}
          src="https://img.cacheserv.com/web/webai/default-icon-new.png"
          alt="avatar"
        ></img>
      )}
      {children}
    </header>
  );
}

export default NavBar;
