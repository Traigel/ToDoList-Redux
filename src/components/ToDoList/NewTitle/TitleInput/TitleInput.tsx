import React, {ChangeEvent} from 'react';

type TitleInputType = {
    title: string,
    callBack: (titleValue: string) => void
}

export const TitleInput = (props: TitleInputType) => {

    const onChangeInputHandler = (u: ChangeEvent<HTMLInputElement>) => {
        props.callBack(u.currentTarget.value)
    }

    return (
        <div>
            <input onChange={onChangeInputHandler} value={props.title}/>
        </div>
    )
}