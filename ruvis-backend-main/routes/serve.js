const router = require("express").Router();
const serveController = require("../controllers/serveController");

// UPADATE category
router.post("/", serveController.addserve);

router.post("/tags/:id", serveController.addserveTag);

router.post("/type/:id", serveController.addserveType);

router.get("/:id", serveController.getServeById);

router.get(
  "/:category/:code",
  serveController.getRandomservesByCategoryAndCode
);

router.delete("/:id", serveController.deleteserveById);

router.patch("/:id", serveController.serveAvailability);

router.get("/shop/:shopId", serveController.getServeByShop);

router.get("/", serveController.getAllserves);

module.exports = router;
