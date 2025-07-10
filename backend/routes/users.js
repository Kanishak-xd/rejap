import express from "express";
import { db } from "../server.js";
const router = express.Router();

router.post("/upsert", async (req, res) => {
  const { uid, username, email, profilePic } = req.body;

  try {
    if (username) {
      const cleanUsername = username.trim();

      // Length check
      const minLen = 3;
      const maxLen = 20;
      if (cleanUsername.length < minLen || cleanUsername.length > maxLen) {
        return res.status(400).json({
          error: `Username must be between ${minLen} and ${maxLen} characters`,
        });
      }

      // Letters-only check
      if (!/^[a-zA-Z]+$/.test(cleanUsername)) {
        return res.status(400).json({
          error: "Username must contain only letters",
        });
      }

      // Uniqueness check
      const existing = await db.collection("users").findOne({ username: cleanUsername });
      if (existing && existing._id.toString() !== uid) {
        return res.status(409).json({ error: "Username already taken" });
      }
    }

    await db.collection("users").updateOne(
      { _id: uid },
      {
        $set: {
          ...(username && { username }),
          ...(email && { email }),
          ...(profilePic && { profilePic }),
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
          role: "User",
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

router.post("/change-role", async (req, res) => {
  const { uid, role } = req.body;

  try {
    await db.collection("users").updateOne({ _id: uid }, { $set: { role } });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to change role:", err);
    res.status(500).send("Role update failed");
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

router.get("/leaderboard", async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();

    const processed = users.map(user => {
      let count = 0;
      const progress = user.progress || {};
      Object.values(progress).forEach(arr => {
        count += Array.isArray(arr) ? arr.length : 0;
      });

      return {
        username: user.username,
        profilePic: user.profilePic,
        levelsCompleted: count,
      };
    });

    const sorted = processed.sort((a, b) => b.levelsCompleted - a.levelsCompleted);

    res.json(sorted);
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    res.status(500).send("Failed to fetch leaderboard");
  }
});

router.get('/all', async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    console.error("Error fetching all users:", err);
    res.status(500).send("Error retrieving users");
  }
});

router.get("/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await db.collection("users").findOne({ _id: uid });

    if (!user) {
      // Create a default record if not found (optional fallback)
      return res.status(200).json({
        username: "",
        email: "",
        profilePic: "",
        progress: {},
      });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Error fetching user");
  }
});

router.get('/check-username/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await db.collection('users').findOne({
      username: { $regex: `^${username}$`, $options: 'i' }
    });
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking username:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/check-email', async (req, res) => {
  const email = req.query.email?.toLowerCase();
  try {
    const existingUser = await db.collection('users').findOne({ email });
    res.status(200).json({ exists: !!existingUser });
  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ error: "Error checking email" });
  }
});

export default router;
