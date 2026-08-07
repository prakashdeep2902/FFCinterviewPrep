app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// after refactor for production will look like

import express from "express";
import mongoose from "mongoose";

const app = express();

app.get("/users/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    // Authorization example
    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const user = await User.findById(id).select("-password -refreshToken -otp");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error({
      message: "Get User Failed",
      userId: req.params.id,
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// 2 questions

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

import bcrypt from "bcrypt";
import express from "express";
import User from "./models/User.js";
import logger from "./logger.js";

const app = express();

app.post("/users", async (req, res) => {
  try {
    // 1. Whitelist only expected fields
    const { name, email, password } = req.body;

    // 2. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // 4. Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    // 5. Check if user already exists
    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 8. Return only safe fields
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // 9. Handle duplicate email race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // 10. Log error
    logger.error({
      message: "User registration failed",
      error: error.message,
      stack: error.stack,
    });

    // 11. Generic response
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// 3 question

async function pay(req, res) {
  await Wallet.updateOne({ _id: req.body.userId }, { $inc: { balance: -500 } });

  await Orders.create({
    userId: req.body.userId,
    amount: 500,
  });

  res.send("Success");
}

// 3 answer

import mongoose from "mongoose";

async function pay(req, res) {
  const session = await mongoose.startSession();

  try {
    const { amount, idempotencyKey } = req.body;
    const userId = req.user.id; // Never trust req.body.userId

    session.startTransaction();

    // 1. Check if this payment was already processed
    const existingPayment = await Payment.findOne({
      idempotencyKey,
    }).session(session);

    if (existingPayment) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Payment already processed.",
      });
    }

    // 2. Deduct balance only if sufficient funds exist
    const wallet = await Wallet.findOneAndUpdate(
      {
        userId,
        balance: { $gte: amount },
      },
      {
        $inc: { balance: -amount },
      },
      {
        new: true,
        session,
      },
    );

    if (!wallet) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Insufficient balance.",
      });
    }

    // 3. Create Order
    const order = await Order.create(
      [
        {
          userId,
          amount,
          status: "SUCCESS",
        },
      ],
      { session },
    );

    // 4. Store Payment Record
    await Payment.create(
      [
        {
          userId,
          amount,
          orderId: order[0]._id,
          idempotencyKey,
          status: "SUCCESS",
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Payment Successful",
      data: order[0],
    });
  } catch (error) {
    await session.abortTransaction();

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: "Payment Failed",
    });
  } finally {
    session.endSession();
  }
}

// Q4) question

async function transfer(req, res) {
  await Wallet.updateOne({ _id: req.body.from }, { $inc: { balance: -100 } });

  await Wallet.updateOne({ _id: req.body.to }, { $inc: { balance: 100 } });

  res.send("Done");
}

// Q4 answers

import mongoose from "mongoose";

async function transfer(req, res) {
  const session = await mongoose.startSession();

  try {
    const { to, amount, idempotencyKey } = req.body;

    // Never trust req.body.from
    const from = req.user.id;

    session.startTransaction();

    // 1. Prevent duplicate transfer
    const existingTransfer = await Transfer.findOne({
      idempotencyKey,
    }).session(session);

    if (existingTransfer) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Transfer already processed.",
      });
    }

    // 2. Sender and receiver cannot be same
    if (from === to) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Cannot transfer to your own wallet.",
      });
    }

    // 3. Verify receiver exists
    const receiverWallet = await Wallet.findOne({
      userId: to,
    }).session(session);

    if (!receiverWallet) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Receiver wallet not found.",
      });
    }

    // 4. Debit sender atomically
    const senderWallet = await Wallet.findOneAndUpdate(
      {
        userId: from,
        balance: {
          $gte: amount,
        },
      },
      {
        $inc: {
          balance: -amount,
        },
      },
      {
        new: true,
        session,
      },
    );

    if (!senderWallet) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Insufficient balance.",
      });
    }

    // 5. Credit receiver
    await Wallet.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          balance: amount,
        },
      },
      {
        session,
      },
    );

    // 6. Store transfer history
    const transfer = await Transfer.create(
      [
        {
          from,
          to,
          amount,
          status: "SUCCESS",
          idempotencyKey,
        },
      ],
      {
        session,
      },
    );

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Transfer completed successfully.",
      data: transfer[0],
    });
  } catch (error) {
    await session.abortTransaction();

    logger.error(error);

    return res.status(500).json({
      success: false,
      message: "Transfer failed.",
    });
  } finally {
    session.endSession();
  }
}

