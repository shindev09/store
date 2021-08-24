let numOfProduct = document.querySelector(".cart-quantity");

//- load number of cart
function onLoadCart() {
    let cartNum = localStorage.getItem("cartNums");
    if (numOfProduct) {
        if (cartNum && cartNum > 0) {
            numOfProduct.textContent = cartNum;
            numOfProduct.style.display = "block";
        } else {
            numOfProduct.innerHTML = 0;
        }
    }
}

//- handle cart, add product, total price, load
function handlecart(product) {
    let btnBuy = document.querySelectorAll(".home-product-item__buy");
    for (let i = 0; i < btnBuy.length; i++) {
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
            totalPrice(product[i]);
            loadProductInCart();
        };
    }
}

//- add product to cart navbar
function addProductToCart(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        if (cartItems[`products ${product.id}`] == undefined) {
            cartItems = {
                ...cartItems,
                [`products ${product.id}`]: { ...product, inCart: 1 },
            };
        } else cartItems[`products ${product.id}`].inCart += 1;
    } else {
        cartItems = {
            [`products ${product.id}`]: { ...product, inCart: 1 },
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//- total price
function totalPrice(product) {
    let cartPrice = localStorage.getItem("totalPrice");
    if (cartPrice) {
        cartPrice = parseInt(cartPrice);
        localStorage.setItem("totalPrice", cartPrice + parseInt(product.price));
    } else {
        localStorage.setItem("totalPrice", parseInt(product.price));
    }
}

//- load product in cart
function loadProductInCart() {
    let cartItem = localStorage.getItem("productsInCart");
    cartItem = JSON.parse(cartItem);
    let totalPrice = localStorage.getItem("totalPrice");
    totalPrice = parseInt(totalPrice);
    let elementTotalPrice = document.querySelector(".total");
    let layoutCart = "";
    let listCart = document.querySelector(".menu__cart");
    let tableCartElement = document.querySelector(".cart-body__list");
    let productTableCart = "";
    if (cartItem && Object.values(cartItem).length !== 0) {
        let allProduct = Object.values(cartItem);
        allProduct.map((item) => {
            layoutCart += `
                <div class="menu__cart__item"> 
                    <div class="menu__cart__image">
                        <img src="${item.img}" alt="cart-img">
                    </div>
                    <div class="menu__cart__content">
                        <h4>${item.title}</h4>
                        <div class="cart__item"> 
                            <span>${item.inCart}</span>
                            <span>x</span>
                            <span>${item.price}</span>
                        </div>
                        <i class="fas fa-times"></i>
                    </div>
                </div>
            `;
            productTableCart += `
                <tr>
                    <th class="cart-item" scope="row">${item.id}</th>
                    <td class="cart-item">
                        <img class="img-fluid cart-item__img" src="${item.img}">
                    </td>
                    <td class="cart-item">
                        <span class="cart-item__title">${item.title}</span>
                    </td>
                    <td class="cart-item">
                        <span class="cart-item__price">${item.price}</span>
                    </td>
                    <td class="cart-item">
                        <input type="number" min="0" value="${
                            item.inCart
                        }" class="cart-item__amount"></input>
                    </td>
                    <td class="cart-item">
                        <span class="cart-item__total" data-price="${parseInt(
                            item.price * item.inCart
                        )}">${parseInt(item.price * item.inCart)}</span>
                    </td>
                    <td class="cart-item">
                        <span 
                            data-bs-toggle="modal" 
                            data-bs-target="#modal${item.id}">
                            <i class="fas fa-times"></i>
                        </span>
                        <div class="modal fade mt-5 p-5 " id='modal${
                            item.id
                        }' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog ">
                                <div class="modal-content mt-5">
                                    <div class="modal-header">
                                        <h2 class="modal-title text-danger" id="exampleModalLabel">Bạn muốn bỏ sản phẩm này ?</h2>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>${item.title}</p>
                                    </div>
                                    <div class="modal-footer py-4">
                                        <button type="button" class="btn btn-no" data-bs-dismiss="modal">Không</button>
                                        <button type="button" class="btn btn-yes" data-bs-dismiss="modal">Có</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`;
        });

        listCart
            ? (listCart.innerHTML = `
                    ${layoutCart}
                    <div class="menu__cart__total">
                    <div class="cart__total__content"> <span>tổng tiền: </span><span>${totalPrice}</span></div>
                    <button>thanh toán</button>
                    </div>`)
            : "";
        tableCartElement ? (tableCartElement.innerHTML = productTableCart) : "";

        //- handle incre/decre quantity product
        let productAmount = document.querySelectorAll(".cart-item__amount");
        let productTotal = document.querySelectorAll(".cart-item__total");

        for (let i = 0; i < productAmount.length; i++) {
            productAmount[i].addEventListener("change", () => {
                if (productAmount[i].value > 0) {
                    productTotal[i].innerHTML = `${
                        parseInt(allProduct[i].price) *
                        parseInt(productAmount[i].value)
                    }`;
                    productTotal[i].setAttribute(
                        "data-price",
                        parseInt(allProduct[i].price) *
                            parseInt(productAmount[i].value)
                    );
                    allProduct[i].inCart = parseInt(productAmount[i].value);
                    localStorage.setItem(
                        "productsInCart",
                        JSON.stringify(cartItem)
                    );

                    //- total price in cart
                    let totalPrices = [];
                    for (let i = 0; i < productTotal.length; i++) {
                        totalPrices.push(
                            parseInt(
                                parseInt(
                                    productTotal[i].getAttribute("data-price")
                                )
                            )
                        );
                    }

                    let totalPriceChange = totalPrices.reduce(
                        (acccumulator, curentValue) => {
                            return acccumulator + curentValue;
                        },
                        0
                    );

                    elementTotalPrice.innerHTML = totalPriceChange;
                    totalPrice = totalPrices.reduce(
                        (acccumulator, curentValue) => {
                            return acccumulator + curentValue;
                        },
                        0
                    );

                    localStorage.setItem("totalPrice", totalPrice);
                } else if (productAmount[i].value == 0) {
                    //-...
                } else if (productAmount[i].value < 0) {
                    productAmount[i].value = 1;
                    errorToast("Số lượng sản phẩm không thể nhỏ hơn 0");
                }
            });
        }
    }
}

//- handle remove product
function handleRemoveProduct() {
    let cartItem = JSON.parse(localStorage.getItem("productsInCart"));
    let totalPrice = parseInt(localStorage.getItem("totalPrice"));
    let cartNumber = localStorage.getItem("cartNumbers");

    cartItem = Object.values(cartItem);
    cartItem = { ...cartItem };
}
handleRemoveProduct();
