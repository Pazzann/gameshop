import {items} from "../../index";
import {Request, Response} from "express";
import express from 'express';
const router = express.Router();




router.get("/", function (request: Request, response: Response) {
        response.json(items);
    }
);


export default router;