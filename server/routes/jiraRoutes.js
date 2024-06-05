import express from "express";
import { createJiraIssue } from "../controllers/jiraController.js";

const jiraRoute = express.Router();

jiraRoute.post("/issue/create", createJiraIssue);

export default jiraRoute;
