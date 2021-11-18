import React, { useState, useContext } from "react";
import { LikesContext } from "context/likesContext";
import { Heart } from "../icons";
import styles from "./lovebutton.module.scss";

const LoveButton = ({ name }) => {
    const { addLike } = useContext(LikesContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        addLike(name);
    };

    return (
        <button className={styles.btn} onClick={handleSubmit}>
            <Heart fill={"#80ed99"} />
        </button>
    );
};

export default LoveButton;
