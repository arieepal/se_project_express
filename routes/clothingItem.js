const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  unlikeItem,
  likeItem,
} = require("../controllers/clothingItems");
//crud

// creat
router.post("/", createItem);

//read
router.get("/", getItems);

//update
router.put("/:itemId", updateItem);
router.put("/:itemId/likes", likeItem);

//delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
