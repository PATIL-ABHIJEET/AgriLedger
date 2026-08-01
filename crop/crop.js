const modal = document.getElementById("cropModal");
const addBtn = document.getElementById("addCropBtn");
const closeBtn = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveCrop");

const cropGrid = document.getElementById("cropGrid");
const growthSlider = document.getElementById("cropGrowth");
const growthValue = document.getElementById("growthValue");

growthSlider.oninput = () => {
    growthValue.innerHTML = growthSlider.value + "%";
};

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
    const growth = document.getElementById("cropGrowth").value;
    const status = document.getElementById("cropStatus").value;

    if (name === "" || area === "" || season === "" || yieldValue === "") {
        alert("Please fill all fields.");
        return;
    }

    const card = document.createElement("div");
    card.className = "crop-card";

    card.innerHTML = `
        <div class="card-top">
            <div class="crop-icon">${getCropIcon(name)}</div>
            <span class="status ${
                status === "Growing"
                    ? "active"
                    : status === "Ready for Harvest"
                    ? "harvest"
                    : "completed"
            }">
                ${status}
            </span>
        </div>

        <h2>${name}</h2>

        <div class="info">
            <p><i class="fa-solid fa-location-dot"></i> Area : ${area} Acres</p>
            <p><i class="fa-solid fa-calendar"></i> Season : ${season}</p>
            <p><i class="fa-solid fa-chart-line"></i> Expected Yield : ${yieldValue} Tons</p>
        </div>

        <div class="progress-box">
            <div class="progress-text">
                <span>Growth</span>
                <span>${growth}%</span>
            </div>
            <div class="progress">
                <div class="progress-fill" style="width:${growth}%"></div>
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
    saveData();

    // Attach Edit button
    attachEdit(card.querySelector(".edit"));

    // Attach Delete button
    const deleteBtn = card.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this crop?")) {
            card.remove();
            saveData();
        }
    });

    modal.style.display = "none";
    showToast("Crop Added Successfully");
    saveData();

    document.getElementById("cropName").value = "";
    document.getElementById("cropArea").value = "";
    document.getElementById("cropSeason").value = "";
    document.getElementById("cropYield").value = "";
};

document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", function () {
        if (confirm("Delete this crop?")) {
            this.closest(".crop-card").remove();
            saveData();
        }
    });
});

const search = document.getElementById("searchCrop");
search.addEventListener("keyup", () => {
    const value = search.value.toLowerCase();
    const cards = document.querySelectorAll(".crop-card");

    cards.forEach((card) => {
        const cropName = card.querySelector("h2").textContent.toLowerCase();
        if (cropName.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

function getCropIcon(name) {
    switch (name.toLowerCase()) {
        case "wheat":
        case "rice":
            return "🌾";
        case "cotton":
            return "🌿";
        case "maize":
            return "🌽";
        case "potato":
            return "🥔";
        case "tomato":
            return "🍅";
        case "onion":
            return "🧅";
        case "sugarcane":
            return "🎋";
        default:
            return "🌱";
    }
}

const filter = document.getElementById("seasonFilter");
filter.addEventListener("change", () => {

    const value = filter.value.toLowerCase();

    document.querySelectorAll(".crop-card").forEach(card => {

        const season = card.querySelectorAll(".info p")[1]
            .textContent
            .toLowerCase();

        if (value === "all seasons" || season.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}

function attachEdit(button) {
    button.addEventListener("click", function () {
        const card = this.closest(".crop-card");
        const name = card.querySelector("h2").innerText;
        const area = card
            .querySelectorAll(".info p")[0]
            .innerText.replace("Area : ", "")
            .replace(" Acres", "");
        const season = card
            .querySelectorAll(".info p")[1]
            .innerText.replace("Season : ", "");
        const yieldValue = card
            .querySelectorAll(".info p")[2]
            .innerText.replace("Expected Yield : ", "")
            .replace(" Tons", "");

        document.getElementById("cropName").value = name;
        document.getElementById("cropArea").value = area;
        document.getElementById("cropSeason").value = season;
        document.getElementById("cropYield").value = yieldValue;

        card.remove();
        saveData();

        modal.style.display = "flex";
    });
}

function saveData() {
    localStorage.setItem("cropData", cropGrid.innerHTML);
}

function loadData() {
    const data = localStorage.getItem("cropData");

    if (data) {
        cropGrid.innerHTML = data;

        document.querySelectorAll(".delete").forEach((btn) => {
            btn.addEventListener("click", function () {
                if (confirm("Delete this crop?")) {
                    this.closest(".crop-card").remove();
                    saveData();
                }
            });
        });

        document.querySelectorAll(".edit").forEach((btn) => {
            attachEdit(btn);
        });
    }
}

loadData();

document.querySelectorAll(".edit").forEach((btn) => {
    attachEdit(btn);
});

function saveData(){

localStorage.setItem("cropData",cropGrid.innerHTML);

}

function loadData(){

const data=localStorage.getItem("cropData");

if(data){

cropGrid.innerHTML=data;

document.querySelectorAll(".delete").forEach(btn=>{

btn.addEventListener("click",function(){

this.closest(".crop-card").remove();

saveData();

});

});

document.querySelectorAll(".edit").forEach(btn=>{

attachEdit(btn);

});

}

}

loadData();