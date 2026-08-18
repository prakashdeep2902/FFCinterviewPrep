# Production Error-Handling Interview Questions — Backend

This document collects the production-focused questions discussed in the interview practice session.

For each question:
- **Question/code**
- **2 main production/business issues**
- **Explanation**
- **Corrected production-oriented code**

> Generic concerns such as try/catch, logging, and response formatting are intentionally not treated as the two main answers unless they are the core issue.

---

## 1. Create User

### Question

```javascript
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});
```

### 2 Main Issues

1. **Mass assignment / unwanted fields**
2. **Duplicate-user race condition**

### Explanation

**1. Mass assignment:** Passing `req.body` directly to `User.create()` allows clients to submit fields they should not control, such as `role`, `isAdmin`, or `isVerified`. Whitelist only fields allowed during registration.

**2. Duplicate-user race condition:** Checking `findOne()` before inserting is not enough because two requests can check at the same time and both see no user. A database-level unique constraint on email is required, and the duplicate-key error must be handled.

### Corrected Code

```javascript
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});
```

Also create a unique database index on `email`.

---

## 2. Login

### Question

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

### 2 Main Issues

1. **Password is being compared/stored as plain text**
2. **No brute-force protection / rate limiting**

### Explanation

**1. Plain-text password:** Passwords should never be queried directly against a stored plain-text password. Store a bcrypt/Argon2 hash and use `bcrypt.compare()`.

**2. Brute-force attacks:** An attacker can repeatedly submit passwords. Login should be protected with rate limiting and, depending on requirements, temporary account lockout after repeated failures.

### Corrected Code

```javascript
app.post("/login", loginRateLimiter, async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { accessToken }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});
```

---

## 3. Payment

### Question

```javascript
async function pay(req, res) {
  await Wallet.updateOne(
    { _id: req.body.userId },
    { $inc: { balance: -500 } }
  );

  await Orders.create({
    userId: req.body.userId,
    amount: 500,
  });

  res.send("Success");
}
```

### 2 Main Issues

1. **No database transaction**
2. **No idempotency**

### Explanation

**1. Transaction:** Wallet deduction and order creation must succeed or fail together. Otherwise money can be deducted while order creation fails.

**2. Idempotency:** A client retry or double-click can process the same payment twice. An idempotency key with a unique database constraint prevents duplicate processing.

### Corrected Code

```javascript
async function pay(req, res) {
  const session = await mongoose.startSession();

  try {
    const { amount, idempotencyKey } = req.body;
    const userId = req.user.id;

    session.startTransaction();

    const existingPayment = await Payment.findOne({
      idempotencyKey
    }).session(session);

    if (existingPayment) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Payment already processed"
      });
    }

    const wallet = await Wallet.findOneAndUpdate(
      {
        userId,
        balance: { $gte: amount }
      },
      {
        $inc: { balance: -amount }
      },
      {
        new: true,
        session
      }
    );

    if (!wallet) {
      throw new Error("Insufficient balance");
    }

    const order = await Order.create(
      [{
        userId,
        amount,
        status: "SUCCESS"
      }],
      { session }
    );

    await Payment.create(
      [{
        userId,
        amount,
        orderId: order[0]._id,
        idempotencyKey,
        status: "SUCCESS"
      }],
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      data: order[0]
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: "Payment failed"
    });
  } finally {
    session.endSession();
  }
}
```

---

## 4. Money Transfer

### Question

```javascript
async function transfer(req, res) {
  await Wallet.updateOne(
    { _id: req.body.from },
    { $inc: { balance: -100 } }
  );

  await Wallet.updateOne(
    { _id: req.body.to },
    { $inc: { balance: 100 } }
  );

  res.send("Done");
}
```

### 2 Main Issues

1. **No transaction**
2. **No idempotency**

### Explanation

**1. Transaction:** Debit and credit are one logical money movement. If debit succeeds and credit fails, money disappears.

**2. Idempotency:** Retried requests can debit and credit the accounts multiple times. The transfer needs a unique idempotency key.

Additional important production checks include sufficient balance, authenticated sender, valid receiver, and atomic balance updates.

### Corrected Code

