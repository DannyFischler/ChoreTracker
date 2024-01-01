const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Chores = require("../models/chores");


router.route("/api/chores").get(async function (req, res) {
  try {
    const chores = await Chores.find({});
    res.json(chores);
  } catch (error) {
    console.error("Error fetching chores:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/api/chores/:chores_id").get(async function (req, res) {
  try {
    const chore = await Chores.findOne({ _id: req.params.chores_id });
    res.json(chore);
  } catch (error) {
    console.error("Error fetching chore:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/api/chores/").post(async function (req, res) {
  try {
    const newChore = await Chores.create({
      parent_id: req.body.parent_id,
      chore_name: req.body.chore_name,
      amount: req.body.amount,
    });
    res.json(newChore);
  } catch (error) {
    console.error("Error creating chore:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.route("/api/chores/:chores_id").put(async function (req, res) {
  try {
    const updatedChore = await Chores.findByIdAndUpdate(
      req.params.chores_id,
      {
        $set: {
          date_approved: req.body.date_approved,
          date_completed: req.body.date_completed,
          parent_comments: req.body.parent_comments,
          child_comments: req.body.child_comments,
        },
      },
      { new: true } 
    );
    res.json(updatedChore);
  } catch (error) {
    console.error("Error updating chore:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.route("/api/chores/:chores_id").delete(async function (req, res) {
  try {
    const deletedChore = await Chores.findByIdAndDelete(req.params.chores_id);
    res.json(deletedChore);
  } catch (error) {
    console.error("Error deleting chore:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
