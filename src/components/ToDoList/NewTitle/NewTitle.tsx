import React, {useState} from 'react';
import {TitleInput} from "./TitleInput/TitleInput";
import {Button} from "../Button/Button";

export const NewTitle = () => {

    let [title, setTitle] = useState<string>('')

    const onChangeInputHandler = (titleValue: string) => {
        setTitle(titleValue)
    }

    return (
        <div>
            <TitleInput title={title} callBack={onChangeInputHandler}/>
            <Button buttonName={'+'} callBack={() => {
            }}/>
        </div>
    )
}