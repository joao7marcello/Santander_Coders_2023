class Product {
  constructor(image, name, color, type) {
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
}

const productTypeSelect = document.getElementById("productType");
const productSizeSelect = document.getElementById("productSize");
const addProductButton = document.getElementById("addProduct");
const productListContainer = document.getElementById("productList"); // Container to display products

const products = []; // Store the added products

productTypeSelect.addEventListener("change", () => {
  const selectedType = productTypeSelect.value;
  populateSizeOptions(selectedType);
});

addProductButton.addEventListener("click", () => {
  const productImage = document.getElementById("productImage").value;
  const productName = document.getElementById("productName").value;
  const productColor = document.getElementById("productColor").value;
  const productType = productTypeSelect.value;
  const productSize = productSizeSelect.value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("productPrice").value);

  if (
    !productImage ||
    !productName ||
    !productColor ||
    quantity === undefined ||
    !price
  ) {
    alert("Please fill in all required fields before adding the product.");
    return; // Exit the function without adding the product
  }

  let product = products.find(
    (p) =>
      p.name === productName &&
      p.color === productColor &&
      p.type === productType
  );

  if (!product) {
    product = new Product(productImage, productName, productColor, productType);
    products.push(product);
  }

  product.setPriceBySize(productSize, price);
  product.setQuantityBySize(productSize, quantity);

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

    editButton.addEventListener("click", () => {
      // Handle edit action here, e.g., open an edit modal
      alert("Edit clicked for " + product.name);
    });

    deleteButton.addEventListener("click", () => {
      // Get the name of the product being deleted
      const deletedProduct = product.name;

      // Find the index of the product to be deleted
      const productIndex = products.findIndex(
        (p) =>
          p.name === product.name &&
          p.color === product.color &&
          p.type === product.type
      );

      if (productIndex !== -1) {
        // Show a confirmation notification
        const confirmation = window.confirm(
          `Are you sure you want to delete the product "${deletedProduct}"?`
        );

        if (confirmation) {
          // Remove the product from the array
          products.splice(productIndex, 1);

          // Update the product list display
          updateProductList();

          // Show a notification
          alert(`Product "${deletedProduct}" has been deleted.`);
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
