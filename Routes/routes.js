import express from "express"; 
import { createProperty, getProperty, getPropertyById } from "../controllers/landingPageControllers.js";
import { upload, svgUpload } from "../middleware/multer.js";
import { addTestimonials, getTestimonials } from "../controllers/testimonialsControllers.js";
import { addOurExpert, getOurExpert } from "../controllers/ourExpertControllers.js";
import { addOnGoingProject, getOnGoingProject, getOnGoingProjectById } from "../controllers/onGoingProjectControllers.js";
import { addOurTeam, getOurTeam } from "../controllers/ourTeamControllers.js";
import { createOurOffice, getOurOffice } from "../controllers/ourOfficesControllers.js";
import { subscribe } from "../controllers/subscribeControllers.js";
import { contactus } from "../controllers/contactUsControllers.js";
import { createDeveloper, getDeveloper, getDeveloperByID } from "../controllers/developerControllers.js";
import { AllBlogController, BlogController, BlogImageController, getBlogByIdController } from "../controllers/blogControllers.js";
import { createArea, getArea, getAreaById } from "../controllers/areaControllers.js";
import { createService, getService, getServiceById } from "../controllers/servicesControllers.js";
import { createBuyProperty, getBuyProperty, getBuyPropertyById } from "../controllers/buyControllers.js";
import { createListProperty, getListProperty } from "../controllers/listPropertyControllers.js";
import { subscribe2 } from "../controllers/subscribe2Controllers.js";
import { createDownload, getDownloads } from "../controllers/downloadControllers.js";
import { createInquiry, getInquiry } from "../controllers/inquiryControllers.js";
import { createDigital, getDigital } from "../controllers/digitalEditionControllers.js";
const router = express.Router();

router.post("/addProperty", upload.array('images', 5), createProperty);
router.get('/allProperty', getProperty);
router.get('/allProperty/:id', getPropertyById);

router.post("/createTestimonials", addTestimonials);
router.get("/alltestimonials", getTestimonials);

router.post("/addExperts", upload.single('image'), addOurExpert);
router.get('/getAllData', getOurExpert);

router.post ("/add-ProjectData", upload.array('images', 5), addOnGoingProject);
router.get("/all-ProjectData", getOnGoingProject);
router.get("/all-ProjectData/:id", getOnGoingProjectById);

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

router.post("/create-Area", upload.fields([
    {name: 'image', maxCount: 2},
    {name: 'logo', maxCount: 1},
]), createArea);

router.get("/All-Area", getArea);

router.get("/All-Area/:id", getAreaById);


router.post("/Create-Service", upload.fields([
    {name: 'image', maxCount: 2},
    {name: 'logo', maxCount: 1},
]), createService);

router.get("/All-Services", getService);
router.get("/All-Service/:id", getServiceById);

router.post('/upload-image', upload.single('upload'), BlogImageController);
router.post('/create-blogs', upload.single("featuredImage"), BlogController);
router.get('/blogs', AllBlogController);
router.get('/blogs/:id', getBlogByIdController);

router.post('/buy-property', upload.array('images', 5), createBuyProperty);
router.get('/all-buyProperty', getBuyProperty);
router.get('/all-buyProperty/:id', getBuyPropertyById);

router.post('/List-Property', upload.array('propertyImages', 5), createListProperty);
router.get("/all-Property", getListProperty);

router.post("/subscribe-all", subscribe2);

router.post("/create-download", createDownload);

router.get("/get-download", getDownloads);

router.post("/create-Inquiry", createInquiry);

router.get("/allInquiry", getInquiry);

router.post("/digital-Edition", createDigital);

router.get("/get-Edition", getDigital);


export default router;