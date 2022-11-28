const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const accountsRouter = require("./components/accounts");
const productRouter = require("./components/product");
const categoryRouter = require("./components/category");
const producerRouter = require("./components/producer");
const orderRouter = require("./components/order");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", accountsRouter);
app.use("/accounts", accountsRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/producer", producerRouter);
app.use("/order", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;