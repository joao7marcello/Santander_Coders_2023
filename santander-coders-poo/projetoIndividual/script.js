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
    productDiv.classList.add("col-md-6");
    productDiv.classList.add("mb-4");

    const productCard = document.createElement("div");
    productCard.classList.add("card");
    productCard.classList.add("h-100");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.classList.add("card-img-top");

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
      productForm.reset();

      const addProductButton = document.getElementById("addProduct");

      addProductButton.textContent = "Add Product";

      addProductButton.removeEventListener("click", updateProduct);

      addProductButton.addEventListener("click", addProduct);
    }

    editButton.addEventListener("click", () => {
      document.getElementById("productName").value = product.name;
      document.getElementById("productPrice").value =
        product.getPriceBySize(productSize);
      document.getElementById("productImage").value = product.image;
      document.getElementById("productColor").value = product.color;
      document.getElementById("productType").value = product.type;
      document.getElementById("productSize").value = productSize;
      document.getElementById("quantity").value =
        product.getQuantityBySize(productSize);

      const addProductButton = document.getElementById("addProduct");

      addProductButton.dataset.productId = product.id;

      addProductButton.textContent = "Update Product";

      addProductButton.removeEventListener("click", addProduct);

      addProductButton.addEventListener("click", () => {
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
          return;
        }

        // Find the product to update by ID
        const productId = addProductButton.dataset.productId;
        const productToUpdate = products.find((p) => p.id === productId);

        if (!productToUpdate) {
          alert(`Product "${updatedName}" has been updated.`);
          resetFormAndRestoreEvent(); // Reset the form and return to "Add Product" mode
          return;
        }

        // Update the product with the new information
        productToUpdate.setName(updatedName);
        productToUpdate.setPriceBySize(updatedSize, updatedPrice);
        productToUpdate.setImage(updatedImage);
        productToUpdate.setColor(updatedColor);
        productToUpdate.setType(updatedType);
        productToUpdate.setQuantityBySize(updatedSize, updatedQuantity);

        alert(`Product "${updatedName}" has been updated.`);

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
          `Are you sure you want to delete the product "${product.name}"?`
        );

        if (confirmation) {
          products.splice(productIndex, 1);

          updateProductList();

          alert(`Product "${product.name}" has been deleted.`);
        }
      }
    });

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    productCard.appendChild(productImage);
    productCard.appendChild(cardBody);

    productCard.appendChild(buttonsDiv);

    productDiv.appendChild(productCard);
    scrollableProductList.appendChild(productDiv);
  });
}

// Populate size options
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

// Initialize size options
populateSizeOptions(productTypeSelect.value);
