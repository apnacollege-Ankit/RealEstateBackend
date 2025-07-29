import express from "express"; 
import { createProperty, getProperty } from "../controllers/landingPageControllers.js";
import { upload, svgUpload } from "../middleware/multer.js";
import { addTestimonials, getTestimonials } from "../controllers/testimonialsControllers.js";
import { addOurExpert, getOurExpert } from "../controllers/ourExpertControllers.js";
import { addOnGoingProject, getOnGoingProject } from "../controllers/onGoingProjectControllers.js";
import { addOurTeam, getOurTeam } from "../controllers/ourTeamControllers.js";
import { createOurOffice, getOurOffice } from "../controllers/ourOfficesControllers.js";
import { subscribe } from "../controllers/subscribeControllers.js";
import { contactus } from "../controllers/contactUsControllers.js";
import { createDeveloper, getDeveloper, getDeveloperByID } from "../controllers/developerControllers.js";
import { AllBlogController, BlogController, BlogImageController, getBlogByIdController } from "../controllers/blogControllers.js";
const router = express.Router();

router.post("/addProperty", upload.array('images', 5), createProperty);
router.get('/allProperty', getProperty);

router.post("/createTestimonials", addTestimonials);
router.get("/alltestimonials", getTestimonials);

router.post("/addExperts", upload.single('image'), addOurExpert);
router.get('/getAllData', getOurExpert);

router.post ("/add-ProjectData", upload.array('images', 5), addOnGoingProject);
router.get("/all-ProjectData", getOnGoingProject);

router.post("/addTeam", upload.single('image'), addOurTeam);
router.get("/all-Team", getOurTeam);

router.post("/createOffice", upload.array('images', 5), createOurOffice);
router.get("/getAllOurOffice", getOurOffice);

router.post("/Subscribe", subscribe);

router.post("/Contact-Us", contactus);

router.post("/create-developer", upload.fields([
    {name: 'image', maxCount: 2},
    {name: 'logo', maxCount: 1},
]), createDeveloper);

router.get("/All-Developer", getDeveloper);

router.get("/All-Developer/:id", getDeveloperByID);

router.post('/upload-image', upload.single('upload'), BlogImageController);
router.post('/create-blogs', upload.single("featuredImage"), BlogController);
router.get('/blogs', AllBlogController);
router.get('/blogs/:id', getBlogByIdController);


export default router;