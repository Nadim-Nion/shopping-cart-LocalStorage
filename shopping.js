/*------------------------------------------------------------------------------------- 
    Retrieve value of Key-Value pair from Local Storage and display 'em in the UI
-------------------------------------------------------------------------------------*/
const displayLocalStorageCart = () => {
    const cart = getCart();
    // console.log(cart);
    for (const name in cart) {
        displayProduct(name);
    }
}



const addItem = () => {
    const nameField = document.getElementById('product-name');
    const name = nameField.value;

    /* Will not add any item in the Local Storage without giving anything in the search box */
    if (!name) {
        return;
    }

    /* Display in the UI */
    displayProduct(name);

    /* Add to Local Storage */
    addProductToCart(name);

    /* Clear Search item */
    nameField.value = '';
}

const displayProduct = name => {
    const ui = document.getElementById('products');
    const li = document.createElement('li');
    li.innerText = name;
    ui.appendChild(li);
}

const getCart = () => {
    const cart = localStorage.getItem('cart');
    let cartObj;
    if (cart) {
        cartObj = JSON.parse(cart);
    }
    else {
        cartObj = {};
    }
    return cartObj;
}


const addProductToCart = name => {
    const cart = getCart();
    // cart.name = 1; we can't add/assign any value to the variable in the empty object in this way
    // cart[name] = 1;

    /* Show duplicate value in the Local Storage and don't replace them */
    if (cart[name]) {
        cart[name] = cart[name] + 1;
    }
    else {
        cart[name] = 1;
    }

    // console.log(cart);
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}


const placeOrder = () => {
    document.getElementById('products').textContent = '';
    localStorage.removeItem('cart');
}


/*---------------------------------------------------------------------------------------- 
    To handle this error "ReferenceError: Cannot access 'getCart' before initialization" 
-----------------------------------------------------------------------------------------*/
displayLocalStorageCart();