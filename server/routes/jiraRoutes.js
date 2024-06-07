import express from "express";
import {
  createJiraIssue,
  getIssuesByUserAndProject,
  getProjectStatuses,
} from "../controllers/jiraController.js";

const jiraRoute = express.Router();

jiraRoute.post("/issue/create", createJiraIssue);
jiraRoute.get("/issues", getIssuesByUserAndProject);
jiraRoute.get("/statuses", getProjectStatuses);

export default jiraRoute;
