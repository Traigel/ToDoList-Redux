import React from 'react';

type BodyListType = {
    state: Array<StateType>
}
type StateType = {
    id: number,
    title: string,
    isDone: boolean
}

export const BodyList = (props: BodyListType) => {
    return (
        <div>
            <ul>
                {props.state.map(u => {
                    return (
                        <li key={u.id}>
                            <input type="checkbox" checked={u.isDone}/>
                            <span>{u.title}</span>
                            <button>x</button>
                        </li>)
                    }
                )}
            </ul>
        </div>
    )
}