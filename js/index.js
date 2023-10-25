// Navbar, Search Product, Common Components
const handleSelectNavOption = () => {
    const currentPath = window.location.pathname;
    const navbarLogo = document.getElementById("navbar__logo");
    const navbarOptions = document.querySelectorAll(".navbar__options li");
    navbarOptions.forEach((option) => {
        const link = option.querySelector("a");
        const href = link.getAttribute("href");
        if (currentPath === href) {
            option.classList.add("selected");
        }
    });
    navbarLogo.addEventListener("click",()=>{
        window.location = "/";
    });
};

const handleProductSearch = () => {
    const searchForm = document.getElementById("product_search_form");
    const searchInput = document.getElementById("search__input");
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const query = searchInput.value;
        if(query && query.trim()!=''){
            console.log({query});
            location = `/products.html?query=${query}`
        }
    });
};


const handlePagination = () => {
    const searchForm = document.getElementById("product_search_form");
    const searchInput = document.getElementById("search__input");
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const query = searchInput.value;
        if(query && query.trim()!=''){
            console.log({query});
            location = `/products.html?query=${query}`
        }
    });
};


const handleCategoryFilter = () => {
    const categoryDropdown = document.getElementById(
        "product_category__dropdown"
    );
    const categoryLabel = document.getElementById("product_category__label");

    categoryDropdown.addEventListener("change", function () {
        const selectedCategory = categoryDropdown.value;
        if (selectedCategory != "") {
            categoryLabel.textContent = `${categoryDropdown.value} Products`;
        } else {
            categoryLabel.textContent = "Featured";
        }
        loadProductsToDom({
            category : selectedCategory
        });
    });
};
