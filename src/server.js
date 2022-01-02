import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

//console.log(process.cwd());

app.set("view engine", "pug"); // 뷰 엔진 설정
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // HTML form을 이해하고 그 form을 우리가 사용할 수 있는 javascript object 형식으로 통역해줌.

app.use(
  session({
    secret: "Hello",
    resave: true,
    saveUninitialized: true,
  })
);

/*
서버가 브라우저한테 세션 id를 줌 
브라우저가 요청을 보낼 때마다 쿠키에서 세션 id를 가져와 보내줌
그러면 서버가 그 세션 id를 읽고 우리가 누군지 알 수 있음. 어떤 브라우저인지 
*/

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
