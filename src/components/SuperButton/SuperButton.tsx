import React from 'react';
import styles from './SuperButton.module.css'

type ButtonType = {
    buttonName: string
    callBack: () => void
    /**
     * Set button style from outside
     */
    className?: string
    /**
     * Button text color
     */
    nameColor?: string
    /**
     * Background color
     */
    backgroundColor?: string
    /**
     * Button text size
     */
    size?: 'small' | 'medium' | 'large'
}

export const SuperButton = (props: ButtonType) => {

    const onclickButtonHandler = () => props.callBack()

    const stylesButton = {
        color: props.nameColor ? props.nameColor : 'black',
        backgroundColor: props.backgroundColor ? props.backgroundColor : '',
        fontSize: props.size ? props.size : ''
    }

    return (
        <button style={stylesButton}
                className={props.className}
                onClick={onclickButtonHandler}>
            {props.buttonName}
        </button>
    )
}