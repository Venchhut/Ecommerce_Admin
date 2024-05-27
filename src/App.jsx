import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Products from "./screens/Product/Products";
import Customer from "./screens/Customer/Customer";
import Order from "./screens/Order/Order";
import OrderDetails from "./components/Order/OrderDetails";
import Category from "./screens/Category/Category";
import NewProduct from "./screens/New Product/NewProduct";
import EditPrduct from "./screens/EditProduct/EditPrduct";
import Cookies from "js-cookie";
import Login from "./screens/Login/Login";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const token = Cookies.get("token");

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
            alt="Theme Icon"
          />
        </button>
        <Routes>
          {token ? (
            <Route element={<BaseLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<Products />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/editproduct/:id" element={<EditPrduct />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/category" element={<Category />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:orderId" element={<OrderDetails />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