```javascript
async function transfer(req, res) {
  const session = await mongoose.startSession();

  try {
    const { to, amount, idempotencyKey } = req.body;
    const from = req.user.id;

    if (from === to) {
      return res.status(400).json({
        success: false,
        message: "Cannot transfer to yourself"
      });
    }

    session.startTransaction();

    const existing = await Transfer.findOne({
      idempotencyKey
    }).session(session);

    if (existing) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Transfer already processed"
      });
    }

    const receiver = await Wallet.findOne({
      userId: to
    }).session(session);

    if (!receiver) {
      throw new Error("Receiver wallet not found");
    }

    const sender = await Wallet.findOneAndUpdate(
      {
        userId: from,
        balance: { $gte: amount }
      },
      {
        $inc: { balance: -amount }
      },
      {
        new: true,
        session
      }
    );

    if (!sender) {
      throw new Error("Insufficient balance");
    }

    await Wallet.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );

    const transfer = await Transfer.create(
      [{
        from,
        to,
        amount,
        status: "SUCCESS",
        idempotencyKey
      }],
      { session }
    );

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      data: transfer[0]
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: "Transfer failed"
    });
  } finally {
    session.endSession();
  }
}
```

---

## 5. Product Search

### Question

```javascript
app.get("/search", async (req, res) => {
  const products = await Product.find({
    name: new RegExp(req.query.q),
  });

  res.json(products);
});
```

### 2 Main Issues

1. **User-controlled regex can cause ReDoS/expensive regex execution**
2. **Poor scalability without an appropriate search index**

### Explanation

**1. Regex risk:** Directly converting user input into a regular expression allows regex metacharacters and potentially expensive patterns. Escape user input if regex is actually required.

**2. Search scalability:** Regex search, especially contains-style regex, can force collection scans and become expensive on large product catalogs. Use an appropriate index or a dedicated search engine such as Elasticsearch/OpenSearch for advanced search.

### Corrected Code

For a simple MongoDB implementation:

```javascript
import escapeStringRegexp from "escape-string-regexp";

app.get("/search", async (req, res) => {
  const q = req.query.q?.trim();

  if (!q || q.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Invalid search query"
    });
  }

  const safeRegex = new RegExp(
    escapeStringRegexp(q),
    "i"
  );

  const products = await Product.find({
    name: safeRegex
  })
    .limit(20)
    .lean();

  return res.json({
    success: true,
    data: products
  });
});
```

For a large catalog, prefer a proper text/search index or Elasticsearch/OpenSearch.

---

## 6. Bulk Email with Promise.all

### Question

```javascript
const users = await User.find();

await Promise.all(
  users.map(async (user) => {
    await sendEmail(user.email);
  }),
);
```

### 2 Main Issues

1. **Uncontrolled concurrency**
2. **No retry mechanism**

### Explanation

**1. Uncontrolled concurrency:** One million users means potentially one million pending promises and concurrent provider requests. This can consume memory and overwhelm the email provider.

Use a queue and workers with controlled concurrency.

**2. Retry:** Temporary provider failures such as `429` or `503` should not permanently lose the email. Use retries with exponential backoff and a dead-letter queue.

### Corrected Code

```javascript
// Producer
async function enqueueEmails() {
  const cursor = User.find().cursor();

  for await (const user of cursor) {
    await emailQueue.add(
      "send-email",
      { userId: user._id, email: user.email },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 1000
        }
      }
    );
  }
}
```

Worker:

```javascript
const worker = new Worker(
  "email",
  async (job) => {
    await sendEmail(job.data.email);
  },
  {
    concurrency: 20
  }
);
```

The exact queue library can be BullMQ, RabbitMQ, SQS, etc.

---

## 7. S3 File Upload

### Question

```javascript
app.post("/upload", upload.single("image"), async (req, res) => {
  await uploadToS3(req.file);

  res.send("Uploaded");
});
```

### 2 Main Issues

1. **No file validation / size restriction**
2. **Backend is unnecessarily in the upload path**

### Explanation

**1. File validation:** Users could upload unexpected or malicious file types or extremely large files. Validate allowed content types and enforce a size limit. For higher-security systems, also consider content inspection/antivirus scanning.

**2. Scalability:** Sending large files through the Node server consumes server bandwidth and keeps requests open. Prefer an S3 pre-signed URL so the client uploads directly to S3.

### Corrected Code

Backend generates a pre-signed URL:

