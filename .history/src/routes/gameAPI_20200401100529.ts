import express from "express";
import gameFacade from "../facades/gameFacade";
const router = express.Router();
import { ApiError } from "../errors/apiError";

//import * as mongo from "mongodb"
import setup from "../config/setupDB";
import UserFacade from "../facades/userFacadeWithDB";

(async function setupDB() {
  const client = await setup();
  gameFacade.setDatabase(client);
})();

router.post("/nearbyplayers", async function(req, res, next) {
  try {
    //Todo call your facade method
    throw new Error("Not Yet Implemented");
  } catch (err) {
    next(err);
  }
});

// Add endpoint where teams can send only POS
router.post("/getPostIfReached", async function(req, res, next) {
  throw new Error("Not yet implemented");
});

module.exports = router;
