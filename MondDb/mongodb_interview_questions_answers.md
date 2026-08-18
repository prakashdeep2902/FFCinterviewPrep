# MongoDB Interview Questions & Answers

> Short, interview-focused answers. Examples use the `payment`
> collection where possible.

## 1. How to run MongoDB on my shell?

Start the MongoDB server:

``` bash
mongod
```

Then open another terminal and connect:

``` bash
mongosh
```

For a local MongoDB server, the default connection is usually:

``` text
mongodb://localhost:27017
```

**Interview point:** `mongod` runs the MongoDB server; `mongosh` is the
shell used to interact with it.

------------------------------------------------------------------------

## 2. How to create a new collection?

``` javascript
use ecommerce

db.createCollection("payment")
```

MongoDB can also create the collection automatically when you insert the
first document:

``` javascript
db.payment.insertOne({ paymentId: "PAY1001", amount: 500 })
```

**Interview point:** Explicit creation is optional for normal
collections.

------------------------------------------------------------------------

## 3. What is `ObjectId`?

`ObjectId` is MongoDB's default unique identifier stored in the `_id`
field.

``` javascript
{
  _id: ObjectId("6892f4e0a1b2c3d4e5f67890"),
  paymentId: "PAY1001"
}
```

**Interview point:** An ObjectId is 12 bytes and contains
timestamp-related and uniqueness information.

------------------------------------------------------------------------

## 4. Why MongoDB over SQL?

MongoDB is useful when the application needs:

-   Flexible document structure
-   Rapid schema changes
-   Natural storage of nested data
-   Horizontal scaling through sharding

SQL databases are usually preferable for highly relational data and
complex relational queries.

**Interview answer:** "I choose MongoDB when flexible schema,
document-oriented data, and horizontal scalability are important. I
choose SQL when strong relational modeling and complex joins are the
priority."

------------------------------------------------------------------------

## 5. Embedding vs Referencing

**Embedding** stores related data inside the same document.

``` javascript
{
  name: "Prakash",
  address: {
    city: "Hyderabad",
    country: "India"
  }
}
```

**Referencing** stores related data separately and keeps an ID
reference.

``` javascript
{
  orderId: "O1",
  customerId: ObjectId("...")
}
```

**Interview point:** Embed when related data is small and usually
accessed together. Reference when related data is large, shared, or
grows independently.

------------------------------------------------------------------------

## 6. How does indexing work?

An index is a data structure that helps MongoDB find documents without
scanning the entire collection.

``` javascript
db.payment.createIndex({ paymentId: 1 })
```

Then:

``` javascript
db.payment.find({ paymentId: "PAY1006" })
```

MongoDB can use the index instead of scanning every document.

**Interview point:** Indexes improve reads but consume storage and can
make writes slightly more expensive.

------------------------------------------------------------------------

## 7. What is the Aggregation Pipeline?

It processes documents through multiple stages.

``` javascript
db.payment.aggregate([
  { $match: { status: "SUCCESS" } },
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" }
    }
  }
])
```

**Interview point:** The output of one stage becomes the input of the
next stage.

------------------------------------------------------------------------

## 8. Explain `$project`, `$sort`, and `$limit`

### `$project`

Selects or removes fields.

``` javascript
db.payment.aggregate([
  {
    $project: {
      _id: 0,
      paymentId: 1,
      amount: 1
    }
  }
])
```

### `$sort`

Sorts documents.

``` javascript
db.payment.aggregate([
  { $sort: { amount: -1 } }
])
```

`1` = ascending, `-1` = descending.

### `$limit`

Limits the number of returned documents.

``` javascript
db.payment.aggregate([
  { $sort: { amount: -1 } },
  { $limit: 3 }
])
```

**Interview point:** `$project` controls fields, `$sort` controls order,
`$limit` controls result count.

------------------------------------------------------------------------

## 9. `$lookup` vs `populate()`

`$lookup` is a MongoDB aggregation stage used to join collections.

``` javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  }
])
```

`populate()` is a Mongoose feature:

``` javascript
Order.find().populate("customerId")
```

**Interview point:** `$lookup` is a MongoDB feature; `populate()` is a
Mongoose feature.

------------------------------------------------------------------------

## 10. How do transactions work?

A transaction groups multiple operations into one unit. Either all
operations are committed or all are rolled back.

Typical flow:

``` text
Start Transaction
      ↓
Create Order
      ↓
Update Stock
      ↓
Create Payment
      ↓
Commit
```

If something fails:

``` text
Abort → Rollback
```

**Interview point:** Transactions are useful when multiple operations
must remain consistent.

------------------------------------------------------------------------

## 11. What is a Replica Set?

A Replica Set is a group of MongoDB servers maintaining copies of the
same data.

``` text
          Primary
         /       \
   Secondary   Secondary
```

