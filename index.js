import express from "express";

const httpApp = express();

httpApp.get("/", (_req, res) => {
  res.json({
    message: "Hello from docker test server",
  });
});

const port = process.env.PORT ?? 5000;

httpApp.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`);
});
