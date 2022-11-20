import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import flash from 'express-flash'
import MongoStore from 'connect-mongo'
import rootRouter from './routers/rootRouter'
import videoRouter from './routers/videoRouter'
import userRouter from './routers/userRouter'
import { localsMiddleware } from './middlewares'
import apiRouter from './routers/apiRouter'

//const cors = require('cors')
const app = express()
const logger = morgan('dev')

//console.log(process.cwd());

app.set('view engine', 'pug') // 뷰 엔진 설정
app.set('views', process.cwd() + '/src/views')
app.use(logger)
//app.use(cors())
app.use(express.urlencoded({ extended: true })) // HTML form을 이해하고 그 form을 우리가 사용할 수 있는 javascript object 형식으로 통역해줌.
app.use(express.json())
app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'require-corp')
  res.header('Cross-Origin-Opener-Policy', 'same-origin')
  next()
})
/* 
session이라는 middleware가 브라우저에 cookie를 전송
 cookie: backend가 너의 브라우저에 주는 정보 
 cookie에는 정해진 규칙이 있기 때문에, 매번 backend에 request를 할 때  
 브라우저는 알아서 그 request에 cookie를 덧붙이게 됨. 
*/

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  }),
)

/*
서버가 브라우저한테 세션 id를 줌  
브라우저가 요청을 보낼 때마다 쿠키에서 세션 id를 가져와 보내줌
그러면 서버가 그 세션 id를 읽고 우리가 누군지 알 수 있음. 어떤 브라우저인지 
*/

app.use(flash())
app.use(localsMiddleware)
app.use('/uploads', express.static('uploads'))
app.use('/static', express.static('assets'))
app.use('/', rootRouter)
app.use('/videos', videoRouter)
app.use('/users', userRouter)
app.use('/api', apiRouter)

export default app
