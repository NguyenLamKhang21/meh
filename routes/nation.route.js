var express = require("express");
var router = express.Router();
const nationController = require("../controller/nation.controller");

/* GET nation list page */
router.get("/", nationController.showNationList);

/* GET nation detail*/

module.exports = router;
