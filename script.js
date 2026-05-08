// ================= Master Data =================
let laptops = [
    { name:"MacBook Pro", ram:"16GB", gpu:"M3", type:"programming", budget:"high" },
    { name:"Dell XPS 15", ram:"16GB", gpu:"RTX 3050", type:"programming", budget:"high" },
    { name:"Lenovo Legion 5", ram:"16GB", gpu:"RTX 3060", type:"gaming", budget:"medium" },
    { name:"HP Victus", ram:"16GB", gpu:"RTX 3050", type:"gaming", budget:"low" },
    { name:"ASUS ROG Strix G16", ram:"16GB", gpu:"RTX 4060", type:"gaming", budget:"high" },
    { name:"MacBook Air M2", ram:"8GB", gpu:"Apple M2", type:"programming", budget:"medium" },
    { name:"Acer Nitro 5", ram:"16GB", gpu:"RTX 3050", type:"gaming", budget:"medium" },
    { name:"Lenovo IdeaPad 3", ram:"8GB", gpu:"Intel UHD", type:"study", budget:"low" },
    { name:"MSI Katana GF66", ram:"16GB", gpu:"RTX 3060", type:"gaming", budget:"medium" },
    { name:"HP Pavilion 15", ram:"8GB", gpu:"Intel Iris Xe", type:"study", budget:"low" },
    { name:"Dell Inspiron 15", ram:"8GB", gpu:"Intel UHD", type:"study", budget:"low" },
    { name:"ASUS ZenBook 14", ram:"16GB", gpu:"Intel Iris Xe", type:"programming", budget:"medium" },
    { name:"Razer Blade 15", ram:"32GB", gpu:"RTX 4070", type:"gaming", budget:"high" },
    { name:"Gigabyte G5", ram:"16GB", gpu:"RTX 3050", type:"gaming", budget:"medium" },
    { name:"Samsung Galaxy Book3", ram:"16GB", gpu:"Intel Iris Xe", type:"programming", budget:"medium" },
    { name:"LG Gram 16", ram:"16GB", gpu:"Intel Iris Xe", type:"programming", budget:"high" }
];
localStorage.setItem("allLaptops", JSON.stringify(laptops));

// ================= User Navigation Check & Data Isolation =================
let currentUser = localStorage.getItem("user");
let favKey = currentUser ? "favorites_" + currentUser : "favorites_guest";
let favorites = JSON.parse(localStorage.getItem(favKey)) || [];

