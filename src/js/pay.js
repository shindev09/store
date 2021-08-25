//- Handle payment in data
let products = localStorage.getItem("productsInCart");
products = JSON.parse(products);
let totalPrices = localStorage.getItem("totalPrice");
totalPrices = JSON.parse(totalPrices);
let totalVAT = 0.1;
totalPays = totalPrices - totalPrices * totalVAT;
let overviewTotal = document.querySelector(".overview-total");
let overview = document.querySelector(".overview");
let overviewElement = "";

//- render overview product
if (products && overview) {
    products = Object.values(products);
    products.map((item) => {
        overviewElement += `
            <table class="table table-bordered cart-container mt-3">
                    <tr >
                        <td class="cart-item">
                            <img class="img-fluid cart-item__img" src="${
                                item.img
                            }">
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
                            <span class="cart-item__amount">${
                                item.inCart
                            }</span>
                        </td>
                        <td class="cart-item">
                            <span class="cart-item__total" data-price="${parseInt(
                                item.price * item.inCart
                            )}">${parseInt(
            item.price * item.inCart
        ).toLocaleString("vi-VN")}<sup>Đ</sup></span>
                        </td>
                    </tr>
            </table>`;
    });
    overview.innerHTML = overviewElement;
}

if (totalPays && overviewTotal) {
    overviewTotal.innerHTML = `
    <div class="cart-total-container col-lg-12 px-0">
        <div class="cart-total-title">
            <span>Tổng tiền:</span>
            <span>thuế(vat):</span>
            <span>thanh toán:</span>
        </div>
        <div class="cart-total-content">
            <span class="total">${totalPrices.toLocaleString(
                "vi-VN"
            )}<sup>Đ</sup></span>
            <span class="total-VAT">10%</span>
            <span class="total-pay">${totalPays.toLocaleString(
                "vi-VN"
            )}<sup>Đ</sup></span>
        </div>
    </div>`;
}

//- get data POST db.json
let order = {};
let formPayment = document.querySelectorAll(".form-payment");
//- validate form
let submitForm = document.querySelector(".form-validate");
let username = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let address = document.querySelector("#address");
let regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let spanName = document.querySelector(".validate-name");
let spanEmail = document.querySelector(".validate-email");
let spanPhone = document.querySelector(".validate-phone");
let spanAddress = document.querySelector(".validate-address");

submitForm
    ? submitForm.addEventListener("submit", (e) => {
          e.preventDefault();
          handleValidate();
      })
    : "";
function handleValidate() {
    //- username
    if (username.value == "") {
        username.style.borderColor = "#ff3838";
        spanName.style.display = "block";
        spanName.style.color = "#ff3838";
        spanName.innerHTML = "Tên không được bỏ trống!";
    }
    //- email
    else if (email.value == "") {
        email.style.borderColor = "#ff3838";
        spanEmail.style.display = "block";
        spanEmail.style.color = "#ff3838";
        spanEmail.innerHTML = "Email không được bỏ trống!";
    }
    //- phone
    else if (phone.value == "") {
        phone.style.borderColor = "#ff3838";
        spanPhone.style.display = "block";
        spanPhone.style.color = "#ff3838";
        spanPhone.innerHTML = "Số điện thoại không được bỏ trống!";
    } else if (address.value == "") {
        address.style.borderColor = "#ff3838";
        spanAddress.style.display = "block";
        spanAddress.style.color = "#ff3838";
        spanAddress.innerHTML = "Địa chỉ không được bỏ trống!";
    } else {
        formPayment.forEach((item) => {
            if (item.value != "") {
                order = {
                    [item.id]: item.value,
                    ...order,
                    order: Object.values(products),
                    total: totalPays,
                };
            }
        });
        $.ajax({
            method: "POST",
            url: `${baseURL}/payments`,
            data: JSON.stringify(order),
            contentType: "application/json",
            dataType: "dataType",
            success: function (success) {
                console.log("success: ", success);
            },
            error: function (err) {
                console.log("error: ", err);
            },
        });
        successToast("Cảm ơn bạn đã mua hàng của shop !!!");
        localStorage.clear();
        setTimeout(() => {
            window.location = "http://localhost:3001/list-product.html";
        }, 2000);
    }
}

//- validate form
if (username) {
    username.oninput = () => {
        if (isNaN(username.value)) {
            username.style.borderColor = "#32ff7e";
            spanName.style.display = "block";
            spanName.style.color = "#32ff7e";
            spanName.innerHTML = "Tên hợp lệ";
        }
    };
}
if (email) {
    email.oninput = () => {
        if (!regex.test(email.value) && email.value != "") {
            email.style.borderColor = "#ff3838";
            spanEmail.style.display = "block";
            spanEmail.style.color = "#ff3838";
            spanEmail.innerHTML = "Email không hợp lệ!";
        } else {
            email.style.borderColor = "#32ff7e";
            spanEmail.style.display = "block";
            spanEmail.style.color = "#32ff7e";
            spanEmail.innerHTML = "Hợp lệ";
        }
    };
}

if (phone)
    phone.oninput = () => {
        if (phone.value.length < 10) {
            phone.style.borderColor = "#ff3838";
            spanPhone.style.display = "block";
            spanPhone.style.color = "#ff3838";
            spanPhone.innerHTML = "Số điện thoại không hợp lệ";
        } else {
            phone.style.borderColor = "#32ff7e";
            spanPhone.style.display = "block";
            spanPhone.style.color = "#32ff7e";
            spanPhone.innerHTML = "Số điện thoại hợp lệ";
        }
    };
if (address)
    address.oninput = () => {
        if (phone.value) {
            phone.style.borderColor = "#32ff7e";
            spanAddress.style.display = "block";
            spanAddress.style.color = "#32ff7e";
            spanAddress.innerHTML = "Địa chỉ hợp lệ";
        }
    };
