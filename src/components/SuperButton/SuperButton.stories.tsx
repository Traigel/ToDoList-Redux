import React from 'react';
import {action} from '@storybook/addon-actions'
import {SuperButton} from "./SuperButton";
import {ComponentStory} from "@storybook/react";

export default {
    title: 'Universal Components/SuperButton',
    component: SuperButton,
    argTypes: {
        buttonName: {table: {category: 'Main'}},
        callBack: {table: {category: 'Events'}},
        className: {table: {category: 'Styles'}},
        size: {table: {category: 'Styles'}},
        nameColor: {
            control: 'color',
            table: {category: 'Styles'}
        },
        backgroundColor: {
            control: 'color',
            table: {category: 'Styles'}
        }
    }
}

const callback = action('Button onclick')

const Template: ComponentStory<typeof SuperButton> = (args) => <SuperButton {...args}/>

export const UniversalButton = Template.bind({});
UniversalButton.args = {
    buttonName: 'Button',
    callBack: callback,
}