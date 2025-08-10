const ClothingItem = require("../models/clothingItems");

const {
  DEFAULT_ERROR,
  INVALID_REQUEST,
  NOT_FOUND,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req.user);
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  if (!req.user || !req.user._id) {
    console.error("req.user is undefined");
    return res.status(401).send({ message: "Unauthorized: no user info" });
  }

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      // res.status(201).json({ data: item });
      return res.status(201).send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      if (e.name === "ValidationError") {
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid input data", e });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: " Error from createItem", e });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.error(e);
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      console.error(e);
      res.status(DEFAULT_ERROR).send({ message: "Error from userItems", e });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
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
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "Error from likeItem", e });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
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
        .send({ message: "Error from unlikeItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
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
        .send({ message: "Error from deleteItem", e });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  unlikeItem,
  likeItem,
};
