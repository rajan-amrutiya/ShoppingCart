let productList = [];
let product = {};
let quantityOfProduct, isProductExist, productPrice, item, findINdex;
let cart = [];
let getDetails = {};
let order = [];
let current = 0;

function addToCart() {
    event.preventDefault();
    let selectedItem = document.getElementById("listOfProduct");
    productList = selectedItem.value.split('-');
    quantityOfProduct = document.getElementById("quantity").value;

    let notValid = document.getElementById("default").value;

    product = {
        productName: productList[0],
        quantity: quantityOfProduct,
        price: quantityOfProduct * +(productList[1])
    }

    if (notValid == selectedItem.value) {
        return alert("Choose atleast one product ");
    }
    if (quantityOfProduct < 1) {
        return alert("Invalid quantity !");
    }

    if (cart.length == 0) {
        cart.push(product)
    }
    findINdex = cart.findIndex(item => item.productName == product.productName);

    if (findINdex != -1) {

        cart[findINdex].quantity = quantityOfProduct;
        cart[findINdex].price = quantityOfProduct * +productList[1];
    } else {
        cart.push(product);
    }

    let showData = "";
    let totalPrice = 0;
    for (let index of cart) {
        showData += `product name : ${index.productName} <br>
        quantity : ${index.quantity} <br>
        price : ${index.price} <br>`;
    }
    document.getElementById("displayItem").innerHTML = showData;
}


function placeOrder() {
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validPhonNo = /^\d{10}$/;

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let address = document.getElementById('address').value;
    if (fname == "" || lname == "" || address == "") {
        alert("Fields should not be empty");
        return false;
    }

    let contactno = document.getElementById('contactno').value;
    if (!contactno.match(validPhonNo)) {
        alert("Please enter valid contact no");
        return false;
    }
    let email = document.getElementById('email').value;
    if (!email.match(validEmail)) {
        alert("Please enter valid email id");
        return false;
    }

    let showData = "";
    let totalPrice = 0;
    for (let index of cart) {
        totalPrice += index.price;
        showData += `product name : ${index.productName} <br>
        quantity : ${index.quantity} <br>
        price : ${index.price} <br>`;

    }

    getDetails = {

        fname,
        lname,
        address,
        contactno,
        email,
        cart,
        totalPrice
    }
    order.push(getDetails);
    cart = [];

    for (let item of order) {
        document.getElementById("orders").innerHTML = `
                                                       Full name : ${item.fname}  ${item.lname} <br>
                                                       Address : ${item.address} <br>
                                                       Contact No. : ${item.contactno} <br>
                                                       E- mail : ${item.email} <br>
                                                       ---------------------------------------- <br>
                                                       You added this products <br>
                                                       ${showData} 
                                                       
                                                       ---------------------------------------- <br>
                                                       Total Amount : ${item.totalPrice}`;

    }
    document.getElementById("details").reset();

}


let index;
function displayOrder(index = 0) {
    let showData = "";
    let item = order[index];
    for (let index of item.cart) {
        // totalPrice += index.price;
        showData += `product name : ${index.productName} <br>
        quantity : ${index.quantity} <br>
        price : ${index.price} <br>`;

    }

    document.getElementById("orders").innerHTML = `ORDER NUMBER : ${+(index) + 1} <br>
    <br>
    Full name : ${item.fname}  ${item.lname} <br>
    Address : ${item.address} <br>
    Contact No. : ${item.contactno} <br>
    E- mail : ${item.email} <br>
    ---------------------------------------- <br>
    You added this products <br>
    ${showData} 
    
    ---------------------------------------- <br>
    Total Amount : ${item.totalPrice}`;
}


function first() {
    if (current == 0) {
        return alert("You are at first order.");
    }
    current = 0;
    displayOrder();
}

function previous() {
    if (current == 0) {
        return alert("You are at first order.");
    }
    current--;
    displayOrder(current);
}

function next() {
    if (current == order.length - 1) {
        return alert("You are at last record.");
    }
    current++;
    displayOrder(current);
}
function last() {
    if (current == order.length - 1) {
        return alert("You are at last record");
    }
    current = order.length - 1;
    displayOrder(current);
}

function jumpToOrder() {
    let goto = document.getElementById("jumpToPage").value - 1;
    if ((goto > order.length - 1)) {
        return alert(`You have ordered ${order.length} orders .`);
    }else if((goto < 0)){
        return alert("Enter above 0");
    } 
    else {
        current = goto;
        displayOrder(goto);
    }
}

