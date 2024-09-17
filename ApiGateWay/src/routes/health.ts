import express,{ Router } from "express";
import { HealthController } from "../controllers/heath.controller";

class HealthRoute{
    private router:Router;
    constructor(){
        this.router = express.Router();
    }
    public routes():Router{
        this.router.get('/gateway-health',HealthController.prototype.health)
        return this.router 
    }
}

export const healthRoutes:HealthRoute=new HealthRoute()