-   Primary handles writes by default.
-   Secondaries replicate the primary.
-   If the primary fails, an eligible secondary can become primary.

**Interview point:** Replica Sets provide high availability and
automatic failover.

------------------------------------------------------------------------

## 12. What is Sharding?

Sharding distributes data across multiple servers.

``` text
Shard 1 → part of data
Shard 2 → part of data
Shard 3 → part of data
```

A **shard key** determines how documents are distributed.

**Interview point:** Replica Set = copies data for availability.
Sharding = distributes data for horizontal scalability.

------------------------------------------------------------------------

## 13. How do you optimize slow queries?

Main techniques:

1.  Create appropriate indexes.
2.  Use `explain("executionStats")`.
3.  Return only required fields.
4.  Avoid unnecessary `$lookup`.
5.  Avoid full collection scans.
6.  Use efficient pagination.

Example:

``` javascript
db.payment.find({
  paymentId: "PAY1006"
}).explain("executionStats")
```

Look for:

``` text
COLLSCAN → collection scan
IXSCAN   → index scan
```

**Interview point:** Always analyze the actual query with `explain()`
before adding indexes blindly.

------------------------------------------------------------------------

## 14. What is a Covered Query?

A covered query can be answered entirely from an index without reading
the actual documents.

Create an index:

``` javascript
db.payment.createIndex({
  paymentId: 1,
  amount: 1
})
```

Query:

``` javascript
db.payment.find(
  { paymentId: "PAY1006" },
  { _id: 0, paymentId: 1, amount: 1 }
)
```

The filter and returned fields are available in the index.

**Interview point:** Covered queries can reduce document reads and
improve performance.

------------------------------------------------------------------------

## 15. Difference between `updateOne()` and `replaceOne()`

`updateOne()` modifies selected fields:

``` javascript
db.payment.updateOne(
  { paymentId: "PAY1006" },
  { $set: { status: "FAILED" } }
)
```

`replaceOne()` replaces the entire document except `_id`:

``` javascript
db.payment.replaceOne(
  { paymentId: "PAY1006" },
  {
    paymentId: "PAY1006",
    amount: 999,
    status: "FAILED"
  }
)
```

Fields not included in the replacement are removed.

**Interview point:** `updateOne()` = partial update; `replaceOne()` =
complete replacement.

------------------------------------------------------------------------

## 16. Difference between `deleteOne()` and `findOneAndDelete()`

`deleteOne()` deletes the first matching document and returns a delete
result.

``` javascript
db.payment.deleteOne({
  paymentId: "PAY1006"
})
```

`findOneAndDelete()` deletes the matching document and returns the
deleted document.

``` javascript
db.payment.findOneAndDelete({
  paymentId: "PAY1006"
})
```

**Interview point:** Use `findOneAndDelete()` when you need the deleted
document.

------------------------------------------------------------------------

## 17. What is the purpose of `lean()` in Mongoose?

`lean()` tells Mongoose to return plain JavaScript objects instead of
full Mongoose documents.

``` javascript
const payments = await Payment.find().lean();
```

It is useful for read-only operations because it generally uses less
memory and has less Mongoose document overhead.

**Interview point:** Use `lean()` when you only need to read/return data
and don't need document methods or `.save()`.

------------------------------------------------------------------------

## 18. How do you paginate large collections?

### Offset pagination

``` javascript
db.payment.find()
  .skip(20)
  .limit(10)
```

Simple, but large `skip()` values can become inefficient.

### Cursor-based pagination

``` javascript
db.payment.find({
  _id: { $gt: lastId }
}).limit(10)
```

**Interview point:** For large collections, cursor-based pagination
using an indexed, stable field is usually more scalable.

------------------------------------------------------------------------

## 19. How do you prevent duplicate documents?

Use a unique index.

``` javascript
db.payment.createIndex(
  { paymentId: 1 },
  { unique: true }
)
```

A duplicate insert then produces a duplicate-key error.

**Interview point:** Database-level unique constraints are safer than
checking for duplicates in application code first.

------------------------------------------------------------------------

## 20. How would you model users and orders in MongoDB?

Use separate collections and reference the user from the order.

``` javascript
// users
{
  _id: ObjectId("U1"),
  name: "Prakash"
}

// orders
{
  _id: ObjectId("O1"),
  userId: ObjectId("U1"),
  totalAmount: 1500,
  status: "DELIVERED"
}
```

**Interview point:** User → Orders is a one-to-many relationship. Orders
can grow independently, so referencing is usually appropriate.

------------------------------------------------------------------------

## 21. What are MongoDB's limitations?

Important limitations/trade-offs:

-   Complex joins are generally less natural than in relational
    databases.
-   Flexible schemas can lead to inconsistent document structures if not
    controlled.
