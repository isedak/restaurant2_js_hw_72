import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDish, createDish, setDish, setDishId, setShowingAddForm, setShowingEditForm, updateDish } from "../../store/dishes.slice";
import DarkButton from "../UI/DarkButton/DarkButton";
import Loader from "../UI/Loader/Loader";
import './AddOrEditDishForm.css';

const AddOrEditDishForm = (props) => {
    const loadingSending = useSelector(state => state.dishes.loadingSending);
    const dish = useSelector(state => state.dishes.dish);
    const dishId = useSelector(state => state.dishes.dishId);

    const dispatch = useDispatch();

    const onInputChanged = (e) => {
        const { name, value } = e.target;
        dispatch(setDish({ ...dish, [name]: value }));
    };

    const submitAdd = (e) => {
        e.preventDefault();
        dispatch(createDish(dish));
        dispatch(setShowingAddForm(false));
        dispatch(clearDish());
        dispatch(setDishId(''));
    };

    const submitEdit = (e) => {
        e.preventDefault();
        dispatch(updateDish({dishId, dish}));
        dispatch(setShowingEditForm(false));
        dispatch(clearDish());
        dispatch(setDishId(''));
    };

    return (
        <div className="form-box">
            <h1 className="form-title">{props.isAddForm ? 'Add a new dish' : 'Edit the dish'}</h1>
            {loadingSending ?
                <Loader />
                :
                <form className="form-flex-column"
                    onSubmit={props.isAddForm ? (e) => submitAdd(e) : (e) => submitEdit(e)}
                >
                    <label className="label" htmlFor="title">Title:</label>
                    <input type="text"
                        className={'input-box'}
                        onChange={(e) => onInputChanged(e)}
                        name={"title"}
                        value={dish.title}
                    />
                    <label className="label" htmlFor="price">Price:</label>
                    <input type="number"
                        className={'input-box'}
                        onChange={(e) => onInputChanged(e)}
                        name={"price"}
                        value={dish.price}
                    />
                    <label className="label" htmlFor="image">Image URL:</label>
                    <input type="text"
                        className={'input-box'}
                        onChange={(e) => onInputChanged(e)}
                        name={"image"}
                        value={dish.image}
                    />
                    <div className="btn-group-row">
                        <DarkButton
                            click={props.cancelClick}
                            btnColor={"btn-cancel"}
                            label={'Cancel'} />
                        <DarkButton
                            btnColor={"btn-save"}
                            disabled={dish.title.trim() === '' ||
                                dish.image.trim() === '' || dish.price <= 0
                                ? true : false}
                            label={'Save'} />
                    </div>
                </form>
            }
        </div>
    )
};

export default AddOrEditDishForm;