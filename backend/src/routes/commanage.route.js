const router = require("express").Router();
const { getAUser, getAllAdmins, tokenLogin, getAllUser, getAllDevelopers, getAllPms, createAUser, signin, updateAUser, deleteAUser } = require("../controllers/user.controller");
const { getAllProject, getNewIdeas, getBountyRequetsProjects, getReviewRequestProjects, getUserProject, getAProject, createAProject, updateAProject, deleteAProject } = require("../controllers/project.controller");
const { getProjectTicket, createATicket, updateATicket, deleteATicket } = require("../controllers/ticket.controller");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



router.get("/user/:id", getAUser);
router.get("/user/auth/tokenLogin", requireAuth, tokenLogin);
router.post("/user/new", createAUser);
router.post("/user/signin", signin);
router.put("/user/:id", updateAUser);
router.delete("/user/:id", deleteAUser);
router.get("/user", getAllUser);
router.get("/users/devs", getAllDevelopers);
router.get("/users/pms", getAllPms);
router.get("/users/admins", getAllAdmins);

router.get("/project", getAllProject);
router.get("/project/bounty", getBountyRequetsProjects);
router.get("/project/user/:id", getUserProject);
router.get("/project/user/review/:id", getReviewRequestProjects);
router.get("/projects/idea", getNewIdeas);
router.get("/aProject/:id", getAProject);
router.post("/project/new", createAProject);
router.put("/project/:id", updateAProject);
router.delete("/project/:id", deleteAProject);

router.get("/ticket/:id", getProjectTicket);
router.post("/ticket/new", createATicket);
router.put("/ticket/:id", updateATicket);
router.delete("/ticket/:id", deleteATicket);

router.post('/file', upload.single('file'), (req, res) => {
    // Access uploaded file via req.file
    res.send({ fileName: req.file.filename });
});


module.exports = router;
