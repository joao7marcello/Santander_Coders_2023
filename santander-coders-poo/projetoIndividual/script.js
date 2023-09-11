class Product {
  constructor(id, image, name, color, type) {
    this._id = id;
    this._image = image;
    this._name = name;
    this._color = color;
    this._type = type;
    this._pricesBySize = {};
    this._quantitiesBySize = {};
  }

  get image() {
    return this._image;
  }

  get name() {
    return this._name;
  }

  get color() {
    return this._color;
  }

  get type() {
    return this._type;
  }

  setPriceBySize(size, price) {
    this._pricesBySize[size] = price;
  }

  getPriceBySize(size) {
    return this._pricesBySize[size] || 0;
  }

  setQuantityBySize(size, quantity) {
    this._quantitiesBySize[size] = quantity;
  }

  getQuantityBySize(size) {
    return this._quantitiesBySize[size] || 0;
  }
  updatePriceAndQuantity(size, price, quantity) {
    this.setPriceBySize(size, price);
    this.setQuantityBySize(size, quantity);
  }
}

const productTypeSelect = document.getElementById("productType");
const productSizeSelect = document.getElementById("productSize");
const addProductButton = document.getElementById("addProduct");
const productListContainer = document.getElementById("productList"); // Container to display products
const productForm = document.getElementById("productForm");

const products = []; // Store the added products

productTypeSelect.addEventListener("change", () => {
  const selectedType = productTypeSelect.value;
  populateSizeOptions(selectedType);
});

let productIdCounter = 1;
let productSize;

addProductButton.addEventListener("click", () => {
  let showAlert = true; // Initialize a flag to show the alert

  const productImage = document.getElementById("productImage").value;
  const productName = document.getElementById("productName").value;
  const productColor = document.getElementById("productColor").value;
  const productType = productTypeSelect.value;
  productSize = productSizeSelect.value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("productPrice").value);

  if (
    !productImage ||
    !productName ||
    !productColor ||
    quantity === undefined ||
    !price
  ) {
    if (showAlert) {
      alert("Please fill in all required fields before adding the product.");
      showAlert = false; // Set showAlert to false so it doesn't show more alerts
    }
    return; // Exit the function without adding the product
  }
  let product = products.find(
    (p) =>
      p.name === productName &&
      p.color === productColor &&
      p.type === productType
  );

  if (!product) {
    const productId = productIdCounter++;
    product = new Product(
      productId,
      productImage,
      productName,
      productColor,
      productType
    );
    products.push(product);
  }

  product.updatePriceAndQuantity(productSize, price, quantity);

  alertShown = true;

  updateProductList();
});

const scrollableProductList = document.getElementById("scrollableProductList");

