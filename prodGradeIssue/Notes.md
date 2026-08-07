Perfect. Here are **20 production debugging/scenario-based interview questions**. These are the kind of questions asked in companies like Razorpay, PhonePe, Swiggy, Zomato, CRED, Flipkart, Amazon, Walmart, and many product-based startups.

**Don't solve them now.** Try to identify **every possible production issue** in each snippet.

---

# Question 1 – User API

```javascript
app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});
```

> **Find all production issues.**

---

# Question 2 – Create User

```javascript
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});
```

> **Find all production issues.**

---

# Question 3 – Login

```javascript
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.send("Login Success");
  }

  res.send("Invalid");
});
```

> **Find all production issues.**

---

# Question 4 – Payment

```javascript
async function pay(req, res) {
  await Wallet.updateOne({ _id: req.body.userId }, { $inc: { balance: -500 } });

  await Orders.create({
    userId: req.body.userId,
    amount: 500,
  });

  res.send("Success");
}
```

> **Find all production issues.**

---

# Question 5 – Money Transfer

```javascript
async function transfer(req, res) {
  await Wallet.updateOne({ _id: req.body.from }, { $inc: { balance: -100 } });

  await Wallet.updateOne({ _id: req.body.to }, { $inc: { balance: 100 } });

  res.send("Done");
}
```

> **Find all production issues.**

---

# Question 6 – Delete Product

```javascript
app.delete("/product/:id", async (req, res) => {
  await Product.deleteOne({
    _id: req.params.id,
  });

  res.send("Deleted");
});
```

> **Find all production issues.**

---

# Question 7 – Search API

```javascript
app.get("/search", async (req, res) => {
  const products = await Product.find({
    name: new RegExp(req.query.q),
  });

  res.json(products);
});
```

> **Find all production issues.**

---

# Question 8 – Bulk Email

```javascript
const users = await User.find();

await Promise.all(
  users.map(async (user) => {
    await sendEmail(user.email);
  }),
);
```

> **Find all production issues.**

---

# Question 9 – Upload API

```javascript
app.post("/upload", upload.single("image"), async (req, res) => {
  await uploadToS3(req.file);

  res.send("Uploaded");
});
```

> **Find all production issues.**

---

# Question 10 – Orders API

```javascript
app.get("/orders", async (req, res) => {
  const orders = await Order.find();

  res.json(orders);
});
```

> **Find all production issues.**

---

# Question 11 – Update Profile

```javascript
app.put("/profile", async (req, res) => {
  await User.updateOne({ _id: req.user.id }, req.body);
  res.send("Updated");
});
```

> **Find all production issues.**

---

# Question 12 – Inventory

```javascript
async function buy(req, res) {
  const product = await Product.findById(req.body.id);

  product.stock--;

  await product.save();

  res.send("Purchased");
}
```

> **Find all production issues.**

---

# Question 13 – Register

```javascript
app.post("/register", async (req, res) => {
  const existing = await User.findOne({
    email: req.body.email,
  });

  if (existing) {
    return res.send("Already Exists");
  }

  await User.create(req.body);

  res.send("Success");
});
```

> **Find all production issues.**

---

# Question 14 – Cache

```javascript
app.get("/products", async (req, res) => {
  const data = await redis.get("products");

  if (data) {
    return res.json(JSON.parse(data));
  }

  const products = await Product.find();

  await redis.set("products", JSON.stringify(products));

  res.json(products);
});
```

> **Find all production issues.**

---

# Question 15 – JWT

```javascript
const token = jwt.sign(
  {
    id: user._id,
  },
  "secret123",
);
```

> **Find all production issues.**

---

# Question 16 – Notification Service

```javascript
async function notify(users) {
  for (const user of users) {
    await sendNotification(user);
  }
}
```

> **Find all production issues.**

---

# Question 17 – Download Report

```javascript
app.get("/report", async (req, res) => {
  const reports = await Report.find();

  res.json(reports);
});
```

> **Find all production issues.**

---

# Question 18 – Cron Job

```javascript
cron.schedule("* * * * *", async () => {
  const orders = await Order.find({
    status: "PENDING",
  });

  for (const order of orders) {
    await processOrder(order);
  }
});
```

> **Find all production issues.**

---

# Question 19 – Update Password

```javascript
app.post("/change-password", async (req, res) => {
  await User.updateOne(
    { _id: req.user.id },
    {
      password: req.body.password,
    },
  );

  res.send("Password Updated");
});
```

> **Find all production issues.**

---

# Question 20 – Checkout

```javascript
app.post("/checkout", async (req, res) => {
  const cart = await Cart.findOne({
    userId: req.user.id,
  });

  const order = await Order.create({
    items: cart.items,
  });

  await Cart.deleteOne({
    _id: cart._id,
  });

  res.json(order);
});
```

> **Find all production issues.**

---

These 20 questions cover the most common production topics interviewers test:

- Error handling
- Validation
- Authentication & authorization
- Race conditions
- Transactions
- Idempotency
- Performance
- Memory usage
- Security
- Concurrency
- Logging
- Retry mechanisms
- Caching
- Scalability
- Data consistency

If you can confidently identify production issues in all 20, you'll be well prepared for most **3+ years backend Node.js interviews**.
