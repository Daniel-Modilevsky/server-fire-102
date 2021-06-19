const mongoose = require("mongoose");
const logger = require("../../lib/logs");
const config = require("../../config/config-default");

const Marker = require("./marker.model");


const checkMarkerId = async function (req, res, next) {
  try {
    const marker = await Marker.findOne({ _id: req.params.id });
    if (!marker) {
      message = "Error - marker not exist";
      logger.error(message);
      return res.status(401).json({ message });
    } else {
      next();
    }
  } catch (error) {
    message = "Error - Problem find report";
    logger.error(message);
    return res.status(401).json({ message });
  }
};

const getMarkers = async function (req, res) {
  try {
    const markers = await Marker.find();
    return res.status(200).json(markers);
  } catch (error) {
    message = "Error - Failed searching for all markers";
    logger.error(`${message} + ${error}`);
    return res.status(400).json({ message });
  }
};

const getMarker = async function (req, res) {
  try {
    const marker = await Marker.findOne({ _id: req.params.id });
    return res.status(200).json({ report });
  } catch (error) {
    return res.status(400).json({ error });
  }
};


const createMarker = async function (req, res) {
  try {
    if (
      !req.body.key ||
      !req.body.coordinate ||
      !req.body.displayName 
    ) {
      logger.error(
        "Error - Missing Params - can not complete valis creation without (key & coordinate & displayName) params"
      );
      return res
        .status(400)
        .send(
          "Error - Missing Params - can not complete valis creation without (userName & phoneNumber & marker & type & time & iamge) params"
        );
    }
    let newMarker= new Marker({
      _id: mongoose.Types.ObjectId(),
      key: req.body.key,
      coordinate: req.body.coordinate,
      displayName: req.body.displayName,
    });
    const marker = await Marker.findById({ _id: newMarker._id });
    if (!marker) {
        newMarker.save();
      return res.status(200).json(newMarker);
    } else {
      message = "Error - marker already exist";
      logger.error(message);
      return res.status(400).json(message);
    }
  } catch (error) {
    message = "Error - Faild Create new Marker";
    logger.error(`${message} : ${error}`);
    return res.status(400).json(message);
  }
};

const unActiveMarker = async function (req, res) {
  try {
    const marker = await Marker.findById({ _id: req.params.id });
    marker.isActive = false;

    Marker.update({ _id: marker._id });
    return res.status(200).json({ marker });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteMarker = async function (req, res) {
  try {
    const marker = await Marker.findById({ _id: req.params.id });
    if (marker.isDeleted == false) marker.isDeleted = true;
    marker.update({ _id: marker._id });
    return res.status(200).json({ msg: `report : ${req.params.id} deleted` });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
    checkMarkerId,
    getMarkers,
    getMarker,
    createMarker,
    unActiveMarker,
    deleteMarker,
};
