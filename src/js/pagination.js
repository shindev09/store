function renderPagination(data, params) {
    let totalPages = parseInt(data.length / params._limit);

    let paginationList = "";
    for (let page = 1; page <= totalPages; page++) {
        paginationList += `
        <li 
            class="${
                page === filter._page ? " page-item active " : "page-item"
            }"
            value= ${page}>
            <a class="page-link">${page}</a>
        </li>`;
    }

    let productFilter = document.querySelector(".home-product__pagination");

    productFilter
        ? (productFilter.innerHTML = `
            <ul class='pagination__list'>
                <li id= "btnPrev" value= "${
                    params._page
                }" onclick= handleBtnPrevious(value)>
                    <a class='page-link' >
                        <span aria-hidden='true' >Trang trước</span>
                    </a>
                </li>
                ${paginationList}
                <li value= "${
                    totalPages - 1
                }" id="btnNext" onclick= handleBtnNext(value)>
                    <a class='page-link'>
                        <span aria-hidden='true'>Trang sau</span>
                    </a>
                </li>
            </ul>`)
        : "";

    let btnPrev = document.querySelector("#btnPrev");
    let btnNext = document.querySelector("#btnNext");
    const paginationItem = document.querySelectorAll(".page-item");

    paginationItem.forEach((item) => {
        item.onclick = () => {
            filter = { ...filter, _page: item.value };
            getProductLimit(filter);
            localStorage.setItem("currentPage", item.value);
            document
                .querySelector(".page-item.active")
                .classList.remove("active");
            item.classList.add("active");
            filter._page === 1
                ? (btnPrev.value = 1)
                : (btnPrev.value = filter._page - 1);
            filter._page === totalPages
                ? (btnNext.value = totalPages)
                : (btnNext.value = filter._page + 1);
        };
    });

    handleBtnPrevious = (value) => {
        parseInt(value) > 1 ? (btnPrev.value = value - 1) : "";
        paginationItem.forEach((item) => {
            if (item.value !== value) {
                item.classList.remove("active");
            } else {
                item.classList.add("active");
                filter = { ...filter, _page: value };
                getProductLimit(filter);
            }
        });

        if (value === 1) {
            btnNext.value = value + 1;
        }
    };

    handleBtnNext = (value) => {
        parseInt(value) < totalPages ? (btnNext.value = value + 1) : "";
        paginationItem.forEach((item) => {
            if (item.value !== value) {
                item.classList.remove("active");
            } else {
                item.classList.add("active");
                filter = { ...filter, _page: value };
                getProductLimit(filter);
            }
        });
        if (value === totalPages) {
            btnPrev.value = value - 1;
        }
    };

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

    handleChangeLimit = (value) => {
        switch (value) {
            case "3":
                filter = { ...filter, _limit: 3, _order: value };
                console.log(filter);
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
}
