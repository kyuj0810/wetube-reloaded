import express from 'express'

const apiRouter = express.Router()

export const registerView = (req, res) => {
  apiRouter.post('/videos//:id([0-9a-f]{24})/view', registerView)
}
export default apiRouter
