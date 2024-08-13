import React from "react";
import DarkButton from "../UI/DarkButton/DarkButton";
import './Dish.css';

const Dish = (props) => {
    return (
        <div className="Dish-row">
            <div className="Dish-column">
                <div className="Dish-img-row">
                    <img className="img-box" src={props.image} alt={props.alt} />
                    <div className="Dish-column justify-space">
                        <p className="Dish-name">{props.title}</p>
                        <p className="Dish-price">Price: <strong>{props.price}</strong></p>
                    </div>
                </div>
            </div>
            <div className="Dish-column">
                <DarkButton
                    btnColor={'btn-edit'}
                    label={'Edit'}
                    click={props.showEditForm}
                />
                <DarkButton
                    click={props.deleteIt}
                    btnColor={'btn-delete'}
                    label={'Delete'}
                />
            </div>
        </div>
    )
};

export default Dish;