```javascript
app.post("/upload-url", async (req, res) => {
  const { fileName, contentType, fileSize } = req.body;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  const MAX_SIZE = 5 * 1024 * 1024;

  if (!allowedTypes.includes(contentType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid file type"
    });
  }

  if (fileSize > MAX_SIZE) {
    return res.status(400).json({
      success: false,
      message: "File is too large"
    });
  }

  const key = `images/${crypto.randomUUID()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType
  });

  const uploadUrl = await getSignedUrl(
    s3,
    command,
    { expiresIn: 300 }
  );

  return res.json({
    uploadUrl,
    key
  });
});
```

The client then uploads directly to S3.

---

## 8. Orders List API

### Question

```javascript
app.get("/orders", async (req, res) => {
  const orders = await Order.find();

  res.json(orders);
});
```

### 2 Main Issues

1. **No pagination**
2. **No authorization/data isolation**

### Explanation

**1. Pagination:** `find()` can return millions of orders, causing slow queries, huge responses, and high memory usage. Use cursor-based pagination for large datasets.

**2. Authorization:** A customer must not receive every customer's orders. Filter using the authenticated user ID; only privileged users should be able to query all orders.

### Corrected Code

```javascript
app.get("/orders", async (req, res) => {
  const limit = Math.min(
    Number(req.query.limit) || 20,
    100
  );

  const query = {
    userId: req.user.id
  };

  if (req.query.cursor) {
    query._id = { $lt: req.query.cursor };
  }

  const orders = await Order.find(query)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .lean();

  const hasMore = orders.length > limit;

  if (hasMore) {
    orders.pop();
  }

  return res.json({
    data: orders,
    nextCursor: hasMore
      ? orders[orders.length - 1]._id
      : null
  });
});
```

Admin access should use a separate authorization rule to allow all orders.

---

## 9. Profile Update

### Question

```javascript
app.put("/profile", async (req, res) => {
  await User.updateOne(
    { _id: req.user.id },
    req.body
  );

  res.send("Updated");
});
```

### 2 Main Issues

1. **Mass assignment**
2. **No input validation**

### Explanation

**1. Mass assignment:** `req.body` lets the client attempt to update protected fields such as `role`, `isAdmin`, or verification flags.

**2. Validation:** Editable values need validation before entering the database.

### Corrected Code

```javascript
app.put("/profile", async (req, res) => {
  const { name, phone, bio } = req.body;

  if (name && name.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Invalid name"
    });
  }

  await User.updateOne(
    { _id: req.user.id },
    {
      $set: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(bio !== undefined && { bio })
      }
    }
  );

  return res.json({
    success: true,
    message: "Profile updated"
  });
});
```

---

## 10. Product Purchase

### Question

```javascript
async function buy(req, res) {
  const product = await Product.findById(req.body.id);

  product.stock--;

  await product.save();

  res.send("Purchased");
}
```

### 2 Main Issues

1. **Race condition / overselling**
2. **No atomic stock validation**

### Explanation

If stock is `1` and two requests read `1` at the same time, both can purchase. The read-modify-write pattern is unsafe for inventory.

Use an atomic update that only decrements when stock is greater than zero.

### Corrected Code

```javascript
async function buy(req, res) {
  const product = await Product.findOneAndUpdate(
    {
      _id: req.body.id,
      stock: { $gt: 0 }
    },
    {
      $inc: { stock: -1 }
    },
    {
      new: true
    }
  );

  if (!product) {
    return res.status(409).json({
      success: false,
      message: "Product is out of stock"
    });
  }

  return res.json({
    success: true,
    message: "Purchased"
  });
}
```

For a real checkout flow, inventory reservation/order/payment consistency may also require a transaction.

---

## 11. Redis Product Cache

### Question

```javascript
app.get("/products", async (req, res) => {
  const data = await redis.get("products");

  if (data) {
    return res.json(JSON.parse(data));
  }

  const products = await Product.find();

  await redis.set(
    "products",
    JSON.stringify(products)
  );

  res.json(products);
});
```

### 2 Main Issues

1. **No cache invalidation / TTL**
2. **Cache stampede**

### Explanation

**1. Stale data:** When products change, the cached value can remain stale forever. Use TTL and/or invalidate the relevant key when product data changes.

**2. Cache stampede:** When the cache is missing or expires, thousands of requests can all hit MongoDB and rebuild the same cache simultaneously. Use a distributed lock/single-flight approach or background refresh.

### Corrected Code

```javascript
app.get("/products", async (req, res) => {
  const cacheKey = "products";

  const cached = await redis.get(cacheKey);

  if (cached) {
    return res.json(JSON.parse(cached));
  }

  const lockKey = `${cacheKey}:lock`;

  const lock = await redis.set(
    lockKey,
    "1",
    { NX: true, EX: 10 }
  );

  if (lock) {
    try {
      const products = await Product.find().lean();

      await redis.set(
        cacheKey,
        JSON.stringify(products),
        { EX: 300 }
      );

      return res.json(products);
    } finally {
      await redis.del(lockKey);
    }
  }

  // Another request is rebuilding the cache.
  // In production, wait briefly/retry or serve stale data.
  await new Promise(resolve => setTimeout(resolve, 100));

  const retry = await redis.get(cacheKey);

  if (retry) {
    return res.json(JSON.parse(retry));
  }

  return res.status(503).json({
    success: false,
    message: "Please retry"
  });
});
```

For production Redis locking, use a robust distributed-lock implementation rather than a simplistic lock when multiple Redis nodes/failure modes matter.

---

## 12. JWT

### Question

```javascript
const token = jwt.sign(
  {
    id: user._id,
  },
  "secret123",
);
```

### 2 Main Issues

1. **Hardcoded JWT secret**
2. **No token expiration**

### Explanation

**1. Hardcoded secret:** Anyone who obtains source code containing the secret can potentially forge tokens. Use environment variables or a secret manager.

**2. No expiry:** A stolen token can remain valid indefinitely. Use short-lived access tokens and refresh-token rotation/session management where appropriate.

### Corrected Code

```javascript
const token = jwt.sign(
  {
    id: user._id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "15m"
  }
);
```

---

## 13. Sequential Notifications

### Question

```javascript
async function notify(users) {
  for (const user of users) {
    await sendNotification(user);
  }
}
```

### 2 Main Issues

1. **Sequential processing does not scale**
2. **No retry mechanism**

### Explanation

**1. Sequential processing:** Every notification waits for the previous one. Large audiences can take hours. Use a queue and multiple workers with controlled concurrency.

**2. Retry:** Temporary failures from FCM/APNs/SMS providers can cause lost notifications. Use retries with exponential backoff and a dead-letter queue.

### Corrected Code

```javascript
async function enqueueNotifications(users) {
  for (const user of users) {
    await notificationQueue.add(
      "send-notification",
      { userId: user.id },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 1000
        }
      }
    );
  }
}

