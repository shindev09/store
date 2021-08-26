let numOfProduct = document.querySelector(".cart-quantity");

//- load number of cart
function onLoadCart() {
    let cartNum = localStorage.getItem("cartNum");
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

//- add product localStorage
function addProductToCart(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        if (cartItems[`product ${product.id}`] == undefined) {
            cartItems = {
                ...cartItems,
                [`product ${product.id}`]: { ...product, inCart: 1 },
            };
        } else cartItems[`product ${product.id}`].inCart += 1;
    } else {
        cartItems = {
            [`product ${product.id}`]: { ...product, inCart: 1 },
        };
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//- total price localStorage
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
    let totalPay = document.querySelector(".total-pay");
    let total = document.querySelector(".total");
    let totalVAT = 0.1;
    let layoutCart = "";
    let listCart = document.querySelector(".menu__cart");
    let tableCartElement = document.querySelector(".cart-body__list");
    let productTableCart = "";

    if (cartItem && Object.values(cartItem).length !== 0) {
        let allProduct = Object.values(cartItem);
        allProduct.map((item) => {
            layoutCart += `
                <div class="menu__cart__item"> 
                    <a href="./cart.html" class="menu__cart__image">
                        <img src="${item.img}" alt="cart-img">
                    </a>
                    <a href="./cart.html" class="menu__cart__content">
                        <h4>${item.title}</h4>
                        <div class="cart__item"> 
                            <span>${item.inCart}</span>
                            <span>x</span>
                            <span>${item.price.toLocaleString(
                                "vi-VN"
                            )}<sup>Đ</sup></span>
                        </div>
                    </a>
                    <i class="remove-product fas fa-times"></i>
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
                        <span class="cart-item__price">${item.price.toLocaleString(
                            "vi-VN"
                        )}<sup>Đ</sup></span>
                    </td>
                    <td class="cart-item">
                        <input type="number" min="0" value="${
                            item.inCart
                        }" class="cart-item__amount"></input>
                    </td>
                    <td class="cart-item">
                        <span class="cart-item__total" data-price="${parseInt(
                            item.price * item.inCart
                        )}">${parseInt(item.price * item.inCart).toLocaleString(
                "vi-VN"
            )}<sup>Đ</sup></span>
                    </td>
                    <td class="cart-item">
                        <span 
                            data-toggle="modal" 
                            data-target="#modal${item.id}">
                            <i class="fas fa-times"></i>
                        </span>
                        <div class="modal fade mt-5 p-5 " id='modal${
                            item.id
                        }' tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content mt-5">
                                    <div class="modal-header">
                                        <span id="exampleModalLabel">Bạn muốn bỏ sản phẩm <span class="modal-title text-danger">${
                                            item.title
                                        }</span> ?</span>
                                        <div class="btn-close">
                                            <button class="close" type='button' data-dismiss='modal' aria-label='Close'>
                                                <span aria-hidden='true'>&times; </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="modal-footer py-4">
                                        <button type="button" class="btn btn-no" data-dismiss="modal">Không</button>
                                        <button type="button" class="btn btn-yes" data-dismiss="modal">Có</button>
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
                    <div class="cart__total__content"> <span>tổng tiền: </span><span>${totalPrice.toLocaleString(
                        "vi-VN"
                    )}<sup>Đ</sup></span></div>
                    <a href="./cart.html">thanh toán</a>
                    </div>`)
            : "";
        tableCartElement ? (tableCartElement.innerHTML = productTableCart) : "";

        //- handle incre/decre quantity product
        let productAmount = document.querySelectorAll(".cart-item__amount");
        let productTotal = document.querySelectorAll(".cart-item__total");

        for (let i = 0; i < productAmount.length; i++) {
            productAmount[i].addEventListener("change", () => {
                if (productAmount[i].value > 0) {
                    productTotal[i].innerHTML = `${(
                        parseInt(allProduct[i].price) *
                        parseInt(productAmount[i].value)
                    ).toLocaleString("vi-VN")}<sup>Đ</sup>`;
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
                    total.innerHTML = `${totalPriceChange.toLocaleString(
                        "vi-VN"
                    )}<sup>Đ</sup>`;
                    totalPays = totalPriceChange - totalPriceChange * totalVAT;

                    totalPay.innerHTML = `${totalPays.toLocaleString(
                        "vi-VN"
                    )}<sup>Đ</sup>`;

                    totalPrice = totalPrices.reduce(
                        (acccumulator, curentValue) => {
                            return acccumulator + curentValue;
                        },
                        0
                    );
                    localStorage.setItem("totalPrice", totalPrice);
                } else if (productAmount[i].value <= 0) {
                    productAmount[i].value = 1;
                    errorToast("Số lượng sản phẩm không thể nhỏ hơn 1");
                }
            });
        }

        //- remove product in cart navbar
        let removeProduct = document.querySelectorAll(".remove-product");

        for (let i = 0; i < removeProduct.length; i++) {
            removeProduct[i].onclick = () => {
                handleRemoveProduct(i);
            };
        }

        //- remove product in cart table
        let btnRemove = document.querySelectorAll(".btn-yes");

        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].onclick = () => {
                handleRemoveProduct(i);
            };
        }
    } else {
        tableCartElement
            ? (tableCartElement.innerHTML = `<span class="no-item">Hiện tại không có sản phẩm nào !!!</span>`)
            : "";

        listCart
            ? (listCart.innerHTML = `<span class="no-item-cart"><img src="./assets/images/no-cart.png" alt="no-cart" > <span class="no-item-span">Hiện tại không có sản phẩm nào !!!</span></span>`)
            : "";
    }

    //- Button pay
    let btnPay = document.querySelector(".cart-pay");
    if (totalPrice == 0) {
        btnPay
            ? ((btnPay.style.backgroundColor = "#7f8c8d"),
              (btnPay.style.pointerEvents = "none"))
            : "";
    }
}

//- handle remove product
function handleRemoveProduct(index) {
    let cartItem = JSON.parse(localStorage.getItem("productsInCart"));
    let totalPrice = parseInt(localStorage.getItem("totalPrice"));
    let cartNumber = localStorage.getItem("cartNum");
    cartItem = Object.values(cartItem);
    cartItem = { ...cartItem };
    totalPrice = totalPrice - cartItem[index].price * cartItem[index].inCart;
    localStorage.setItem("totalPrice", totalPrice);

    if (cartItem[index].inCart == 0) {
        cartNumber = cartNumber - 1;
    } else {
        cartNumber = cartNumber - cartItem[index].inCart;
    }
    localStorage.setItem("cartNum", cartNumber);

    delete cartItem[index];

    cartItem = { ...cartItem };

    localStorage.setItem("productsInCart", JSON.stringify(cartItem));

    loadProductInCart();
    onLoadCart();
    onLoadPrice();
}

//- load price
function onLoadPrice() {
    let totalPrice = localStorage.getItem("totalPrice");
    let price = document.querySelector(".total");
    let pricePay = document.querySelector(".total-pay");
    let totalVAT = 0.1;
    totalPays = totalPrice - totalPrice * totalVAT;
    price
        ? (price.innerHTML = ` ${
              totalPrice > 0 ? parseInt(totalPrice).toLocaleString("vi-VN") : 0
          }<sup>Đ</sup>`)
        : "";

    pricePay
        ? (pricePay.innerHTML = `${
              totalPays > 0 ? parseInt(totalPays).toLocaleString("vi-VN") : 0
          }<sup>Đ</sup>`)
        : "";
}
