let favContainer = document.getElementById("favoritesContainer");
if (favorites.length === 0) {
    favContainer.innerHTML = "<h3 style='grid-column: 1 / -1; color:#ff4757; text-align: center;'>No favorites yet. Start adding some!</h3>";
} else {
    let favLaptops = laptops.filter(laptop => favorites.includes(laptop.name));   
    favLaptops.forEach(laptop => {
        favContainer.innerHTML += `
            <div class="laptop-card">
                <button class="remove-btn" onclick="removeFromFav('${laptop.name}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <img src="images/${laptop.name}.jpg" onerror="this.src='https://via.placeholder.com/300x200?text=Laptop'">
                <h3>${laptop.name}</h3>
                <p>RAM: ${laptop.ram}</p>
                <p>GPU: ${laptop.gpu}</p>
            </div>
        `;
    });
}
function removeFromFav(name) {
    favorites = favorites.filter(item => item !== name);
    localStorage.setItem(favKey, JSON.stringify(favorites));
    location.reload(); 
}