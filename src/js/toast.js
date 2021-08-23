const successToast = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        backgroundColor: "#32ff7e",
    }).showToast();
};

const errorToast = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        backgroundcolor: "#ff4d4d",
    }).showToast();
};
