import {Request, Response} from "express";
import fs from "fs";
import path from "path";
import express from 'express';
const router = express.Router();


router.get("/:imageName", function (request: Request, response: Response) {
        if (!request.params?.imageName) return response.status(203).json({successfully: false, message: "TI DURAK"});
        if (fs.readdirSync(path.join(__dirname, "/images")).includes(request.params.imageName))
            response.sendFile(__dirname + `/images/${request.params?.imageName}`);
        else return response.status(203).json({successfully: false, message: "TI DURAK"});
    }
);

export default router;

