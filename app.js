const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from Jenkins + Docker CI/CD!",
    project: "aws-jenkins-docker-cicd",
    status: "running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

module.exports = app;