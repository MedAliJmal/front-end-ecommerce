import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  DISLIKE_PRODUCT,
  EDIT_PRODUCT,
  LIKE_PRODUCT,
} from "../actionTypes/productsActionTypes";

const initialProducts = {
  Products: [
    {
      id: Math.random(),
      name: "Chaussures de running homme jogflow 500.1 gris foncé et jaune",
      price: 179,
      remise: 15,
      likes: [],
      finPrice: 152.15,
      prodIMG: [
        "https://contents.mediadecathlon.com/p2153215/k$3b160925ffdfa038d040aebd7d1208a8/chaussures-de-running-homme-jogflow-5001-noir.jpg?format=auto&quality=60&f=800x800",
        "https://contents.mediadecathlon.com/p2606890/k$30ab17a373351d4761e138a9c3be9b02/chaussures-de-running-homme-jogflow-5001-noir.jpg?format=auto&quality=60&f=800x800",
        "https://contents.mediadecathlon.com/p2153212/k$c95981f75630c5f7174f31a75ffea18f/chaussures-de-running-homme-jogflow-5001-noir.jpg?format=auto&quality=60&f=800x800",
      ],
      prodDescriptions:
        "Depuis de nombreuses années, des chercheurs à travers le monde étudient l’amorti de la chaussure sans savoir si un lien existe réellement entre les propriétés mécaniques amortissantes des chaussures et les blessures.En 2018, Decathlon a décidé de réaliser une étude comptabilisant 848 participants, 27 761 séances de courses à pieds, en partenariat avec le LIH (cf. Luxembourg Institute of Health",
    },
    {
      id: Math.random(),
      name: "T-shirt running respirant homme - dry+ ivoire",
      likes: [],

      price: 39,
      remise: 5,
      finPrice: 37.05,
      prodIMG: [
        "https://contents.mediadecathlon.com/p2160049/k$781227f82071a1aeb00e2fc3ca451d4c/tee-shirt-running-run-dry-blanc-casse-homme.jpg?format=auto&quality=60&f=800x800",
        "https://contents.mediadecathlon.com/p2160061/k$87f47cd600605f244bd610d3e10741a5/tee-shirt-running-run-dry-blanc-casse-homme.jpg?format=auto&quality=60&f=800x800",
        "https://contents.mediadecathlon.com/p2160052/k$ddc737c57db0216fe16b72ba4890658b/tee-shirt-running-run-dry-blanc-casse-homme.jpg?format=auto&quality=60&f=800x800",
      ],
      prodDescriptions:
        "Depuis de nombreuses années, des chercheurs à travers le monde étudient l’amorti de la chaussure sans savoir si un lien existe réellement entre les propriétés mécaniques amortissantes des chaussures et les blessures.En 2018, Decathlon a décidé de réaliser une étude comptabilisant 848 participants, 27 761 séances de courses à pieds, en partenariat avec le LIH (cf. Luxembourg Institute of Health",
    },
  ],
};

export const productReducer = (state = initialProducts, { type, payload }) => {
  switch (type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        Products: state.Products.filter((el) => el.id !== payload),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        Products: [...state.Products, payload],
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        Products: state.Products.map((el) =>
          el.id === payload.id ? payload : el
        ),
      };
    case LIKE_PRODUCT:
      return {
        ...state,
        Products: state.Products.map((el) =>
          el.id === payload.prodID
            ? { ...el, likes: [...el.likes, payload.user] }
            : el
        ),
      };
    case DISLIKE_PRODUCT:
      return {
        ...state,
        Products: state.Products.map((el) =>
          el.id === payload.prodID
            ? {
                ...el,
                likes: el.likes.filter((el) => el.id !== payload.userID),
              }
            : el
        ),
      };
    default:
      return state;
  }
};
