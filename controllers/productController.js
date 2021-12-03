const Product = require("../models/productModel");
const { getPostData } = require("../utils");

//  @desc   Get all products
//  @route  GET /api/products/
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error.message);
  }
}

//  @desc   Get single product by id
//  @route  GET /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error.message);
  }
}

//  @desc   Create new product
//  @route  POST /api/products/
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
    const product = { title, description, price };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(`Error at productController::createProduct: ${error.message}`);
  }
}

//  @desc   Update product
//  @route  PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    // await the result of the findById function so that we don't continue with an empty promise
    let product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      // do the same for getting the data to be posted
      const body = await getPostData(req);
      // break out inputs using destructuring
      const { title, description, price } = JSON.parse(body);
      // assign received value or exisiting as default to the payload
      productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (error) {
    console.log(`Error at productController::createProduct: ${error.message}`);
  }
}

//  @desc   Delete product by id
//  @route  DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
