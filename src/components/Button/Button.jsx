import React from 'react';

import {classNames} from "../../config/classNames.js";
import css from "./Button.module.scss";

const Button = (props) => {
    const { children, className, theme = "BASE", ...otherProps } = props;

    return (
        <button {...otherProps} className={classNames(css.Button, css[theme], [className])}>
            {children}
        </button>
    );
};

export default Button;
