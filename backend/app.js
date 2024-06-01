// require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Include PATCH method
};

// Use CORS with the specified options
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies

let productList = [
  {
    id: 210,
    display_id: 9,
    owner: 1079,
    price: 100,
    name: "Product 5",
    category: "The god of War",
    characteristics: "Product 5 Characteristics",
    features: "",
    brand: "Product 5 Brand",
    sku: [
      {
        id: 249,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 210,
      },
      {
        id: 250,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 210,
      },
      {
        id: 251,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: "kg",
        quantity_in_inventory: 1,
        product: 210,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
  {
    id: 211,
    display_id: 10,
    owner: 1079,
    price: 100,
    name: "Stocked Product |",
    category: "The god of War",
    characteristics: "Stocked Product Characteristics",
    features: "",
    brand: "Stocked Product Brand",
    sku: [
      {
        id: 252,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 211,
      },
      {
        id: 253,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 211,
      },
      {
        id: 254,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: "kg",
        quantity_in_inventory: 1,
        product: 211,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
  {
    id: 212,
    display_id: 11,
    owner: 1079,
    price: 100,
    name: "Benoit Saint Denis",
    category: "The god of War",
    characteristics: "Benoit Saint Denis Characteristics",
    features: "",
    brand: "Benoit Saint Denis Brand",
    sku: [
      {
        id: 255,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 212,
      },
      {
        id: 256,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 212,
      },
      {
        id: 257,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: "kg",
        quantity_in_inventory: 1,
        product: 212,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
  {
    id: 213,
    display_id: 12,
    owner: 1079,
    price: 100,
    name: "Anonymous Product",
    category: "The god of War",
    characteristics: "Anonymous Product Characteristics",
    features: "",
    brand: "Anonymous Product Brand",
    sku: [
      {
        id: 258,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 213,
      },
      {
        id: 259,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 213,
      },
      {
        id: 260,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: "kg",
        quantity_in_inventory: 1,
        product: 213,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
  {
    id: 214,
    display_id: 13,
    owner: 1079,
    price: 100,
    name: "Stocked Tea 1",
    category: "The god of War",
    characteristics: "Stocked Tea 1 Characteristics",
    features: "",
    brand: "Stocked Tea 1 Brand",
    sku: [
      {
        id: 261,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 214,
      },
      {
        id: 262,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: "kg",
        quantity_in_inventory: 0,
        product: 214,
      },
    ],
    updated_on: "2024-05-24T12:46:41.995873Z",
    adding_date: "2024-05-24T12:46:41.995828Z",
  },
  {
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
];
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

// Get all products

app.get("/products", (req, res) => {
  res.json({
    status: 200,
    message: "success",
    results: productList,
  });
});

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
  setTimeout(() => {
    res.json({
      status: 200,
      message: "success",
      results: order,
    });
  }, 1000);
});

// Create a new sale order
app.post("/sale-order", (req, res) => {
  let productFound = productList.filter((p) => {
    if (p.id == req.body.product.id) return p;
  })[0];
  console.log({ productFound });
  const newOrder = {
    id: saleOrders.length + 1,
    product: {
      ...req.body.product,
      ...productFound,
    },
    customer: saleOrders[0].customer,
    // customer_profile: saleOrders[0].customer_profile,
  };
  saleOrders.push(newOrder);
  res.status(201).json({
    status: 201,
    message: "Sale order created",
    results: newOrder,
  });
});

// Update an existing sale order
app.patch("/sale-order/:id", (req, res) => {
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

app.post("/login", async (req, res) => {
  console.log("+hj");
  setTimeout(() => {
    res.json({
      status: 200,
      message: "success",
    });
  }, 2000);
});
app.listen(port, () => {
  console.log("Running on " + port);
});
