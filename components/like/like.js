import React, { useContext } from "react";
import { LikesContext } from "context/likesContext";
import styles from "./like.module.scss";

export default function Like({ like }) {
    const { updateLike, deleteLike } = useContext(LikesContext);

    const handleToggleLike = () => {
        const updatedFields = {
            ...like.fields,
            like: !like.fields.like,
        };
        const updatedLike = { id: like.id, fields: updatedFields };
        updateLike(updatedLike);
    };

    return (
        <li className={styles["list-item"]}>
            <p>{like.fields.name}</p>
            <button
                onClick={() => deleteLike(like.id)}
                type="button"
                className={styles.remove}
            >
                Delete
            </button>
        </li>
    );
}
