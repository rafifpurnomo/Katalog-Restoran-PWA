import DetailResto from '../view/detailResto';
import displayFavorites from '../view/displayFavorites';
import displayResto from '../view/displayResto';

const routes = {
  '/': displayResto,
  '/home': displayResto,
  '/detail/:id': DetailResto,
  '/favorite': displayFavorites,
};

export default routes;
