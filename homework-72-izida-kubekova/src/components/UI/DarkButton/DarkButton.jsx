import React from "react";
import Button from "../Button/Button";
import './DarkButton.css';

const DarkButton = (props) => {
    return (
        <Button
            buttonClasses={['DarkButton', props.btnColor]}
            click={props.click === undefined ? null : props.click}
            label={props.label}
            disabled={props.disabled === undefined ? false : props.disabled}
        />
    );
};

export default DarkButton;