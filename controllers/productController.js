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
    let product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    }
    const body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
    product = {
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
    };
    const newProduct = await Product.create(product);
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(`Error at productController::createProduct: ${error.message}`);
  }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct };
