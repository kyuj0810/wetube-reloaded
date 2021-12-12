import express from "express";
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
} from "../controller/videoController";

const videoRouter = express.Router();

//videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
// videoRouter.get("/:id(\\d+)/edit", getEdit);

export default videoRouter;
