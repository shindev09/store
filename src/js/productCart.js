let numOfProduct = document.querySelector(".menu__cart");

function onLoadCart() {
    let cartNum = localStorage.getItem("cartNums");
    if (numOfProduct) {
        if (cartNum && cartNum > 0) {
            numOfProduct.textContent = cartNum;
            numOfProduct.style.display = "flex";
        } else {
            numOfProduct.style.display = "none";
        }
    }
}

function cartNum(product) {
    let btnBuy = document.querySelectorAll(".home-product-item__buy");
    console.log(btnBuy);
    for (let i = 0; i <= btnBuy.length; i++) {
        btnBuy[i].onclick = () => {
            let productNum = localStorage.getItem("cartNum");
            productNum = parseInt(productNum);
            if (productNum) {
                localStorage.setItem("cartNum", productNum + 1);
                numOfProduct.textContent = productNum + 1;
            } else {
                localStorage.setItem("cartNum", 1);
                numOfProduct.textContent = 1;
            }
            successToast("Thêm hàng vào giỏ thành công !!!");
            addProductToCart(product[i]);
        };
    }
}

function addProductToCart(product) {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        if (cartItems[`products ${product.id}`] == undefined) {
            cartItems = {
                ...cartItems,
                [`products ${product.id}`]: { ...product, inCart: 0 },
            };
        } else cartItems[`products ${product.id}`].inCart += 1;
    } else {
        cartItems = {
            [`products ${product.id}`]: { ...product, inCart: 1 },
        };
    }

    localStorage.setItem("productInCart", JSON.stringify(cartItems));
}