function updateProductList() {
  scrollableProductList.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("col-md-6"); // Use Bootstrap's grid system (3 products per row)
    productDiv.classList.add("mb-4"); // Use Bootstrap's grid system (3 products per row)

    // Use Bootstrap card component for each product
    const productCard = document.createElement("div");
    productCard.classList.add("card");
    productCard.classList.add("h-100"); // Make sure all cards have the same height

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.classList.add("card-img-top"); // Set the image as the card's top content

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const productName = document.createElement("h5");
    productName.classList.add("card-title");
    productName.textContent = product.name;

    const productColor = document.createElement("p");
    productColor.classList.add("card-text");
    productColor.textContent = `Color: ${product.color}`;

    const productType = document.createElement("p");
    productType.classList.add("card-text");
    productType.textContent = `Type: ${product.type}`;

    const sizesDiv = document.createElement("div");
    sizesDiv.classList.add("card-text");

    // Iterate through sizes and display them using Bootstrap badges
    for (const size in product._pricesBySize) {
      const sizeBadge = document.createElement("span");
      sizeBadge.classList.add("badge", "bg-primary", "mr-2");
      sizeBadge.textContent = `Size: ${size}; Price: ${product.getPriceBySize(
        size
      )}; Quantity: ${product.getQuantityBySize(size)}`;
      sizesDiv.appendChild(sizeBadge);
    }

    cardBody.appendChild(productName);
    cardBody.appendChild(productColor);
    cardBody.appendChild(productType);
    cardBody.appendChild(sizesDiv);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );

    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-primary", "btn-sm", "m-3");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "m-3");
    deleteButton.textContent = "Delete";

    function resetFormAndRestoreEvent() {
      // Reset the form
      productForm.reset();

      // Get a reference to the "Add Product" button
      const addProductButton = document.getElementById("addProduct");

      // Restore the button text to "Add Product"
      addProductButton.textContent = "Add Product";

      // Remove the update event listener to avoid duplicates
      addProductButton.removeEventListener("click", updateProduct);

      // Reattach the "Add Product" event listener
      addProductButton.addEventListener("click", addProduct);
    }

    editButton.addEventListener("click", () => {
      // Fill the form fields with the original product's information
      document.getElementById("productName").value = product.name;
      document.getElementById("productPrice").value =
        product.getPriceBySize(productSize);
      document.getElementById("productImage").value = product.image;
      document.getElementById("productColor").value = product.color;
      document.getElementById("productType").value = product.type;
      document.getElementById("productSize").value = productSize;
      document.getElementById("quantity").value =
        product.getQuantityBySize(productSize);

      // Get a reference to the "Update Product" button
      const addProductButton = document.getElementById("addProduct");

      // Store the product being edited so we can update it later
      addProductButton.dataset.productId = product.id;

      // Update the button text to "Update Product"
      addProductButton.textContent = "Update Product";

      // Attach an event listener to the "Update Product" button
      addProductButton.removeEventListener("click", addProduct);

      addProductButton.addEventListener("click", () => {
        // Get the updated values from the form
        const updatedName = document.getElementById("productName").value;
        const updatedPrice = parseFloat(
          document.getElementById("productPrice").value
        );
        const updatedImage = document.getElementById("productImage").value;
        const updatedColor = document.getElementById("productColor").value;
        const updatedType = document.getElementById("productType").value;
        const updatedSize = document.getElementById("productSize").value;
        const updatedQuantity = parseInt(
          document.getElementById("quantity").value
        );

        // Check for empty fields and handle them
        if (
          !updatedName ||
          !updatedPrice ||
          !updatedImage ||
          !updatedColor ||
          !updatedType ||
          !updatedSize
        ) {
          alert(
            "Please fill in all required fields before updating the product."
          );
          return; // Exit the function without updating the product
        }

        // Find the product to update by its ID
        const productId = addProductButton.dataset.productId;
        const productToUpdate = products.find((p) => p.id === productId);

        if (!productToUpdate) {
          alert(`Product "${updatedName}" has been updated.`);
          resetFormAndRestoreEvent(); // Reset the form and return to "Add Product" mode
          return; // Exit the function if the product is not found
        }

        // Update the product with the new information
        productToUpdate.setName(updatedName);
        productToUpdate.setPriceBySize(updatedSize, updatedPrice);
        productToUpdate.setImage(updatedImage);
        productToUpdate.setColor(updatedColor);
        productToUpdate.setType(updatedType);
        productToUpdate.setQuantityBySize(updatedSize, updatedQuantity);

        // Handle any other update logic here

        // Show a notification
        alert(`Product "${updatedName}" has been updated.`);

        // Reset the form and return to "Add Product" mode
        resetFormAndRestoreEvent();
      });
    });

    deleteButton.addEventListener("click", () => {
      // Get the name of the product being deleted
      const deletedProductId = product.id;

      // Find the index of the product to be deleted
      const productIndex = products.findIndex((p) => p.id === deletedProductId);

      if (productIndex !== -1) {
        // Show a confirmation notification
        const confirmation = window.confirm(
          `Are you sure you want to delete the product "${deletedProductId}"?`
        );

        if (confirmation) {
          // Remove the product from the array
          products.splice(productIndex, 1);

          // Update the product list display
          updateProductList();

          // Show a notification
          alert(`Product "${product.name}" has been deleted.`);
        }
      }
    });

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    productCard.appendChild(productImage);
    productCard.appendChild(cardBody);

    // Append buttonsDiv to productCard
    productCard.appendChild(buttonsDiv);

    productDiv.appendChild(productCard);
    scrollableProductList.appendChild(productDiv);
  });
}

// Populate size options based on the selected type
function populateSizeOptions(selectedType) {
  const productSizeSelect = document.getElementById("productSize");
  productSizeSelect.innerHTML = "";

  const sizes =
    selectedType === "shoes"
      ? ["37", "38", "39", "40", "41", "42", "43", "44"]
      : ["S", "M", "L", "XL"];

  sizes.forEach((size) => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    productSizeSelect.appendChild(option);
  });
}

// Initialize size options based on the default selected type
populateSizeOptions(productTypeSelect.value);
