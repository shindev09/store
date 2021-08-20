const baseURL = "http://localhost:3000";

let filter = { _page: 1, _limit: 5 };

window.addEventListener("DOMContentLoaded", () => {
    getProductLimit(filter);
});

(function getAllProduct() {
    $.ajax({
        method: "GET",
        url: `${baseURL}/listProducts`,
        headers: { "Content-Type": "application/json" },
        success: function (data, status, res) {
            renderPagination(data, filter);
        },
    });
})();

function getProductLimit(params) {
    $.ajax({
        type: "GET",
        url: `${baseURL}/listProducts`,
        data: params,
        success: function (data, status, res) {
            renderProduct(data);
            // cartNumber(data);
        },
        error: function (err) {
            console.log(err);
        },
    });
}

function renderProduct(data) {
    let product_list = data.map((product, index) => {
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
                            <a class="home-product-item__buy" href="./cart.html">Mua ngay </a>
                            <a class="home-product-item__detail" href="./detail-product.html">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
            </div>`;
    });

    let product_grid = data.map((product, index) => {
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
                <a class="home-product-item__buy" href="./cart.html">Mua ngay </a>
                <a class="home-product-item__detail" href="./detail-product.html">Xem chi tiết</a>
            </div>
            </div>
        </div>`;
    });

    $("#productList").html(product_list);
    $("#productGrid").html(product_grid);
}
