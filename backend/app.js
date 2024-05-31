// require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json()); // To parse JSON bodies

let saleOrders = [
  {
    id: 1,
    customer: {
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
    },
    product: {
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
    },
  },
  {
    id: 2,
    customer: {
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
    },
    product: {
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
    },
  },
];

// Get all sale orders
app.get("/sale-order", (req, res) => {
  res.json({
    status: 200,
    message: "success",
    results: saleOrders,
  });
});

// Get a specific sale order by ID
app.get("/sale-order/:id", (req, res) => {
  const order = saleOrders.find((o) => o.id === parseInt(req.params.id));
  if (!order)
    return res
      .status(404)
      .json({ status: 404, message: "Sale order not found" });

  res.json({
    status: 200,
    message: "success",
    results: order,
  });
});

// Create a new sale order
app.post("/sale-order", (req, res) => {
  const newOrder = {
    id: saleOrders.length + 1,
    ...req.body,
  };
  saleOrders.push(newOrder);
  res.status(201).json({
    status: 201,
    message: "Sale order created",
    results: newOrder,
  });
});

// Update an existing sale order
app.put("/sale-order/:id", (req, res) => {
  const order = saleOrders.find((o) => o.id === parseInt(req.params.id));
  if (!order)
    return res
      .status(404)
      .json({ status: 404, message: "Sale order not found" });

  const updatedOrder = {
    ...order,
    ...req.body,
  };
  const index = saleOrders.indexOf(order);
  saleOrders[index] = updatedOrder;

  res.json({
    status: 200,
    message: "Sale order updated",
    results: updatedOrder,
  });
});

// Delete a sale order
app.delete("/sale-order/:id", (req, res) => {
  const order = saleOrders.find((o) => o.id === parseInt(req.params.id));
  if (!order)
    return res
      .status(404)
      .json({ status: 404, message: "Sale order not found" });

  saleOrders = saleOrders.filter((o) => o.id !== parseInt(req.params.id));

  res.json({
    status: 200,
    message: "Sale order deleted",
  });
});

app.listen(port, () => {
  console.log("Running on " + port);
});