-   Indexes consume storage and add write overhead.
-   Poorly designed documents can create duplication or large documents.
-   Transactions across multiple documents have more overhead than
    simple single-document operations.

**Interview point:** MongoDB is not automatically better than SQL; the
choice depends on the application's data model and consistency/query
requirements.

------------------------------------------------------------------------

## 22. What is a Cluster?

A cluster is the MongoDB deployment environment consisting of database
server resources working together.

In MongoDB Atlas, your database is deployed as a cluster.

A cluster can use replica sets and, for sharded deployments, multiple
shards.

**Interview point:** Cluster is the overall deployment; Replica Set and
Sharding describe different ways MongoDB provides availability and
scalability.

------------------------------------------------------------------------

## 23. Shared vs Dedicated Cluster

### Shared

-   Resources are shared with other workloads.
-   Lower cost.
-   Good for learning, development, and small workloads.

### Dedicated

-   Dedicated compute resources.
-   More predictable performance.
-   Used for production workloads.

**Interview point:** Shared = lower cost/shared resources. Dedicated =
dedicated resources/better predictable performance.

------------------------------------------------------------------------

# Practical MongoDB Query Questions & Answers

## 24. How do I create a customer collection that refers to product and payment?

A scalable e-commerce design is usually:

``` text
Customer
   ↓
Order
 ↙    ↘
Product Payment
```

Example order:

``` javascript
{
  _id: ObjectId("O1"),
  customerId: ObjectId("C1"),
  productId: ObjectId("P1"),
  paymentId: ObjectId("PAY1")
}
```

**Interview point:** Use an `orders` collection as the relationship
between customer, product, and payment instead of putting an
ever-growing list of product/payment IDs inside the customer document.

------------------------------------------------------------------------

## 25. Find the total number of SUCCESS payments

``` javascript
db.payment.countDocuments({
  status: "SUCCESS"
})
```

Or using aggregation:

``` javascript
db.payment.aggregate([
  { $match: { status: "SUCCESS" } },
  { $count: "totalSuccessPayments" }
])
```

**Interview point:** `countDocuments()` is simple when you only need the
count.

------------------------------------------------------------------------

## 26. Find the total number of records whose amount is greater than 250

``` javascript
db.payment.countDocuments({
  amount: { $gt: 250 }
})
```

With aggregation:

``` javascript
db.payment.aggregate([
  { $match: { amount: { $gt: 250 } } },
  { $count: "totalRecords" }
])
```

**Interview point:** `$gt` means greater than.

------------------------------------------------------------------------

## 27. How do I check execution time and query stage?

``` javascript
const result = db.payment.find({
  paymentId: "PAY1006"
}).explain("executionStats");

print("Execution Time:",
  result.executionStats.executionTimeMillis,
  "ms"
);

printjson(result.queryPlanner.winningPlan);
```

Look for:

``` text
COLLSCAN
```

or:

``` text
IXSCAN
```

**Interview point:** `executionTimeMillis` shows execution time;
`COLLSCAN` means collection scan and `IXSCAN` indicates index usage.

------------------------------------------------------------------------

## 28. How do I remove an index?

First see indexes:

``` javascript
db.payment.getIndexes()
```

Then drop a specific index by name:

``` javascript
db.payment.dropIndex("paymentId_1")
```

**Interview point:** You drop an index from the collection, not from an
individual document.

------------------------------------------------------------------------

## 29. How do I test indexing before and after?

Before creating the index:

``` javascript
db.payment.find({
  paymentId: "PAY1006"
}).explain("executionStats")
```

Check for `COLLSCAN`.

Create the index:

``` javascript
db.payment.createIndex({
  paymentId: 1
})
```

Run the query again:

``` javascript
db.payment.find({
  paymentId: "PAY1006"
}).explain("executionStats")
```

Check for `IXSCAN`.

**Interview point:** With only 10 documents, execution time may not
visibly improve. `COLLSCAN` vs `IXSCAN` is more useful for demonstrating
index usage.

------------------------------------------------------------------------

## 30. Find the top 5 highest payment amounts

``` javascript
db.payment.find()
  .sort({ amount: -1 })
  .limit(5)
```

**Interview point:** `-1` means descending.

------------------------------------------------------------------------

## 31. Return only `paymentId`, `amount`, and `status`

``` javascript
db.payment.find(
  {},
  {
    _id: 0,
    paymentId: 1,
    amount: 1,
    status: 1
  }
)
```

**Interview point:** This is projection. `1` includes a field and `0`
excludes it.

------------------------------------------------------------------------

## 32. Count payments by status

``` javascript
db.payment.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])
```

Example output:

``` javascript
[
  { _id: "SUCCESS", count: 6 },
  { _id: "FAILED", count: 2 },
  { _id: "PENDING", count: 1 }
]
```

**Interview point:** `$group` groups documents based on an expression.

