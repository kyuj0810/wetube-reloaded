import express from "express";
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
  deleteVideo,
} from "../controller/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(publicOnlyMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(publicOnlyMiddleware)
  .get(deleteVideo);
videoRouter
  .route("/upload")
  .all(publicOnlyMiddleware)
  .get(getUpload)
  .post(postUpload);
// videoRouter.get("/:id(\\d+)/edit", getEdit);

export default videoRouter;
