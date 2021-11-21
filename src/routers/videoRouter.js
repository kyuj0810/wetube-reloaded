import express from "express";
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
} from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
// videoRouter.get("/:id(\\d+)/edit", getEdit);

export default videoRouter;
