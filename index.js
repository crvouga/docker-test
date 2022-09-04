import express from "express";
import mediasoup from "mediasoup";

const main = async () => {
  const httpApp = express();

  const port = process.env.PORT ?? 5000;

  httpApp.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`);
  });

  const worker = await mediasoup.createWorker({
    logLevel: "debug",
    logTags: [
      "info",
      "ice",
      "dtls",
      "rtp",
      "srtp",
      "rtcp",
      "rtx",
      "bwe",
      "score",
      "simulcast",
      "svc",
    ],
  });

  worker.on("died", () => {
    console.log("mediasoup worker died 💀");
  });

  worker.on("@failure", (error) => {
    console.log("mediasoup worker failed: ", error.name, error.message);
  });

  worker.on("@success", () => {
    console.log("mediasoup worker is working!");
  });

  console.log("mediasoup worker is probably working...");

  httpApp.get("/", (_req, res) => {
    res.json({
      worker,
      message: "mediasoup is installed.",
    });
  });
};

main();
