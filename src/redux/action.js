export const SetName = (test) => {
    return {
        type: "SET_TEST",
        payload: test
    }
}

export const SetSeciliKoltuklar = (seciliKoltuklar) => {
    return {
        type: "SET_SECILI_KOLTUKLAR",
        payload: seciliKoltuklar
    }
}

export const SetCurrentScreen = (currentScreen) => {
    return {
        type: "SET_CURRENT_SCREEN",
        payload: currentScreen
    }
}

export const SetShopCard = (shopCard) => {
    return {
        type: "SET_SHOP_CARD",
        payload: shopCard
    }
}
export const SetShopCardPrice = (shopCardPrice) => {
    return {
        type: "SET_SHOP_CARD_PRICE",
        payload: shopCardPrice
    }
}
export const SetUser = (user) => {
    return {
        type: "SET_USER",
        payload: user
    }
}
export const SetShopCardControl = (shopCardControl) => {
    return {
        type: "SET_SHOP_CARD_CONTROL",
        payload: shopCardControl
    }
}

export const SetUserTickets = (userTickets) => {
    return {
        type: "SET_USER_TICKETS",
        payload: userTickets
    }
}
export const SetEvents = (events) => {
    return {
        type: "SET_EVENTS",
        payload: events
    }
}
export const SetUserFavorites = (userFavorites) => {
    return {
        type: "SET_USER_FAVORITES",
        payload: userFavorites
    }
}