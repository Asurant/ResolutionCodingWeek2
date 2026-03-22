const button = document.getElementById("click-button");
const count = document.getElementById("click-count");
let totalClickCount = 0;
const shopContainer = document.getElementById("shop-items");
let itemsOwned = [];
const failure = document.getElementById("failure")
let timer = 0

function buttonClick(){
    console.log("Button was clicked!");

    const betterBushOwned = itemsOwned.find((i) => i.name === "Bush But Better");
    const betterBushCount = betterBushOwned ? betterBushOwned.amount : 1;

    totalClickCount += 1+Math.floor(Math.random()*2*betterBushCount);
    console.log(count.textContent)
    count.textContent=totalClickCount;
}

button.addEventListener("click", function(){
    buttonClick();
})

const shopItems = [
    {
        name: "Gardener",
        description: "The gardener will help you click the bush!",
        cost: 10,
        startingCost: 10,
    },
    {
        name: "Bush But Better",
        description: "OMG the bush you're using is soooo last year. Get the newer bush and better bush instead",
        cost: 50,
        startingCost: 50,
    },
];


createShopItems();

function createShopItems(){
    document.querySelectorAll(".shop-item").forEach((element)=>{
        element.remove();
    });

    shopItems.forEach((item) =>{
        const shopItem = document.createElement("div");
        shopItem.className = "shop-item";

        shopItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <button onclick="buyItem('${item.name}')">
                Buy $${item.cost}
            </button>
        `;

        shopContainer.appendChild(shopItem);
    })
}

function buyItem(itemName){
    const item = shopItems.find((i) => i.name === itemName);
    if(totalClickCount>=item.cost){
        totalClickCount-=item.cost;
        count.textContent = totalClickCount;

        const gamble = Math.floor(Math.random()*2)
        if (gamble === 1){ 
            let amount = 1;

            const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
            if(itemInArray){
            
                itemInArray.amount++;
                console.log(`Found ${item.name}, added 1!`)
                amount=itemInArray.amount;
                
            }else{
                itemsOwned.push({name: item.name, amount:1});
                console.log(`Added ${item.name} to itemsOwned!`)
            }

            item.cost = item.startingCost + item.startingCost * amount ** 2;
            createShopItems();

            console.log(`Bought ${itemName}!`);
            }else{
                console.log(`You failed to buy ${item.name} :(`);
                failure.innerHTML=`You failed to buy ${item.name} :(`;
            }
        }else{
            console.log(`Not enough clicks! Need ${item.cost}`)
    }
}

setInterval(() =>{
    const gardenerOwned = itemsOwned.find((i) => i.name === "Gardener");
    if(gardenerOwned){
        for(let i = 0; i<gardenerOwned.amount; i++){
            buttonClick();
        }
    }
    timer++;
    if(timer===10){
        timer = 0;
        failure.innerHTML=``;
    }
}, 1000);