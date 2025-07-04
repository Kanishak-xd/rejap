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

router.get("/:uid", async (req, res) => {
    const { uid } = req.params;
  
    try {
      const user = await db.collection("users").findOne({ _id: uid });
      if (!user) return res.status(404).send("User not found");
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching user");
    }
});

export default router;
