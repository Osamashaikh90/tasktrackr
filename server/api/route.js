const express = require("express");

const router = express.Router();

const {
  Create,
  Get,
  GetById,
  Update,
  Delete,
} = require("../controller/controller");

router.post("/create", Create);

router.get("/get", Get);

router.get("/get/:id", GetById);

router.put("/update/:id", Update);

router.delete("/delete/:id", Delete);

module.exports = router;
