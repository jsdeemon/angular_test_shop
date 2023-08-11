function getCartItems() {
    const getCartItems = localStorage.getItem('cart')
    return getCartItems;
}

getCartItems()