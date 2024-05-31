// require('dotenv').config()
let express = require("express");
let app = express();
let port = process.env.PORT || 8000;
let url = process.env.CONNECTIONURL;
//let mongoose = require('mongoose')
let cors = require("cors");
app.use(cors());

let customer = {
  id: 9,
  customer: 11908,
  customer_profile: {
    id: 11908,
    name: "Spider",
    tag: "ap2000",
    color: [182, 73, 99],
    email: "jesus_christ@church.com",
    pincode: "Mumbai",
    location_name: "Mumbai, Maharashtra, India",
    type: "C",
    profile_pic: null,
    gst: "",
  },
};
let product1 = {
  id: 209,
  display_id: 8,
  owner: 1079,
  price: 100,
  name: "New Product",
  category: "The god of War",
  characteristics: "New Product Characteristics",
  features: "",
  brand: "New Product Brand",
  sku: [
    {
      id: 248,
      selling_price: 54,
      max_retail_price: 44,
      amount: 33,
      unit: "kg",
      quantity_in_inventory: 0,
      product: 209,
    },
    {
      id: 247,
      selling_price: 32,
      max_retail_price: 32,
      amount: 33,
      unit: "kg",
      quantity_in_inventory: 0,
      product: 209,
    },
    {
      id: 246,
      selling_price: 23,
      max_retail_price: 21,
      amount: 22,
      unit: "kg",
      quantity_in_inventory: 1,
      product: 209,
    },
  ],
  updated_on: "2024-05-24T12:46:41.995873Z",
  adding_date: "2024-05-24T12:46:41.995828Z",
};
let product2 = {
  id: 209,
  display_id: 8,
  owner: 1079,
  price: 210,
  name: "New Product",
  category: "The god of War",
  characteristics: "New Product Characteristics",
  features: "",
  brand: "New Product Brand",
  sku: [
    {
      id: 248,
      selling_price: 54,
      max_retail_price: 44,
      amount: 33,
      unit: "kg",
      quantity_in_inventory: 0,
      product: 209,
    },
    {
      id: 247,
      selling_price: 32,
      max_retail_price: 32,
      amount: 33,
      unit: "kg",
      quantity_in_inventory: 0,
      product: 209,
    },
    {
      id: 246,
      selling_price: 23,
      max_retail_price: 21,
      amount: 22,
      unit: "kg",
      quantity_in_inventory: 1,
      product: 209,
    },
  ],
  updated_on: "2024-05-24T12:46:41.995873Z",
  adding_date: "2024-05-24T12:46:41.995828Z",
};

let saleOrderList = [
  {
    id: 1,
    customer,
    product: product1,
  },
  {
    id: 2,
    customer,
    product: product2,
  },
];
app.post("/login", async (req, res) => {
  console.log("+hj");
  res.json({
    status: 200,
    message: "success",
  });
});
app.get("/sale-order", async (req, res) => {
  res.json({
    status: 200,
    message: "success",
    results: saleOrderList,
  });
});

app.listen(port, () => {
  console.log("Running on " + port);
});
