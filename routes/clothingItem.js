const router = require("express").Router();
const auth = require("../middleware/auth");

const { validateCardBody, validateId } = require("../middleware/validation");

const {
  createItem,
  getItems,
  deleteItem,
  unlikeItem,
  likeItem,
} = require("../controllers/clothingItems");
// crud

// read
router.get("/", getItems);

// create
router.post("/", auth, validateCardBody, createItem);

// like
router.put("/:itemId/likes", auth, validateId, likeItem);

// unlike
router.delete("/:itemId/likes", auth, validateId, unlikeItem);

// delete
router.delete("/:itemId", auth, validateId, deleteItem);

module.exports = router;
