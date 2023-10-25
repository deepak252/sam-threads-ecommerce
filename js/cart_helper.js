
const loadCartItemsToDom = async () => {
    const user = getUserProfile();
    const cartItems = user?.cart??[];
    let totalAmount =0;
    console.log(cartItems);
    let  cartListContainer = document.getElementById("cart_item__list__container");
    let  totalAmountLabel = document.getElementById("total_amount");
    cartListContainer.innerHTML = '';
    
    if(cartItems && cartItems.length!=0){
        cartItems.forEach(cartItem => {
            totalAmount+=(cartItem.product.price*cartItem.count);
            const cartItemDiv = generateCartItem(cartItem);
            const btnCartCountDec = cartItemDiv.querySelector(".btn_cart_item__dec");
            const btnCartCountInc = cartItemDiv.querySelector(".btn_cart_item__inc");
            btnCartCountDec.addEventListener('click',()=>{
                decrementCartItemCount(cartItem.product);
                //Refresh List Items
                loadCartItemsToDom();
            });
            btnCartCountInc.addEventListener('click',()=>{
                incrementCartItemCount(cartItem.product);
                //Refresh List Items
                loadCartItemsToDom();
            });
            cartListContainer.appendChild(cartItemDiv);
        });
        totalAmountLabel.innerHTML=`$ ${totalAmount}`;
    }else{
        cartListContainer.innerHTML = "<p>Cart is Empty</p>"
        totalAmountLabel.innerHTML=`$ 0`;
    }
    
}


const generateCartItem = (cartItem) => {
    let product = cartItem.product;
    let count = cartItem.count;
    let cartItemDiv = document.createElement("div");
   
    cartItemDiv.classList.add("cart_item")
    cartItemDiv.innerHTML = `
        <img
            src=${product.img}
            alt="product"
        />
        <div class="cart_item_info">
            <p class="cart_item__title max-lines-1">${product.title}</p>
            <p class="cart_item__tag">${product.tag}</p>
            <p class="cart_item__description max-lines-1">
            ${product.description}
            </p>
            <h2 class="cart_item__price">$ ${product.price}</h2>
            
            <div class="cart_item__counter">
                <button class="btn_cart_item__dec">-</button>
                <span>${count}</span>
                <button class="btn_cart_item__inc"  onclick="${()=>incrementCartItemCount(product)}">+</button>
            </div>
        </div>
    `;
   
    return cartItemDiv;
}



const addProductToCart = (product) =>{
    let user = getUserProfile();
    if(!user){
        // Navigate to sign-in page if user not signed in
        location = "/sign-in.html"
    }else{
        if(checkProductInCart(user,product)){
            return alert( "Product already in cart");
        }
        let currentCartItems = user.cart??[];
        user.cart = [...currentCartItems, {product, count : 1}];
        setUserProfile(user);
        // loadSpecificProductToDom(product.id);
    }
}


const removeProductFromCart = (product) =>{
    let user = getUserProfile();
    if(!user){
        // Navigate to sign-in page if user not signed in
        location = "/sign-in.html"
    }else{
        if(checkProductInCart(user,product)){
            let currentCartItems = user.cart??[];
            
            user.cart = currentCartItems.filter((item)=>{
                return item.product.id!=product.id;
            })
            setUserProfile(user);
            // loadSpecificProductToDom(product.id);
        }
        
    }
}
const incrementCartItemCount = (product)=>{
    let user = getUserProfile();
    console.log(product);
    if(!user){
        // Navigate to sign-in page if user not signed in
        location = "/sign-in.html"
    }else{
        let currentCartItems = user.cart??[];
        user.cart = currentCartItems.map((item)=>{
            if(item.product.id==product.id){
                let count = item.count+1;
                return {...item, count};
            }
            return item;
        })
        setUserProfile(user);
        // loadSpecificProductToDom(product.id);
    }
    
}

const decrementCartItemCount = (product)=>{
    
    let user = getUserProfile();
    if(!user){
        // Navigate to sign-in page if user not signed in
        location = "/sign-in.html"
    }else{
        let currentCartItems = user.cart??[];
        let removeItem = false;
        user.cart = currentCartItems.map((item)=>{
            if(item.product.id==product.id){
                let count = Math.max(item.count-1);
                if(count==0){
                    removeItem=true;
                }
                return {...item, count};
            }
            return item;
        });
        if(removeItem){
            removeProductFromCart(product)
            return;
        }
        setUserProfile(user);
        // loadSpecificProductToDom(product.id);

    }
}

const checkProductInCart = (user, product)=>{
    return (user?.cart??[]).find((item)=>product.id==item.product.id);
}
