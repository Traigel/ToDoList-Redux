import Button from '@mui/material/Button/Button';
import React from 'react';
import style from './SuperButton.module.css'

export type ColorButtonType = "success" | "secondary" | "error"
export type VariantType = 'text' | 'contained' | 'outlined'
export type SizeType = 'small' | 'medium' | 'large'

type ButtonType = {
    buttonName: string
    callBack: () => void
    /**
     * Set button style from outside
     */
    classNameButton?: string
    /**
     * Button text color
     */
    textColor?: string
    /**
     * Background color
     */
    colorButton?: ColorButtonType
    /**
     * Button size
     */
    size?: SizeType
    /**
     * Внешний вид ктопки : 'text' | 'contained' | 'outlined'
     */
    variant?: VariantType
    styles?: string
}

export const SuperButton = (props: ButtonType) => {

    const onclickButtonHandler = () => props.callBack()

    const stylesButton = {
        color: props.textColor ? props.textColor : 'black',
    }

    return <Button
        variant={props.variant}
        onClick={onclickButtonHandler}
        style={stylesButton}
        color={props.colorButton}
        size={props.size}
        className={props.classNameButton}
    >
        {props.buttonName}
    </Button>
}