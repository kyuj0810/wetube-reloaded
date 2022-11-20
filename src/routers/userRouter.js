import express from 'express'
import {
  getEdit,
  postEdit,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getChangePasswor,
  postChangePasswor,
  see,
} from '../controller/userController'
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from '../middlewares'

const userRouter = express.Router()

userRouter.get('/logout', protectorMiddleware, logout)
userRouter
  .route('/edit')
  .all(protectorMiddleware)
  .get(getEdit)
  .post(avatarUpload.single('avatar'), postEdit)
userRouter
  .route('/change-password')
  .all(protectorMiddleware)
  .get(getChangePasswor)
  .post(postChangePasswor)

userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin)
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin)

userRouter.get('/:id', see)

export default userRouter
