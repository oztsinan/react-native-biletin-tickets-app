const INITAL_STATE = {
    test: 'sinan',
    seciliKoltuklar: [],
    currentScreen: '',
    shopCard: [
        {
            key: 24234,
            data:
            {
                koltukNumarasi: 20
            }
        }
    ],
    shopCardPrice: 0,
    user: [],
    userTickets: [],
    shopCardControl: [],
    events: [],
    userFavorites: []

}

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, test: action.payload }
        case "SET_SECILI_KOLTUKLAR":
            return { ...state, seciliKoltuklar: action.payload }
        case "SET_CURRENT_SCREEN":
            return { ...state, currentScreen: action.payload }
        case "SET_SHOP_CARD":
            return { ...state, shopCard: action.payload }
        case "SET_SHOP_CARD_PRICE":
            return { ...state, shopCardPrice: action.payload }
        case "SET_SHOP_CARD_CONTROL":
            return { ...state, shopCardControl: action.payload }
        case "SET_USER":
            return { ...state, user: action.payload }
        case "SET_USER_TICKETS":
            return { ...state, userTickets: action.payload }
        case "SET_EVENTS":
            return { ...state, events: action.payload }
        case "SET_USER_FAVORITES":
            return { ...state, userFavorites: action.payload }
        default:
            return state
    }
}