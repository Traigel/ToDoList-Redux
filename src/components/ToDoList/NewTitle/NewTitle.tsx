import React, {useState} from 'react';
import {TitleInput} from "./TitleInput/TitleInput";
import {SuperButton} from "../../SuperButton/SuperButton"
import styles from './NewTitle.module.css'

type NewTitleType = {
    newTitleCallBack: (title: string) => void
}

export const NewTitle = (props: NewTitleType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeInputHandler = (titleValue: string) => {
        if (titleValue !== ' ') {
            setTitle(titleValue)
            setError(false)
        } else setError(true)
    }

    const onClickButtonHandler = () => {
        const titleReplace = title.replace(/^ +| +$|( ) +/g,"$1")
        if (titleReplace !== '') {
            props.newTitleCallBack(titleReplace)
            setTitle('')
        }
        else setError(true)
    }

    return (
        <div>
            <TitleInput title={title}
                        error={error}
                        callBack={onChangeInputHandler}
                        onKeyPressCallBack={onClickButtonHandler}
            />
            <SuperButton buttonName={'+'} callBack={onClickButtonHandler}/>
            {error ? <p className={styles.errorMessage}>Error! Enter value.</p> : <p></p>}
        </div>
    )
}