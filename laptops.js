let allLaptopsContainer = document.getElementById("allLaptops");
let filterInput = document.getElementById("filterInput");
let laptopsData = JSON.parse(localStorage.getItem("allLaptops")) || [];
function displayLaptops(laptopsToDisplay) {
    allLaptopsContainer.innerHTML = "";
    if(laptopsToDisplay.length === 0) {
        allLaptopsContainer.innerHTML = "<h3 style='grid-column: 1 / -1; color:#ff4757; text-align:center;'>No laptops match your search 😔</h3>";
        return;
    }
    laptopsToDisplay.forEach(laptop => {
        let isFav = favorites.includes(laptop.name);
        allLaptopsContainer.innerHTML += `
            <div class="laptop-card">
                <button class="fav-btn" onclick="toggleFavorite('${laptop.name}')">
                    <i class="fa-solid fa-heart ${isFav ? 'active' : ''}"></i>
                </button>
                <img src="images/${laptop.name}.jpg" onerror="this.src='https://via.placeholder.com/300x200?text=Laptop'">
                <h3>${laptop.name}</h3>
                <p>RAM: ${laptop.ram}</p>
                <p>GPU: ${laptop.gpu}</p>
                <p>Type: <span style="text-transform: capitalize;">${laptop.type}</span></p>
                <p>Budget: <span style="text-transform: capitalize;">${laptop.budget}</span></p>
            </div>
        `;
    });
}
displayLaptops(laptopsData);
if(filterInput) {
    filterInput.addEventListener("keyup", function() {
        let query = filterInput.value.toLowerCase();
        let filteredLaptops = laptopsData.filter(laptop => 
            laptop.name.toLowerCase().includes(query) || 
            laptop.type.toLowerCase().includes(query) ||
            laptop.gpu.toLowerCase().includes(query)
        );
        displayLaptops(filteredLaptops);
    });
}