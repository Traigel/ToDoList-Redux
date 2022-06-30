import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TaskTitlePropsType = {
    title: string
    titleValueCallBack: (newTitle: string) => void
}

export const TaskTitle = (props: TaskTitlePropsType) => {

    const [visibility, setVisibility] = useState<boolean>(false)
    const [titleValue, setTitleValue] = useState<string>(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value)
    }

    const onVisibilityHandler = () => setVisibility(true)
    const offVisibilityHandler = () => {
        setVisibility(false)
        props.titleValueCallBack(titleValue)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offVisibilityHandler()

    return (
        visibility
            ?
            <input
                value={titleValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={offVisibilityHandler}
                autoFocus
            />
            :
            <span onDoubleClick={onVisibilityHandler}>{props.title}</span>
    )
}