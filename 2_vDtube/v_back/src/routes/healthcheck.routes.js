import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controllers.js";

const router = Router()

router.route("/").get(healthcheck) 

// "/" here doesnot represent home "/" , this works on control is passed to this controller i.e "/api/v1/healthcheck"+"/" first part is from app.js

export default router
