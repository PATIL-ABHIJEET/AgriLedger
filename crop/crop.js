const modal = document.getElementById("cropModal");
const addBtn = document.getElementById("addCropBtn");
const closeBtn = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveCrop");

const cropGrid = document.getElementById("cropGrid");

addBtn.onclick = () => {
    modal.style.display = "flex";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
};

saveBtn.onclick = () => {

    const name = document.getElementById("cropName").value.trim();
    const area = document.getElementById("cropArea").value.trim();
    const season = document.getElementById("cropSeason").value.trim();
    const yieldValue = document.getElementById("cropYield").value.trim();

    if(name === "" || area === "" || season === "" || yieldValue === ""){
        alert("Please fill all fields.");
        return;
    }

    const card = document.createElement("div");

    card.className = "crop-card";

    card.innerHTML = `
        <div class="card-top">
            <div class="crop-icon">🌱</div>
            <span class="status active">Growing</span>
        </div>

        <h2>${name}</h2>

        <div class="info">
            <p><i class="fa-solid fa-location-dot"></i> Area : ${area} Acres</p>
            <p><i class="fa-solid fa-calendar"></i> Season : ${season}</p>
            <p><i class="fa-solid fa-chart-line"></i> Expected Yield : ${yieldValue}</p>
        </div>

        <div class="progress-box">

            <div class="progress-text">

                <span>Growth</span>

                <span>0%</span>

            </div>

            <div class="progress">

                <div class="progress-fill" style="width:0%;"></div>

            </div>

        </div>

        <div class="buttons">
            <button class="edit">
                <i class="fa-solid fa-pen"></i> Edit
            </button>

            <button class="delete">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        </div>
    `;

    cropGrid.appendChild(card);
    const deleteBtn = card.querySelector(".delete");

deleteBtn.addEventListener("click", () => {

    if(confirm("Are you sure you want to delete this crop?")){

        card.remove();

    }

});


    modal.style.display = "none";

    document.getElementById("cropName").value = "";
    document.getElementById("cropArea").value = "";
    document.getElementById("cropSeason").value = "";
    document.getElementById("cropYield").value = "";
};

document.querySelectorAll(".delete").forEach(button => {

    button.addEventListener("click", function(){

        if(confirm("Delete this crop?")){

            this.closest(".crop-card").remove();

        }

    });

});