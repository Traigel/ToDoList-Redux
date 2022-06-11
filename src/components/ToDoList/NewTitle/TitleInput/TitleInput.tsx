import React, {ChangeEvent, KeyboardEvent} from 'react';
import styles from './TitleInpute.module.css'

type TitleInputType = {
    title: string,
    error: boolean
    callBack: (titleValue: string) => void
    onKeyPressCallBack: () => void
}

export const TitleInput = (props: TitleInputType) => {

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        props.callBack(e.currentTarget.value)

    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) =>
        e.key === 'Enter' && props.onKeyPressCallBack()

    return (
        <div>
            <input className={`${ props.error ? styles.error : ''}`}
                   value={props.title}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressInputHandler}
            />
        </div>
    )
}