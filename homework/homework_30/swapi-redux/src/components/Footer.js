import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../redux/peopleSlice";
import { useMatch } from "react-router-dom";
import "./style/Footer.css";

const Footer = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.items);

  const handleClear = () => {
    dispatch(clearData());
    console.log("Очистка данных выполнена");
  };

  const isDetailPage = useMatch("/person/:personId");

  if (people.length === 0 || isDetailPage) return null;

  return (
    <footer className="footer">
      <button className="clear-button" onClick={handleClear}>
        Очистити дані
      </button>
    </footer>
  );
};

export default Footer;
