
const loadProductsToDom = async ({
    category = '',
    query = '',
    shuffle=false, // true for "Related Products"
    count = 100, 
    page = 1
}) => {
    const products = await fetchProducts({category, query, shuffle, count, page});
    console.log(products);
    let productsContainer  = document.getElementById("product_list__container");
    productsContainer.innerHTML = '';
    if(products && products.length!=0){
        products.forEach(product => {
            productsContainer.appendChild(generateProduct(product))
        });
    }else{
        productsContainer.innerHTML = "<p>No Products Found</p>"
    }
    
}

const loadSpecificProductToDom = async (productId) => {
    const product = await fetchProductById(productId);
    let productDetailsContainer  = document.getElementById("product-details__container");
    // return;
    if(product){
        productDetailsContainer.innerHTML = generateSpecificProductDetails(product);
        const btnCart = document.getElementById("btn-cart");
        const btnBuy = document.getElementById("btn-buy");
        const btnCartCountInc = document.getElementById("btn-cart-inc");
        const btnCartCountDec = document.getElementById("btn-cart-dec");

        const user = getUserProfile();
        btnCart.addEventListener("click",()=>{
            if(checkProductInCart(user, product)){
                removeProductFromCart(product);
            }else{
                addProductToCart(product);
            }
            loadSpecificProductToDom(productId);
        })

        if(btnCartCountInc){
            btnCartCountInc.addEventListener('click',()=>{
                incrementCartItemCount(product);
                loadSpecificProductToDom(productId);
            })
        }
        if(btnCartCountDec){
            btnCartCountDec.addEventListener('click',()=>{
                decrementCartItemCount(product);
                loadSpecificProductToDom(productId);
            })
        }

        btnBuy.addEventListener("click",()=>{
            if(!user){
                // Navigate to sign-in page if user not signed in
                location = "/sign-in.html"
            }else{
                if(!checkProductInCart(user, product)){
                    addProductToCart(product);
                }
                window.location = "/cart.html";
            }
        })

    }else{
        productDetailsContainer.appendChild(generateProductNotFound());
    }
}

const generateProduct = (product) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product")
    productDiv.innerHTML = `
        <img src="${product.img}" alt="product" />
        <div class="product_info">
            <p class="product__title max-lines-2">${product.title}</p>
            <p class="product__tag max-lines-1">${product.tag}</p>
            <p class="product__description max-lines-2">${product.description}</p>
            <h2 class="product__price max-lines-1">$ ${product.price}</h2>
        </div>
        <div class="product__rating flex-center">
            ${product.rating}&nbsp;
            <img src="images/icons/star.svg" alt="rating" />
        </div>
    `;
    productDiv.onclick = ()=>{
        location = `/product-details.html?id=${product.id}`
    }
    return productDiv;
}

const generateSpecificProductDetails = (product)=>{
    const user = getUserProfile();
    const productInCart = checkProductInCart(user, product);

    const productDetails =  `
    <img
        id="product-details__img"
        src="${product.img}"
        alt="product"
    />
    <div class="product-details__info">
        <p class="product-details__tag">${product.tag}</p>
        <h1 class="product-details__title">${product.title}</h1>
        <h2 class="product-details__price">$ ${product.price}</h2>
        <span class="product-details__rating">
            4.0&nbsp;
            <img src="images/icons/star.svg" alt="rating" />
        </span>
        <br>
        <div style="display: ${productInCart ? 'inline-block' :  'none' };"  id="cart_counter">
            <button id="btn-cart-inc" >+</button>
            <span>${productInCart?.count}</span>
            <button id="btn-cart-dec" >-</button>
        </div>
        <br>

        ${productInCart 
            ? '<button id="btn-cart" class="btn--secondary">Remove From Cart</button>' 
            : '<button id="btn-cart" class="btn--secondary">Add To Cart</button>' 
        }
        <button id="btn-buy" class="btn--primary">Buy Now</button>
        <hr style="margin: 50px 0 0;"/>
        <h4 style="margin: 30px 0 0;">Product Description :</h4>
        <p class="product-details__description">${product.description}</p>
    </div>
    `
    return productDetails;
    
}


const generateProductNotFound = () => {
    let invalidProductDiv = document.createElement("div");
    // productDiv.classList.add("product")
    invalidProductDiv.innerHTML = `
        <h2 class="flex-center">Product Not Found</h2>
    `
    
    return invalidProductDiv;
}

const fetchProductById = async (id) =>{
    try{
        const products = await fetchProducts({});
        return products.find(product=>product.id == id);
    }catch(e){
        console.error(`Error fetching product ( id = ${id} ):`, e);
    }
}

const fetchProducts = async ({category, query, shuffle, count, page}) =>{
    try{
        const response = await fetch("data/products.json");
        let products = await response.json();
        if(category){
            // Filter products by category
            products = products.filter((product)=>{
                return product.category.toLowerCase().includes(category.toLowerCase());
            })
        }
        if(query){
            console.log(query);
             // Filter products by search query
            products = products.filter((product)=>{
                return product.title.toLowerCase().includes(query.toLowerCase());
            })
        }
        // let a = []
        products = products.slice(0,count);
        return products;
    }catch(e){
        console.error("Error fetching products:", error);
    }
}