const modal = document.getElementById("cropModal");

const addBtn = document.getElementById("addCropBtn");

const closeBtn = document.getElementById("closeModal");

addBtn.onclick = () => {

    modal.style.display = "flex";

};

closeBtn.onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target == modal) {

        modal.style.display = "none";

    }

};