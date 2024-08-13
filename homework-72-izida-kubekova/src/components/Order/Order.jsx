import React from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button/Button";

import './Order.css';

const Order = (props) => {
    const delivery = useSelector(state => state.orders.delivery);
    const dishes = useSelector(state => state.dishes.dishes);

    const calculateSum = () => {
        let sum = Object.entries(props.orderList).map(([key, value]) => {
            return parseInt(value) * parseFloat(dishes[key].price);
        }).reduce((acc, value) => {
            return acc + value
        });
        console.log(sum)
        return delivery + sum;
    };

    return (
        <>
            {props.orderList === null || props.orderList === undefined ? <p>{"No"}</p> :
                <>
                    <div className="Order-row">
                        <div className="Order-column">
                            {Object.entries(props.orderList).map(([key, value]) => {
                                return <p key={`${props.id}${key}`} className="Order-item">{value} X
                                    <strong> {dishes[key].title}</strong>
                                </p>
                            })}
                            <p>Delivery: {delivery}</p>
                        </div>
                        <div className="Order-column">
                            {Object.entries(props.orderList).map(([key, value]) => {
                                return <p key={`${props.id}${key}-price`} className="Order-item">
                                    <strong>{parseInt(value) * parseFloat(dishes[key].price)} </strong>
                                    KGS</p>
                            })}
                        </div>
                        <div className="Order-column">
                            <p className="Order-item">Order Total:</p>
                            <p className="Order-item"><strong>{calculateSum()}</strong> KGS</p>
                            <Button
                                buttonClasses={['btn-complete']}
                                label={'Complete order'}
                                click={props.deleteIt} />
                        </div>
                    </div>
                </>}
        </>
    );
};

export default Order;