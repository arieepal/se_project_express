const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  createItem,
  getItems,
  deleteItem,
  unlikeItem,
  likeItem,
} = require("../controllers/clothingItems");
// crud

// create
router.post("/", auth, createItem);

// read
router.get("/", getItems);

// like
router.put("/:itemId/likes", auth, likeItem);

// delete
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
