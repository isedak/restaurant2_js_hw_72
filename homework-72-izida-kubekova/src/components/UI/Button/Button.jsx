import React from "react";

const Button = (props) => {

    return (
        <button
            onClick={props.click === undefined ? null : props.click}
            className={props.buttonClasses.join(' ')}
            disabled={props.disabled === undefined ? false : props.disabled}
        >
            {props.label}
        </button>
    );
};

export default Button;