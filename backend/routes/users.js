import express from "express";
import { db } from "../server.js";
const router = express.Router();

router.post("/upsert", async (req, res) => {
  const { uid, username, email, profilePic } = req.body;

  try {
    await db.collection("users").updateOne(
      { _id: uid },
      {
        $set: {
          username,
          email,
          profilePic: profilePic || "",
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    res.status(200).send("User stored/updated successfully");
  } catch (err) {
    console.error("Mongo error:", err);
    res.status(500).send("Error storing user");
  }
});

router.post('/progress', async (req, res) => {
  const { uid, chapter, level } = req.body;

  console.log("Incoming progress update:", { uid, chapter, level });

  try {
    const filter = { _id: uid };
    const update = {
      $addToSet: {
        [`progress.${chapter}`]: level
      }
    };
    const options = { upsert: true };

    const result = await db.collection("users").updateOne(filter, update, options);
    console.log("MongoDB update result:", result);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mongo error:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

router.get("/progress/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await db.collection("users").findOne({ _id: uid });
    if (!user) return res.status(404).send("User not found");

    res.json({ progress: user.progress || {} });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user progress");
  }
});

export default router;
