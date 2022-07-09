import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from './TitleInpute.module.css'
import {TextField} from "@mui/material";

type TitleInputType = {
    title: string,
    error: boolean
    callBack: (titleValue: string) => void
    onKeyPressCallBack: () => void
    classNameInput?: string
}

export const TitleInput = (props: TitleInputType) => {

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.callBack(e.currentTarget.value)

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Enter' && props.onKeyPressCallBack()

    return (
        <TextField
            value={props.title}
            onChange={onChangeInputHandler}
            onKeyPress={onKeyPressInputHandler}
            error={props.error}
            size={"small"}
            id="outlined-basic"
            label={props.error ? 'Error! Enter value.' : 'New task'}
            variant="outlined"
            className={props.classNameInput}
        />
    )
}