//  @4 answer using postgress+prisma
import { prisma } from "../config/prisma.js";

async function transfer(req, res) {
  const { amount, to, idempotencyKey } = req.body;

  const from = req.user.id;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check duplicate transfer
      const existingTransfer = await tx.transfer.findUnique({
        where: {
          idempotencyKey,
        },
      });

      if (existingTransfer) {
        throw new Error("Transfer already processed.");
      }

      // 2. Get sender wallet
      const senderWallet = await tx.wallet.findUnique({
        where: {
          userId: from,
        },
      });

      if (!senderWallet) {
        throw new Error("Sender wallet not found.");
      }

      // 3. Check balance
      if (senderWallet.balance < amount) {
        throw new Error("Insufficient balance.");
      }

      // 4. Receiver wallet
      const receiverWallet = await tx.wallet.findUnique({
        where: {
          userId: to,
        },
      });

      if (!receiverWallet) {
        throw new Error("Receiver wallet not found.");
      }

      // 5. Debit sender
      await tx.wallet.update({
        where: {
          userId: from,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      // 6. Credit receiver
      await tx.wallet.update({
        where: {
          userId: to,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      // 7. Create transfer history
      const transfer = await tx.transfer.create({
        data: {
          fromUserId: from,
          toUserId: to,
          amount,
          status: "SUCCESS",
          idempotencyKey,
        },
      });

      return transfer;
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

// without prisma

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function transfer(req, res) {
  const client = await pool.connect();

  try {
    const { to, amount, idempotencyKey } = req.body;
    const from = req.user.id;

    await client.query("BEGIN");

    // 1. Check duplicate request
    const existingTransfer = await client.query(
      `
            SELECT id
            FROM transfers
            WHERE idempotency_key = $1
            `,
      [idempotencyKey],
    );

    if (existingTransfer.rowCount > 0) {
      throw new Error("Transfer already processed");
    }

    // 2. Lock sender wallet
    const sender = await client.query(
      `
            SELECT *
            FROM wallets
            WHERE user_id = $1
            FOR UPDATE
            `,
      [from],
    );

    if (sender.rowCount === 0) {
      throw new Error("Sender wallet not found");
    }

    // 3. Lock receiver wallet
    const receiver = await client.query(
      `
            SELECT *
            FROM wallets
            WHERE user_id = $1
            FOR UPDATE
            `,
      [to],
    );

    if (receiver.rowCount === 0) {
      throw new Error("Receiver wallet not found");
    }

    // 4. Check balance
    if (sender.rows[0].balance < amount) {
      throw new Error("Insufficient balance");
    }

    // 5. Debit sender
    await client.query(
      `
            UPDATE wallets
            SET balance = balance - $1
            WHERE user_id = $2
            `,
      [amount, from],
    );

    // 6. Credit receiver
    await client.query(
      `
            UPDATE wallets
            SET balance = balance + $1
            WHERE user_id = $2
            `,
      [amount, to],
    );

    // 7. Save transfer history
    const transfer = await client.query(
      `
            INSERT INTO transfers
            (
                from_user_id,
                to_user_id,
                amount,
                status,
                idempotency_key
            )
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *
            `,
      [from, to, amount, "SUCCESS", idempotencyKey],
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      data: transfer.rows[0],
    });
  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
  }
}

// Q7 question

app.get("/search", async (req, res) => {
  const products = await Product.find({
    name: new RegExp(req.query.q),
  });

  res.json(products);
});

// Answer

import escapeStringRegexp from "escape-string-regexp";

app.get("/search", async (req, res) => {
  try {
    let { q, page = 1, limit = 10 } = req.query;

    // Remove extra spaces
    q = q?.trim();

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    // Prevent very long searches
    if (q.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Search query is too long.",
      });
    }

    // Escape regex characters
    const safeRegex = new RegExp(escapeStringRegexp(q), "i");

    const products = await Product.find({
      name: safeRegex,
    })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    logger.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Question 9 – Upload API

javascript;
app.post("/upload", upload.single("image"), async (req, res) => {
  await uploadToS3(req.file);

  res.send("Uploaded");
});

// answers

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

app.post("/upload-url", async (req, res) => {
  try {
    const { fileName, contentType } = req.body;

    // 1. Validate MIME type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(contentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type.",
      });
    }

    // 2. Generate unique file name
    const key = `profile-images/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    // 3. Generate signed URL (valid for 5 minutes)
    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
    });

    return res.status(200).json({
      success: true,
      uploadUrl,
      fileUrl: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`,
    });
  } catch (error) {
    logger.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate upload URL.",
    });
  }
});
