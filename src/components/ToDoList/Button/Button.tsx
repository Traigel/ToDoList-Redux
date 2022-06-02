import React from 'react';
import styles from './Button.module.css'

type ButtonType = {
    buttonName: string,
    callBack: () => void
}

export const Button = (props: ButtonType) => {

    const onclickButtonHandler = () => {
        props.callBack()
    }

    return (
        <div className={styles.item}>
            <button onClick={onclickButtonHandler}>{props.buttonName}</button>
        </div>
    )
}