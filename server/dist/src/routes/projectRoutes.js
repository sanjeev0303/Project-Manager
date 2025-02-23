"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const porjectControllers_1 = require("../controllers/porjectControllers");
const router = (0, express_1.Router)();
router.get("/", porjectControllers_1.getProjects);
router.post("/", porjectControllers_1.createProject);
exports.default = router;
