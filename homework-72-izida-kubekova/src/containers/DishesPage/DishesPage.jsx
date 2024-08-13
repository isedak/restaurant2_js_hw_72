import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dish from "../../components/Dish/Dish";
import Modal from "../../components/UI/Modal/Modal";
import DarkButton from "../../components/UI/DarkButton/DarkButton";
import Loader from "../../components/UI/Loader/Loader";
import { clearDish, deleteDish, getDishes, setDish, setDishId, setShowingAddForm, setShowingEditForm } from "../../store/dishes.slice";
import './DishesPage.css';
import AddOrEditDishForm from "../../components/AddOrEditDishForm/AddOrEditDishForm";

const DishesPage = () => {
    const dishes = useSelector(state => state.dishes.dishes);
    const loading = useSelector(state => state.dishes.loading);
    const showError = useSelector(state => state.dishes.showError);
    const errorMessage = useSelector(state => state.dishes.errorMessage);
    const showingAddForm = useSelector(state => state.dishes.showingAddForm);
    const showingEditForm = useSelector(state => state.dishes.showingEditForm);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDishes());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const deleteIt = (e, id) => {
        e.preventDefault();
        dispatch(deleteDish(id));
    };

    const showAddForm = (e) => {
        e.preventDefault();
        dispatch(setShowingAddForm(true));
        dispatch(clearDish());
        dispatch(setDishId(''));
    };

    const showEditForm = (e, key) => {
        e.preventDefault();
        dispatch(setShowingEditForm(true));
        dispatch(setDish({
            title: dishes[key].title,
            price: dishes[key].price,
            image: dishes[key].image
        }));
        dispatch(setDishId(key));
    };

    const closeEditForm = (e) => {
        e.preventDefault();
        dispatch(setShowingEditForm(false));
        dispatch(clearDish());
        dispatch(setDishId(''));
    };

    const closeAddForm = () => {
        dispatch(setShowingAddForm(false));
        dispatch(clearDish());
        dispatch(setDishId(''));
    };

    return (
        <div className="DishesPage-container">
            <Modal show={showingAddForm}>
                <AddOrEditDishForm
                    isAddForm={true}
                    cancelClick={closeAddForm}
                />
            </Modal>
            <Modal show={showingEditForm}>
                <AddOrEditDishForm
                    isAddForm={false}
                    cancelClick={closeEditForm}
                />
            </Modal>
            <div className="DishesPage-background flex-row">
                <div className="DishesPage-column">
                    <DarkButton
                        btnColor={"btn-add-big"}
                        click={showAddForm}
                        label={'Add new Dish'}
                    />
                    {showError ? <p className='DishesPage-error-text'>{errorMessage}</p> : null}
                    <div className="content">
                        {loading ?
                            <Loader />
                            :
                            dishes === null || dishes === undefined ?
                                <p className='DishesPage-error-text'>No dishes yet</p>
                                :
                                Object.keys(dishes).map((key) => {
                                    return <Dish
                                        key={key}
                                        alt={key + 'img'}
                                        image={dishes[key].image}
                                        price={dishes[key].price}
                                        title={dishes[key].title}
                                        deleteIt={(e) => deleteIt(e, key)}
                                        showEditForm={(e) => showEditForm(e, key)}
                                    />
                                })}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DishesPage;