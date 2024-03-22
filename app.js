const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

// 서버 생성
const app = express();
const port = 3000;

// views 폴더 설정 및 ejs 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 미들웨어 설정
app.use(logger("dev")); // 로그 출력
app.use(express.json()); // json 형식으로 데이터를 받아오기 위한 설정
app.use(express.urlencoded({ extended: false })); // form 형식으로 데이터를 받아오기 위한 설정
app.use(cookieParser()); // 쿠키 파싱 설정
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 위치 설정
app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  })
);

// 라우터 설정
const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const mainRouter = require("./routes/main");
const logoutRouter = require("./routes/logout");

//라우터 연결
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/main", mainRouter);
app.use("/logout", logoutRouter);

//에러 핸들러
// 404 에러 핸들러
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 서버쪽 에러 핸들러
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
