import express from "express";
import bodyParser from "body-parser";
import routers from "./router/router";
import logger from "morgan";

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(logger("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1", routers);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running on ${port}`);
});

export default app;
