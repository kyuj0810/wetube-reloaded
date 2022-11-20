import User from '../models/User'
import Video from '../models/Video'
import Comment from '../models/Comment'
import { async } from 'regenerator-runtime'

/* callback 형식
console.log("start")
 Video.find({}, (error, videos) => { 
   if(error) {
     return res.render("server-error")
   }
   return res.render("home", { pageTitle: "Home", videos });
 });
console.log("finished") 
 */

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: 'desc' })
    .populate('owner')
  return res.render('home', { pageTitle: 'Home', videos })
  // try {
  //   console.log("start");
  //   const videos = await Video.find({});
  //   console.log(videos);
  //   console.log("finished");
  //   return res.render("home", { pageTitle: "Home", videos });
  // } catch (error) {
  //   return res.render("server-error", { error });
  // }
  /**
   * callback 은 err와 docs 라는 signature 를 가짐.
   */
}
export const watch = async (req, res) => {
  const { id } = req.params
  const video = await Video.findById(id).populate('owner').populate('comments')
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' })
  }
  return res.render('watch', { pageTitle: video.title, video })
}

export const getEdit = async (req, res) => {
  const { id } = req.params
  const {
    user: { _id },
  } = req.session
  const video = await Video.findById(id)
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' })
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/')
  }
  return res.render('edit', { pageTitle: `Editing ${video.title}`, video })
}

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session
  const { id } = req.params
  const { title, description, hashtags } = req.body
  const video = await Video.exists({ _id: id })
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' })
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/')
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  })
  req.flash('success', 'Changes saved.')
  return res.redirect(`/videos/${id}`)
}

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: 'Upload Video' })
}

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session
  const { video, thumb } = req.files
  const { title, description, hashtags } = req.body
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    })
    const user = await User.findById(_id)
    user.videos.push(newVideo)
    user.save()
    return res.redirect('/')
  } catch (error) {
    return res.status(404).render('upload', {
      pageTitle: 'Upload Video',
      errorMessage: error._message,
    })
  }
}

export const deleteVideo = async (req, res) => {
  const { id } = req.params
  const {
    user: { _id },
  } = req.session
  const video = await Video.findById(id)
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' })
  }
  if (String(video.owner) !== String(_id)) {
    req.flash('error', 'You are not the owner of the video.')
    return res.status(403).redirect('/')
  }
  await Video.findByIdAndDelete(id)
  return res.redirect('/')
}

export const search = async (req, res) => {
  const { keyword } = req.query
  let videos = []
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, 'i'),
      },
    }).populate('owner')
  }
  return res.render('search', { pageTitle: 'Search', videos })
}

export const registerView = async (req, res) => {
  const { id } = req.params
  const video = await Video.findById(id)
  if (!video) {
    return res.sendStatus(404)
  }
  video.meta.views = video.meta.views + 1
  await video.save()
  return res.sendStatus(200)
}

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req
  const video = await Video.findById(id)
  if (!video) {
    return res.sendStatus(404)
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  })
  video.comments.push(comment._id)
  video.save()
  return res.status(201).json({ newCommentId: comment._id })
}

export const deleteComment = async (req, res) => {
  console.log('deleteComment start!!')
  const {
    session: { user },
    body: { commentId },
    params: { id },
  } = req
  const video = await Video.findById(id)
  if (!video) {
    return res.sendStatus(404)
  }
  const comment = await Comment.findById(commentId)
  console.log('deleteComment:', comment._id)

  if (!comment) {
    return res.status(404).render('404', { pageTitle: 'Comment not found.' })
  }

  if (String(user._id) != String(comment.owner)) {
    req.flash('error', 'You are not the owner of the comment.')
    return res.status(403).redirect('/')
  }
  await Comment.findByIdAndDelete(commentId)
  video.comments.pull(comment._id)
  video.save()

  return res.sendStatus(201)
}
