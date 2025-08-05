const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItems");
const { DEFAULT_ERROR, INVALID_REQUEST } = require("../utils/errors");
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
      res.status(201).json({ data: item });
    })
    .catch((e) => {
      console.error(e);
      if (e.name == "ValidationError") {
        return res
          .status(INVALID_REQUEST)
          .send({ message: "Invalid input data", e });
      } else {
        res
          .status(DEFAULT_ERROR)
          .send({ message: " Error from createItem", e });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      console.error(e);
      res.status(DEFAULT_ERROR).send({ message: "Error from getItems", e });
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

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      console.error(e);
      res.status(DEFAULT_ERROR).send({ message: "Error from deleteItem", e });
    });
};
module.exports = { createItem, getItems, updateItem, deleteItem };
