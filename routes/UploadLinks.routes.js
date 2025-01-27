import { Router } from "express";
import { getLinks, postLinks } from "../controllers/Links.controller.js";




const router=Router()

router.route('/get-links').get(getLinks)
router.route('/post-links').post(postLinks)


export default router