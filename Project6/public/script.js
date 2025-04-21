document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector("#workshops .modal");
    const modalImg = document.querySelector("#workshops .modal-content");
    const images = document.querySelectorAll("#workshops .workshop-img");
    const closeBtn = document.querySelector("#workshops .close");

    images.forEach(img => {
        img.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents bubbling up to the workshops button
            modal.style.display = "flex"; // Show modal
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Hide modal when clicking close
    });

    // Close modal when clicking outside the image but inside the modal
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});


