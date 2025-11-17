import {Router} from "express"
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/link.Controller.js"
import { requiereToken } from "../middlewares/requiereToken.js"
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js"
const router = Router()

router.get('/', requiereToken ,getLinks)
router.get('/:id', requiereToken, getLink )
router.delete('/:id',requiereToken, paramLinkValidator, removeLink)
router.post("/",bodyLinkValidator, requiereToken, createLink)
router.patch('/:id',requiereToken, paramLinkValidator,bodyLinkValidator, updateLink)

export default router