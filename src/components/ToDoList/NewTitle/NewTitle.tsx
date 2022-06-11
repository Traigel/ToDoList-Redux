import React, {useState} from 'react';
import {TitleInput} from "./TitleInput/TitleInput";
import {Button} from "../Button/Button"
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
        if (title.trim() !== '') {
            props.newTitleCallBack(title.trim())
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
            <Button buttonName={'+'} callBack={onClickButtonHandler}/>
            {error ? <p className={styles.errorMessage}>Error! Enter value.</p> : <p></p>}
        </div>
    )
}