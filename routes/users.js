import express from "express";
import bodyParser from "body-parser";
const router = express.Router();
router.get('/', (req, res) => {
  res.send("Hello");
});
export default router;
