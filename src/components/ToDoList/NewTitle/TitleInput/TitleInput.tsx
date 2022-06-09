import React, {ChangeEvent, KeyboardEvent} from 'react';

type TitleInputType = {
    title: string,
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
            <input value={props.title}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressInputHandler}
            />
        </div>
    )
}