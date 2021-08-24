const baseURL = "http://localhost:3000";

let filter = { _page: 1, _limit: 5 };

window.addEventListener("DOMContentLoaded", () => {
    getProductLimit(filter);
    loadProductInCart();
    onLoadCart();
});

(function getAllProduct() {
    $.ajax({
        method: "GET",
        url: `${baseURL}/listProducts`,
        headers: { "Content-Type": "application/json" },
        success: function (data) {
            handlePagination(data, filter);
            handleCategoryProduct(data);
            handleRangePrice(data);
            handleChangeAZ();
            handleChangeLimit();
            handleChangePrice();
        },
    });
})();

function getProductLimit(params) {
    $.ajax({
        type: "GET",
        url: `${baseURL}/listProducts`,
        data: params,
        success: function (data) {
            renderProduct(data);
            handlecart(data);
        },
        error: function (err) {
            console.log("error : ", err);
        },
    });
}

//- render product -//

function renderProduct(data) {
    let product_list = data.map((product) => {
        return `
            <div class="col-lg-12 col-md-12 home-product-mobile">
                <div class="home-product-item"><img class="img-fluid" src="${product.img}"/>
                    <div class="home-product-item__content">
                        <h4 class="home-product-item__name">${product.title}</h4>
                        <div class="home-product-item__rating">
                            <div class="home-product-item__star">${product.rates}</div>
                            <span class="home-product-item__feedback">(${product.feedback} đánh giá)</span>
                        </div>
                        <p>${product.decription}</p>
                        <span class="home-product-item__price">${product.price}</span>
                        <div class="home-product-item__button">
                            <span class="home-product-item__buy">Mua ngay </span>
                            <a class="home-product-item__detail" href="./detail-product.html">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    let product_grid = data.map((product) => {
        return `
        <div class="col-lg-4 col-md-6 home-product-mobile">
            <div class="home-product-item grid-product"><img class="img-fluid grid-product-img" src="${product.img}"/>
            <span class="home-product-item__price">${product.price}</span>
            <h4 class="home-product-item__name">${product.title}</h4>
            <div class="home-product-item__rating">
                <div class="home-product-item__star">${product.rates}</div>
                <span class="home-product-item__feedback">(${product.feedback} đánh giá)</span>
            </div>
            <div class="home-product-item__button">
                <span class="home-product-item__buy">Mua ngay </span>
                <a class="home-product-item__detail" href="./detail-product.html">Xem chi tiết</a>
            </div>
            </div>
        </div>`;
    });

    $("#productList").html(product_list);
    $("#productGrid").html(product_grid);
}

//- categories -//

function handleCategoryProduct(data) {
    let listcategory = new Set(
        data.map((item) => {
            return item.category;
        })
    );
    let categories = [...listcategory];
    let newCategories = categories.map((category) => {
        return `<li class="category-item category-product__item"><img src="./assets/images/icon-gray.png" alt="icon")><a class="category-item__link category-product__item-link">${category}</a></li>`;
    });

    $(".category-product__list").html(newCategories);

    let categoryLink = document.querySelectorAll(".category-product__item");
    categoryLink.forEach((item) => {
        item.onclick = () => {
            filter = { ...filter, category: item.innerText };
            getProductLimit(filter);
        };
    });
}

//- filter range price -//
handleRangePrice = () => {
    let categoryLink = document.querySelectorAll(".category-price__item");
    categoryLink.forEach((item) => {
        item.onclick = () => {
            filter = {
                ...filter,
                price_lte: item.innerText,
            };
            getProductLimit(filter);
        };
    });
};

//- filter sort name product from A to Z -//
handleChangeAZ = (value) => {
    switch (value) {
        case "asc":
            filter = { ...filter, _sort: "title", _order: value };
            getProductLimit(filter);
            break;
        case "desc":
            filter = { ...filter, _sort: "title", _order: value };
            getProductLimit(filter);
            break;
        case "default":
            filter = { _page: 1, _limit: 5 };
            getProductLimit(filter);
            break;
    }
};

//- filter show quantity product -//
handleChangeLimit = (value) => {
    switch (value) {
        case "3":
            filter = { ...filter, _limit: 3, _order: value };
            getProductLimit(filter);
            break;
        case "6":
            filter = { ...filter, _limit: 6, _order: value };
            getProductLimit(filter);
            break;
        case "9":
            filter = { ...filter, _limit: 9, _order: value };
            getProductLimit(filter);
            break;
        case "default":
            filter = { _page: 1, _limit: 5 };
            getProductLimit(filter);
            break;
    }
};

//- filter show price incre/decre -//
handleChangePrice = (value) => {
    switch (value) {
        case "asc":
            filter = { ...filter, _sort: "price", _order: value };
            getProductLimit(filter);
            break;
        case "desc":
            filter = { ...filter, _sort: "price", _order: value };
            getProductLimit(filter);
            break;

        case "default":
            filter = { _page: 1, _limit: 5 };
            getProductLimit(filter);
            break;
    }
};
