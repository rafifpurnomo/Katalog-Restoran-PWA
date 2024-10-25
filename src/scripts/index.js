import "regenerator-runtime";

import "../styles/main.css";
import "../styles/main.responsive.css";
import "../styles/detailResto.css";
import "../styles/detailResto.Responsive.css";
import "../styles/favResto.css";
import "../styles/searchBar.css";
import "../styles/loading.css";

import "./view/navbar";
import "./view/zerosection";
import "./view/searchBar";
import { displayRestoran } from "./view/displayResto";
import "./view/detailResto";
import "./view/displayFavorites";
import "./view/loading";

import swRegist from "./config/sw";

document.addEventListener("DOMContentLoaded", () => {
  swRegist();
  displayRestoran();
});

