// Function to update the cart total based on current items and their quantities
function updateCartTotal() 
{
    let cartRows = document.getElementsByClassName('cart-row'); // Get all cart rows
    let total = 0; 

    // Loop through each row in the cart, starting from index 1 to skip the header row
    for (let i = 1; i < cartRows.length; i++) 
    {
        let priceElement = cartRows[i].getElementsByClassName('cart-price')[0]; // Get the price element
        let quantityElement = cartRows[i].getElementsByClassName('cart-quantity-input')[0]; // Get the quantity input

        // Convert the price string to a float and remove the '$' symbol
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value; // Get the quantity as a string
        total += price * quantity; // Calculate the total price for the current item and add to the total
    }

    // Update the total price displayed in the cart, formatting it to two decimal places
    document.getElementsByClassName('cart-total-price')[0].innerText = `$${total.toFixed(2)}`;
}

// Function to add a new item to the cart
function addItemToCart(title, price, imageSrc) 
{
    let cartItems = document.getElementsByClassName('cart-items')[0]; // Get the cart items container
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title'); // Get all cart item titles

    // Check if the item is already in the cart
    for (let i = 0; i < cartItemNames.length; i++) 
    {
        // Compare the current cart item's title with the new item title
        if (cartItemNames[i].innerText === title) 
        {
            /* alert() is used to display a pop-up message to the user. 
               It shows a dialog box with a message that the user can read and
               it pauses the execution of the script until the user clicks "OK" in the dialog box. */
            alert('This item is already added to the cart.'); // Alert if the item already exists
            return;
        }
    }

    // Create a new row for the cart item
    let cartRow = document.createElement('div'); // Create a new 'div' element
    cartRow.classList.add('cart-row'); // Add a class to the new div

    // Set the inner HTML of the new row to include item details and controls
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100"> <!-- Display item image -->
            <span class="cart-item-title">${title}</span> <!-- Display item title -->
        </div>
        <span class="cart-price cart-column">${price}</span> <!-- Display item price -->
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1"> <!-- Input for quantity -->
            <button class="btn btn-danger" type="button">REMOVE</button> <!-- Button to remove item -->
        </div>`;

    cartItems.appendChild(cartRow); // Add the new row to the cart items

    // Set up event listeners for the remove button and quantity change
    /*Listeners monitor user interactions (like clicks, keyboard presses, or mouse movements).
      When the event happens, the listener "hears" it and runs a predefined piece of code (the callback function). */
    cartRow.getElementsByClassName('btn-danger')[0].onclick = removeCartItem; // Remove item when button is clicked
    cartRow.getElementsByClassName('cart-quantity-input')[0].onchange = quantityChanged; // Handle quantity changes
    
    updateCartTotal(); // call the function to update the cart total after adding the new item
}

// Function to handle the "Add to Cart" button click
function addToCartClicked(event) 
{
    let shopItem = event.target.parentElement.parentElement; // Navigate to the shop item container

    // Get the title, price, and image source of the selected item
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText; // Get item title
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText; // Get item price
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src; // Get item image source
    addItemToCart(title, price, imageSrc); // Add the selected item to the cart
}

// Function to remove an item from the cart
function removeCartItem(event) 
{
    let buttonClicked = event.target; // Get the button that was clicked
    buttonClicked.parentElement.parentElement.remove(); // Remove the cart row associated with the button
    updateCartTotal(); // Update the cart total after removing the item
}

// Function to handle changes in item quantity
function quantityChanged(event) 
{
    let input = event.target; // Get the quantity input that triggered the change event

    // Ensure the quantity is at least 1
    if (isNaN(input.value) || input.value <= 0) // Check if the input is not a number or less than 1
    {
        input.value = 1; // Reset the input value to 1 if invalid
    }

    updateCartTotal(); // Update the cart total when quantity changes
}

// Function to handle the "Purchase" button click
function purchaseClicked() 
{
    let cartItems = document.getElementsByClassName('cart-items')[0]; // Get the cart items container

    // Remove all items from the cart
    while (cartItems.hasChildNodes()) // While there are child nodes in the cart
    {
        cartItems.removeChild(cartItems.firstChild); // Remove the first child node (item)
    }

    updateCartTotal(); // Update the cart total after clearing the cart
    alert('Thank you for your purchase!'); // Show a confirmation message
}

// Attach the "Add to Cart" event listeners to all "Add to Cart" buttons
let addToCartButtons = document.getElementsByClassName('shop-item-button'); // Get all buttons for adding items to the cart

for (let i = 0; i < addToCartButtons.length; i++) 
{
    addToCartButtons[i].onclick = addToCartClicked; // Set the click event to call the addToCartClicked function
}

// Attach the "Purchase" event listener to the purchase button
let purchaseButton = document.getElementsByClassName('btn-purchase')[0]; // Get the purchase button
purchaseButton.onclick = purchaseClicked; // Set the click event to call the purchaseClicked function

// Create the cart container if it doesn't exist
let cartContainer = document.getElementsByClassName('cart-items')[0]; // Check if the cart items container exists

if (!cartContainer) // If it doesn't exist
{
    cartContainer = document.createElement('div'); // Create a new 'div' element for the cart
    cartContainer.classList.add('cart-items'); // Add a class to the new div
    let cartSection = document.getElementsByClassName('cart-row')[0].parentElement; // Get the parent element of the first cart row

    // Insert the new cart container before the total price section
    cartSection.insertBefore(cartContainer, cartSection.getElementsByClassName('cart-total')[0]); // Insert the cart container
}
