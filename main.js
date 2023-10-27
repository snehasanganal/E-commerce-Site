const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click",() => {
    body.classList.add("active")
})
closeShopping.addEventListener("click",() => {
    body.classList.remove("active")
})


let products = [
    {
        id:1,
        name:"Nike 7A shoes",
        desc: "Mens Running Shoes",
        images:"product1.jpg",
        price: 1799
    },
    {
        id:2,
        name:"Adidas",
        desc:"Unisex Classic 3s Backpack",
        images:"product2.jpg",
        price: 2999
    },
    {
        id:3,
        name:"Adidas sipper",
        desc:"Unisex Stainless Steel Hot/Cold Insulated Metal bottle",
        images:"product3.jpg",
        price: 649
    },
    {
        id:4,
        name:"John Jacobs",
        desc:"Unisex Adult UV-protected Green Lens Sunglasses",
        images:"product4.jpg",
        price: 5599
    },
    {
        id:5,
        name:"Red Gear",
        desc:"Wireless Gamepad with Integrated Dual Intensity Monitor",
        images:"product5.jpg",
        price: 1399
    },
    {
        id:6,
        name:"TECHNO",
        desc:"Phantom V fold 5g Black 12GB First Full Size Fold",
        images:"product6.jpg",
        price: 78499
    }
]

let listCards = [];

const initApp = () => {
    products.forEach((value,key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="img/${value.images}">
            <div class="title">${value.name}</div>
            <div>${value.desc}</div>
            <div class="price">&#8377; ${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>
            `;
            list.appendChild(newDiv)
    })
}

initApp()


const addToCard = (key) => {
    if(listCards[key]==null){
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1
    }

    reloadCard();
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice =0;

    listCards.forEach((value,key) => {

        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value!=null){
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src = "img/${value.images}"></div>
                <div class="cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style="background-color: #560bad" class="cardButton" onclick ="changeQuantity(${key},${value.quantity-1})">-</button>
                    <div class="count">${count}</div>
                    <button style="background-color: #560bad" class="cardButton" onclick ="changeQuantity(${key},${value.quantity+1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
        count=0;
    })
}

const changeQuantity = (key, quantity) => {
    if(quantity == 0){
        delete listCards[key]
        
    }
    else{
        listCards[key].quantity=quantity;
        listCards[key].price = quantity*products[key].price
    }

    
    reloadCard();
    
}