document.addEventListener("DOMContentLoaded", () => {
    if(currentUser){
        let nav = document.querySelector(".navbar nav");
        let loginBtn = document.querySelector(".login-btn");
        if(nav && loginBtn) {
            loginBtn.remove();
            nav.insertAdjacentHTML('beforeend', `<span style="margin-left:20px; color:#6c5ce7; font-weight:bold;">👤 ${currentUser}</span>`);
            nav.insertAdjacentHTML('beforeend', `<a onclick="logout()" style="color:#ff4757; font-weight:bold; cursor:pointer; margin-left:15px;">Logout</a>`);
        }
    } 
});
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html"; 
}
function toggleFavorite(name){
    if(favorites.includes(name)){
        favorites = favorites.filter(item => item !== name);
        alert("Removed from favorites 💔");
    } else {
        favorites.push(name);
        alert("Added to favorites ❤️");
    }
    localStorage.setItem(favKey, JSON.stringify(favorites));
    location.reload();
}
let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let resultContainer = document.getElementById("result");
if(searchInput && searchResults) {
    searchInput.addEventListener("keyup", function(){
        let query = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";
        if(query === "") return;
        let results = laptops.filter(laptop => laptop.name.toLowerCase().includes(query));
        results.forEach(laptop => {
            let item = document.createElement("p");
            item.textContent = laptop.name;
            item.addEventListener("click", function(){
                resultContainer.innerHTML = `
                    <div class="laptop-card">
                        <button class="fav-btn" onclick="toggleFavorite('${laptop.name}')">
                            <i class="fa-solid fa-heart ${favorites.includes(laptop.name) ? 'active' : ''}"></i>
                        </button>
                        <img src="images/${laptop.name}.jpg" onerror="this.src='https://via.placeholder.com/300x200?text=Laptop'">
                        <h3>${laptop.name}</h3>
                        <p>RAM: ${laptop.ram}</p>
                        <p>GPU: ${laptop.gpu}</p>
                    </div>
                `;
                searchResults.innerHTML = "";
                searchInput.value = laptop.name;
            });
            searchResults.appendChild(item);
        });
    });
}
let options = document.querySelectorAll(".option");
if(options.length > 0){
    options.forEach(option => {
        option.addEventListener("click",function(){
            option.classList.toggle("active");
        });
    });
}
let recommendBtn = document.querySelector(".recommend-btn");
if(recommendBtn && resultContainer && !document.getElementById("compareResult")) {
    recommendBtn.addEventListener("click",function(){
        let selectedTypes = [];
        options.forEach(option => {
            if(option.classList.contains("active")){
                selectedTypes.push(option.dataset.type);
            }
        });       
        let budget = document.getElementById("budget").value;
        let recommendations = laptops.filter(laptop => 
            selectedTypes.includes(laptop.type) && laptop.budget === budget
        );
        resultContainer.innerHTML = "";
        if(recommendations.length === 0){
            resultContainer.innerHTML = "<h3 style='grid-column: 1 / -1; color:#ff4757;'>No laptops match your choice</h3>";
            return;
        }
        recommendations.forEach(laptop => {
            resultContainer.innerHTML += `
                <div class="laptop-card">
                    <button class="fav-btn" onclick="toggleFavorite('${laptop.name}')">
                        <i class="fa-solid fa-heart ${favorites.includes(laptop.name) ? 'active' : ''}"></i>
                    </button>
                    <img src="images/${laptop.name}.jpg" onerror="this.src='https://via.placeholder.com/300x200?text=Laptop'">
                    <h3>${laptop.name}</h3>
                    <p>RAM: ${laptop.ram}</p>
                    <p>GPU: ${laptop.gpu}</p>
                </div>
            `;
        });
    });
}
let list1 = document.getElementById("list1");
let list2 = document.getElementById("list2");
if(list1 && list2){
    laptops.forEach(laptop => {
        let item1 = document.createElement("p");
        item1.innerText = laptop.name;
        item1.onclick = function() {
            document.querySelector("#dropdown1 .selected-value").innerHTML = laptop.name + ' <i class="fa-solid fa-chevron-down"></i>';
            document.getElementById("laptop1").value = laptop.name;
            document.getElementById("list1").classList.remove("show");
        };
        list1.appendChild(item1);
        let item2 = document.createElement("p");
        item2.innerText = laptop.name;
        item2.onclick = function() {
            document.querySelector("#dropdown2 .selected-value").innerHTML = laptop.name + ' <i class="fa-solid fa-chevron-down"></i>';
            document.getElementById("laptop2").value = laptop.name;
            document.getElementById("list2").classList.remove("show");
        };
        list2.appendChild(item2);
    });
}
function toggleDropdown(listId) {
    document.getElementById(listId).classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.closest('.custom-dropdown')) {
        let dropdowns = document.getElementsByClassName("dropdown-list");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
function compare(){
    let name1 = document.getElementById("laptop1").value;
    let name2 = document.getElementById("laptop2").value;
    let resultBox = document.getElementById("compareResult");
    let l1 = laptops.find(l => l.name === name1);
    let l2 = laptops.find(l => l.name === name2);
    if(!l1 || !l2){
        resultBox.innerHTML = "<p style='margin-top:20px; color:#ff4757; font-weight:bold;'>⚠️ Please select two different laptops to compare.</p>";
        return;
    }
    resultBox.innerHTML = `
        <div class="compare-results">
            <div class="compare-card">
                <img src="images/${l1.name}.jpg" onerror="this.src='https://via.placeholder.com/300x200?text=Laptop'">
                <h3>${l1.name}</h3>
                <div class="specs-list">
                    <p><span>RAM</span> <strong>${l1.ram}</strong></p>
                    <p><span>GPU</span> <strong>${l1.gpu}</strong></p>
                    <p><span>Type</span> <strong>${l1.type}</strong></p>
                    <p><span>Budget</span> <strong>${l1.budget}</strong></p>
                </div>
            </div>
            <div class="compare-card">
                <img src="images/${l2.name}.jpg" onerror="this.src='https://via.placeholder.com/300x200?text=Laptop'">
                <h3>${l2.name}</h3>
                <div class="specs-list">
                    <p><span>RAM</span> <strong>${l2.ram}</strong></p>
                    <p><span>GPU</span> <strong>${l2.gpu}</strong></p>
                    <p><span>Type</span> <strong>${l2.type}</strong></p>
                    <p><span>Budget</span> <strong>${l2.budget}</strong></p>
                </div>
            </div>
        </div>
    `;
}
let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
function showSlides(index) {
    if (slides.length === 0) return;
    if (index >= slides.length) { slideIndex = 0; }
    if (index < 0) { slideIndex = slides.length - 1; }
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    slides[slideIndex].classList.add("active");
    if(dots.length > 0) dots[slideIndex].classList.add("active");
}
function changeSlide(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
if (slides.length > 0) {
    showSlides(slideIndex);
    setInterval(() => { changeSlide(1); }, 5000);
}