------------------------------------------------------------------------

## 33. Find the average payment amount for successful payments

``` javascript
db.payment.aggregate([
  {
    $match: {
      status: "SUCCESS"
    }
  },
  {
    $group: {
      _id: null,
      averageAmount: { $avg: "$amount" }
    }
  }
])
```

**Interview point:** `$avg` calculates the average of a numeric field.

------------------------------------------------------------------------

## 34. Find the highest payment amount

Using aggregation:

``` javascript
db.payment.aggregate([
  {
    $group: {
      _id: null,
      highestAmount: { $max: "$amount" }
    }
  }
])
```

Or:

``` javascript
db.payment.find()
  .sort({ amount: -1 })
  .limit(1)
```

**Interview point:** `$max` is useful when calculating a value as part
of an aggregation.

------------------------------------------------------------------------

## 35. Find payments between August 1 and August 5, 2026

``` javascript
db.payment.find({
  createdAt: {
    $gte: new Date("2026-08-01T00:00:00Z"),
    $lt: new Date("2026-08-06T00:00:00Z")
  }
})
```

Using `$lt` on the next day avoids problems with the time component of
August 5.

**Interview point:** For date ranges, use a lower bound and an exclusive
upper bound when possible.

------------------------------------------------------------------------

# Bonus Interview Queries

## 36. Find duplicate `paymentId` values

``` javascript
db.payment.aggregate([
  {
    $group: {
      _id: "$paymentId",
      count: { $sum: 1 }
    }
  },
  {
    $match: {
      count: { $gt: 1 }
    }
  }
])
```

**Interview point:** Group by the field and filter groups whose count is
greater than 1.

------------------------------------------------------------------------

## 37. Get the latest 5 payments

``` javascript
db.payment.find()
  .sort({ createdAt: -1 })
  .limit(5)
```

**Interview point:** Sort newest first using `-1`.

------------------------------------------------------------------------

## 38. Find payments using UPI or Credit Card

``` javascript
db.payment.find({
  method: {
    $in: ["UPI", "Credit Card"]
  }
})
```

**Interview point:** `$in` matches any value from the provided array.

------------------------------------------------------------------------

## 39. Find total amount grouped by payment method

``` javascript
db.payment.aggregate([
  {
    $group: {
      _id: "$method",
      totalAmount: {
        $sum: "$amount"
      }
    }
  }
])
```

Example:

``` javascript
[
  { _id: "UPI", totalAmount: 1738.98 },
  { _id: "Credit Card", totalAmount: 1648 },
  { _id: "Debit Card", totalAmount: 6298.49 }
]
```

**Interview point:** `$group` + `$sum` is one of the most common
aggregation patterns.

------------------------------------------------------------------------

## 40. Find the top 3 payment methods by total transaction amount

``` javascript
db.payment.aggregate([
  {
    $group: {
      _id: "$method",
      totalAmount: {
        $sum: "$amount"
      }
    }
  },
  {
    $sort: {
      totalAmount: -1
    }
  },
  {
    $limit: 3
  }
])
```

**Interview point:** Common pipeline pattern:

``` text
$group → $sort → $limit
```

------------------------------------------------------------------------

# Most Important Interview Cheat Sheet

  Concept             Remember
  ------------------- -------------------------------------
  `find()`            Read documents
  `insertOne()`       Insert one document
  `updateOne()`       Update selected fields
  `replaceOne()`      Replace whole document
  `deleteOne()`       Delete one matching document
  `ObjectId`          Default `_id` identifier
  Index               Faster reads
  `COLLSCAN`          Collection scan
  `IXSCAN`            Index scan
  `$match`            Filter
  `$group`            Group/calculations
  `$project`          Select/remove fields
  `$sort`             Sort
  `$limit`            Limit results
  `$lookup`           Join collections
  `$count`            Count documents
  `$sum`              Calculate total
  `$avg`              Calculate average
  `$max`              Find maximum
  `$in`               Match any value in array
  `$gt`               Greater than
  `$gte`              Greater than or equal
  `$lt`               Less than
  `$lte`              Less than or equal
  `lean()`            Return plain JS objects in Mongoose
  Unique Index        Prevent duplicates
  Transaction         All-or-nothing operations
  Replica Set         High availability/failover
  Sharding            Horizontal scaling
  Cursor Pagination   Scalable pagination
  Covered Query       Query answered entirely from index

# 10 Questions You Should Be Able to Write Without Help

1.  Find all successful payments.
2.  Find payments with amount greater than 1000.
3.  Find UPI successful payments.
4.  Get the top 5 payments by amount.
5.  Return only `paymentId`, `amount`, and `status`.
6.  Find total successful payment amount.
7.  Count payments by status.
8.  Find average successful payment amount.
9.  Find latest 5 payments.
10. Group total payment amount by payment method.
