import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout";
import DishesPage from "./containers/DishesPage/DishesPage";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage";
import OrdersPage from "./containers/OrdersPage/OrdersPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<DishesPage />} />
          <Route path='/dishes' element={<DishesPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App;
