import { Routes, Route } from "react-router-dom";

import OfferItem from "../pages/OfferItem";
import LogIn from "../pages/LogIn";
import MyGifts from "../pages/MyGifts";
import SignIn from "../pages/SignIn";
import BirthList from "../pages/BirthList";

import CreateList from "../pages/CreateList";
import EditItem from "../pages/EditItem";
import AddItem from "../pages/AddItem";
import HomePage from "../pages/HomePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/birthlist" element={<BirthList />} />
      <Route path="/offeritem/:id" element={<OfferItem />} />
      <Route path="/mygifts" element={<MyGifts />} />

      <Route path="/createlist" element={<CreateList />} />
      <Route path="/additem/:list_ID" element={<AddItem />} />
      <Route path="/edititem/:id" element={<EditItem />} />
    </Routes>
  );
}

export default AppRoutes;
