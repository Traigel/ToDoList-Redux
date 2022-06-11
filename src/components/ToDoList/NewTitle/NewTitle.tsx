import React, {useState} from 'react';
import {TitleInput} from "./TitleInput/TitleInput";
import {Button} from "../Button/Button";

type NewTitleType = {
    newTitleCallBack: (title: string) => void
}

export const NewTitle = (props: NewTitleType) => {

    let [title, setTitle] = useState<string>('')

    const onChangeInputHandler = (titleValue: string) => setTitle(titleValue)

    const onClickButtonHandler = () => {
        if (title.trim() === '') return
        props.newTitleCallBack(title.trim())
        setTitle('')
    }

    return (
        <div>
            <TitleInput title={title}
                        callBack={onChangeInputHandler}
                        onKeyPressCallBack={onClickButtonHandler}
            />
            <Button buttonName={'+'} callBack={onClickButtonHandler}/>
        </div>
    )
}