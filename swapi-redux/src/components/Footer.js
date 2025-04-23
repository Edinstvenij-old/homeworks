import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearData } from "../redux/peopleSlice";
import { useLocation } from "react-router-dom";
import "./style/Footer.css";

const Footer = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.items);
  const location = useLocation();

  const handleClear = () => {
    dispatch(clearData());
  };

  // Проверяем, находится ли пользователь на странице с подробной информацией
  const isDetailPage = location.pathname.startsWith("/person/");

  // Не рендерим футер, если нет данных или на странице с подробной информацией
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