const worker = new Worker(
  "notifications",
  async (job) => {
    const user = await User.findById(job.data.userId);

    if (!user) {
      return;
    }

    await sendNotification(user);
  },
  {
    concurrency: 20
  }
);
```

---

## 14. Reports API

### Question

```javascript
app.get("/report", async (req, res) => {
  const reports = await Report.find();

  res.json(reports);
});
```

### 2 Main Issues

1. **No pagination/streaming**
2. **No authorization**

### Explanation

**1. Pagination:** Loading every report becomes expensive as data grows. Use pagination or streaming for very large report exports.

**2. Authorization:** Reports may contain confidential information. Users should only access reports permitted by their role/ownership.

### Corrected Code

```javascript
app.get("/report", async (req, res) => {
  const limit = Math.min(
    Number(req.query.limit) || 20,
    100
  );

  const reports = await Report.find({
    createdBy: req.user.id
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return res.json({
    success: true,
    data: reports
  });
});
```

For admin users, use explicit authorization to permit broader access.

---

## 15. Cron Processing Pending Orders

### Question

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

### 2 Main Issues

1. **Duplicate execution in multi-instance deployments**
2. **Sequential processing does not scale**

### Explanation

**1. Duplicate execution:** If the application runs on multiple servers, every instance can run the cron and process the same order. Use a distributed lock or move jobs to a queue.

**2. Sequential processing:** Processing every pending order one by one can take longer than the cron interval, causing overlapping executions. Use a queue with controlled worker concurrency.

### Corrected Code

```javascript
cron.schedule("* * * * *", async () => {
  const lock = await redis.set(
    "pending-orders-cron-lock",
    "1",
    { NX: true, EX: 50 }
  );

  if (!lock) {
    return;
  }

  try {
    const orders = await Order.find({
      status: "PENDING"
    })
      .limit(100)
      .lean();

    for (const order of orders) {
      await orderQueue.add(
        "process-order",
        { orderId: order._id },
        {
          jobId: `order-${order._id}`,
          attempts: 5,
          backoff: {
            type: "exponential",
            delay: 1000
          }
        }
      );
    }
  } finally {
    await redis.del("pending-orders-cron-lock");
  }
});
```

In a high-scale system, a queue/scheduler architecture is preferable to having every application instance perform business processing directly.

---

## 16. Change Password

### Question

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

### 2 Main Issues

1. **Password stored without hashing**
2. **Current password is not verified**

### Explanation

**1. Hashing:** Never store the raw password. Hash with bcrypt/Argon2 before saving.

**2. Current-password verification:** A valid session/token alone should not automatically allow a password change. Require the current password and verify it before replacing the password. For high-security applications, also consider re-authentication and session invalidation.

### Corrected Code

```javascript
app.post("/change-password", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const valid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Current password is incorrect"
    });
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12
  );

  await User.updateOne(
    { _id: req.user.id },
    { $set: { password: hashedPassword } }
  );

  return res.json({
    success: true,
    message: "Password updated successfully"
  });
});
```

---

## 17. Checkout

### Question

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

### 2 Main Issues

1. **No database transaction**
2. **No inventory validation / atomic stock update**

### Explanation

**1. Transaction:** Order creation and cart deletion are one logical checkout operation. If one succeeds and the other fails, the user's state becomes inconsistent. Use a transaction.

**2. Inventory:** The cart may contain products that are now out of stock. Multiple users can also try to buy the last item simultaneously. Validate and decrement stock atomically inside the transaction.

### Corrected Code

```javascript
app.post("/checkout", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({
      userId: req.user.id
    }).session(session);

    if (!cart) {
      throw new Error("Cart not found");
    }

    for (const item of cart.items) {
      const product = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.quantity }
        },
        {
          $inc: { stock: -item.quantity }
        },
        {
          new: true,
          session
        }
      );

      if (!product) {
        throw new Error(
          `Insufficient stock for product ${item.productId}`
        );
      }
    }

    const order = await Order.create(
      [{
        userId: req.user.id,
        items: cart.items,
        status: "CREATED"
      }],
      { session }
    );

    await Cart.deleteOne(
      { _id: cart._id },
      { session }
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      data: order[0]
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(409).json({
      success: false,
      message: error.message
    });
  } finally {
    session.endSession();
  }
});
```

---

# Quick Interview Revision Table

| Question | Main Issue 1 | Main Issue 2 |
|---|---|---|
| Create User | Mass assignment | Unique constraint / race condition |
| Login | Plain-text password | Brute-force/rate limiting |
| Payment | Transaction | Idempotency |
| Money Transfer | Transaction | Idempotency |
| Search | Regex/ReDoS | Search/index scalability |
| Bulk Email | Uncontrolled concurrency | Retry mechanism |
| S3 Upload | File validation | Direct-to-S3/scalability |
| Orders API | Pagination | Authorization |
| Profile Update | Mass assignment | Validation |
| Product Purchase | Race condition | Atomic stock validation |
| Redis Cache | Invalidation/TTL | Cache stampede |
| JWT | Hardcoded secret | No expiry |
| Notifications | Sequential processing | Retry mechanism |
| Reports API | Pagination/streaming | Authorization |
| Cron | Duplicate execution | Queue/concurrency |
| Change Password | Password hashing | Current-password verification |
| Checkout | Transaction | Inventory/atomic stock |

---

# Interview Pattern to Remember

When you receive a code snippet in an interview, don't immediately start talking about generic `try/catch`.

First ask yourself:

1. **Can the same operation happen twice?** → Idempotency
2. **Can two requests modify the same data simultaneously?** → Race condition / atomic operation
3. **Can two database operations become inconsistent?** → Transaction
4. **Can a user access/modify someone else's data?** → Authorization
5. **Can the input control something dangerous?** → Validation / injection
6. **Can this become huge as data grows?** → Pagination / queue / indexing
7. **Can an external service fail temporarily?** → Retry / backoff / DLQ
8. **Can stale data be served?** → Cache invalidation / TTL

These are the core production-thinking patterns behind most of the questions you practiced.
