const router = require("express").Router();
const {  getAUser, createAUser, updateAUser } = require("../controllers/controller");

router.get("/user/:id", getAUser);
router.post("/user/new", createAUser);
router.put("/user/:id", updateAUser);

module.exports = router;
