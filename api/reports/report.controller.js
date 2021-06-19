const mongoose = require("mongoose");
const logger = require("../../lib/logs");
const config = require("../../config/config-default");

const Report = require("./report.model");
const upload = require("../../lib/images");


const checkReportId = async function (req, res, next) {
  try {
    const report = await Report.findOne({ _id: req.params.id });
    if (!report) {
      message = "Error - report not exist";
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

const getAllReports = async function (req, res) {
  try {
    const reports = await Report.find();
    return res.status(200).json(reports);
  } catch (error) {
    message = "Error - Failed searching for all Reports";
    logger.error(`${message} + ${error}`);
    return res.status(400).json({ message });
  }
};

const getReport = async function (req, res) {
  try {
    const report = await Report.findOne({ _id: req.params.id });
    return res.status(200).json({ report });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createReport = async function (req, res) {
  try {
    if (
      !req.body.userName ||
      !req.body.phoneNumber ||
      !req.body.marker ||
      !req.body.type ||
      !req.body.time ||
      !req.body.image
    ) {
      logger.warn(req.body.userName)
      logger.warn(req.body.phoneNumber)
      logger.warn(req.body.marker)
      logger.warn(req.body.type)
      logger.warn(req.body.image)
      logger.warn(req.body.time)

      logger.error(
        "Error - Missing Params - can not complete valis creation without (userName & phoneNumber & marker & type & time & iamge) params"
      );
      return res
        .status(400)
        .send(
          "Error - Missing Params - can not complete valis creation without (userName & phoneNumber & marker & type & time & iamge) params"
        );
    }
    let newReport = new Report({
      _id: mongoose.Types.ObjectId(),
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      marker: req.body.marker,
      type: req.body.type,
      time: req.body.time,
      // image: req.file.path.replace("\\", "/"),
      image: req.body.image
    });
    if (req.body.comment) newReport.comment = req.body.comment;

    const report = await Report.findById({ _id: newReport._id });
    if (!report) {
      newReport.save();
      return res.status(200).json(newReport);
    } else {
      message = "Error - Report already exist";
      logger.error(message);
      return res.status(400).json(message);
    }
  } catch (error) {
    message = "Error - Faild Create new report";
    logger.error(`${message} : ${error}`);
    return res.status(400).json(message);
  }
};

const unActiveReport = async function (req, res) {
  try {
    const report = await Report.findById({ _id: req.params.id });
    report.isActive = false;

    Report.update({ _id: report._id });
    return res.status(200).json({ report });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteReport = async function (req, res) {
  try {
    const report = await Report.findById({ _id: req.params.id });
    if (report.isDeleted == false) report.isDeleted = true;
    report.update({ _id: report._id });
    return res.status(200).json({ msg: `report : ${req.params.id} deleted` });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  checkReportId,
  getAllReports,
  getReport,
  createReport,
  unActiveReport,
  deleteReport,
};
