const ClothingItem = require("../models/clothingItems");

const {
  DEFAULT_ERROR,
  INVALID_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  FORBIDDEN,
  CREATED,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  if (!req.user || !req.user._id) {
    console.error("req.user is undefined");
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Unauthorized: no user info" });
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send({ data: item }))
    .catch((e) => {
      console.error(e);
      if (e.name === "ValidationError") {
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid input data" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: " Error from createItem" });
    });
};

const getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((e) => {
      console.error(e);
      return res.status(DEFAULT_ERROR).send({ message: "Error from getItems" });
    });

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (e.name === "CastError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
      }
      return res.status(DEFAULT_ERROR).send({ message: "Error from likeItem" });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (e.name === "CastError") {
        return res.status(INVALID_REQUEST).send({ message: "Invalid item ID" });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "Error from unlikeItem" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user?._id;
  if (!req.user || !userId) {
    console.error("req.user is not found");
    return res.status(UNAUTHORIZED).send({ message: "unauthorized" });
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }

      if (item.owner.toString() !== userId.toString()) {
        return res.status(FORBIDDEN).send({ message: "Not the owner" });
      }
      return item.deleteOne().then(() => {
        res.status(200).send({ message: "item deleted", data: item });
      });
    })
    .catch((e) => {
      console.error(e);
      return res
        .status(INVALID_REQUEST)
        .send({ message: "Error from deleteItem" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  unlikeItem,
  likeItem,
};
