import express from "express";

const router = express.Router();

router.get("/test", (request, response) => {
  response.send({
    message: "this is a test route",
  });
});

router.post("/test", (req, res) => {
  console.log(req.body);
  res.send({ message: "this is a test route" });
});

export default router;
