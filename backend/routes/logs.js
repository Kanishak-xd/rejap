import express from "express";
import { db } from "../server.js";

const router = express.Router();

/**
 * POST /api/logs
 */
router.post("/", async (req, res) => {
  const { uid, username, action, metadata } = req.body;

  if (!uid || !username || !action) {
    return res.status(400).json({ error: "uid, username, and action are required" });
  }

  const logEntry = {
    uid,
    username,
    action,
    metadata: metadata || {},
    timestamp: new Date()
  };

  try {
    await db.collection("logs").insertOne(logEntry);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Failed to insert log:", err);
    res.status(500).json({ error: "Failed to insert log" });
  }
});

/**
 * GET /api/logs?page=1&limit=20
 */
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const logs = await db.collection("logs")
      .find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    res.status(200).json(logs);
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
