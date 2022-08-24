import {Request, Response} from "express";
import express from 'express';
import {items} from "../../index";
import User from "../../classes/User";
const router = express.Router();


router.get("/basket/:id", function (request: Request, response: Response) {
    if(!request.params?.id) return response.json({success:false, error: "YOUR ID IS DEAD"});
    if (request.session?.user) {
        request.session.user.basket.push(request.params.id);
        User.updateBasket(request.session.user.basket, request.session.user.userid);
        response.json({success: true});
    } else {
        response.json({success:false, error: "YOU ARE NOT LOGGED IN"});
    }
});
router.get("/removebasket/:id", function (request: Request, response: Response) {
    if(!request.params?.id) return response.json({success:false, error: "YOUR ID IS DEAD"});
    if (request.session?.user) {
        if(request.session.user.basket.includes(request.params.id)) return response.json({success:false, error: "YOUR ID IS DEAD"});
        request.session.user.basket.splice(request.session.user.basket.indexOf(request.params.id), 1);
        User.updateBasket(request.session.user.basket, request.session.user.userid);
        response.json({success: true});
    } else {
        response.json({success:false, error: "YOU ARE NOT LOGGED IN!"});
    }
});

export default router;