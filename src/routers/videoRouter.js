import express from 'express'
import {
  watch,
  getUpload,
  getEdit,
  postEdit,
  postUpload,
  deleteVideo,
} from '../controller/videoController'
import { protectorMiddleware, videoUpload } from '../middlewares'

const videoRouter = express.Router()

//videoRouter.get("/:id(\\d+)", watch);
videoRouter.get('/:id([0-9a-f]{24})', watch)

videoRouter
  .route('/:id([0-9a-f]{24})/edit')
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit)

videoRouter
  .route('/:id([0-9a-f]{24})/delete')
  .all(protectorMiddleware)
  .get(deleteVideo)

videoRouter
  .route('/upload')
  .all(protectorMiddleware)
  .get(getUpload)
  .post(
    videoUpload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'thumb', maxCount: 1 },
    ]),
    postUpload,
  )
// videoRouter.get("/:id(\\d+)/edit", getEdit);

export default videoRouter
