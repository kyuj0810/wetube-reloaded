import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 5000;

const app = express();
const logger = morgan("dev");

//console.log(process.cwd());

app.set("view engine", "pug"); // 뷰 엔진 설정
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true })); // HTML form을 이해하고 그 form을 우리가 사용할 수 있는 javascript object 형식으로 통역해줌.
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
  console.log(`🟢 Server listenting on port http://localhost:${PORT} 🎈`);

app.listen(PORT, handleListening);
