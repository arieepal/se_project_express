const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems");
//crud

// creat
router.post("/", createItem);

//read
router.get("/", getItems);

//update
router.put("/:itemId", updateItem);

//delete
router.delete("/:itemId", deleteItem);

module.exports = router;
