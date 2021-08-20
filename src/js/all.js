function loadData() {
  var http = new XMLHttpRequest();

  http.open("GET", "http://localhost:3000/listProducts", true);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      renderProduct(JSON.parse(this.responseText));
    }
  };
}

loadData();

let perPage = 5;
let currentPage = 1;
let start = 0;
let end = perPage;
const btnNext = document.querySelector(".btn-next");

function renderProduct(products) {
  var listProduct = document.querySelector("#listProduct");
  var htmls = products.map(function (product, index) {
    if (index >= start && index < end) {
      return `
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
            </div>`;
    }
  });

  listProduct.innerHTML = htmls.join("");
}

btnNext.addEventListener("click", () => {
  currentPage++;
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
});

function pagination() {
  
}
