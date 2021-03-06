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

router.post("/nearbyplayers", async function (req, res, next) {
  try {
    //Todo call your facade method
    const user = req.body;
    const nearbyplayers = await gameFacade.nearbyPlayers(
      user.userName,
      user.password,
      user.lon,
      user.lat,
      user.distance
    );
    res.json(nearbyplayers);
  } catch (err) {
    console.log(req.body);
    next(err);
  }
});

// Add endpoint where teams can send only POS
router.post("/getPostIfReached", async function (req, res, next) {
  throw new Error("Not yet implemented");
});

module.exports = router;
