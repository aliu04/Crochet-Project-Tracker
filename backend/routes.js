import express from "express";
import { Project } from "./models/projectModel.js";

const router = express.Router();

//Route for getting all projects
router.get("/", async (request, response) => {
  try {
    const projects = await Project.find({});
    return response.status(200).json({
      count: projects.length,
      data: projects
    });
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


//Route for getting a single project based on id
router.get("/details/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const project = await Project.findById(id);
    return response.status(200).json(project);
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for getting projects based on completion status
router.get("/projects/completed/:completed", async (request, response) => {
  try {
    const { completed } = request.params;
    const completedBool = (completed === "true")
    const projects = await Project.find({ completed: false });
    return response.status(200).json({
      count: projects.length,
      data: projects
    });
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for adding a new project
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title || !request.body.imgURL || !request.body.pattern || !request.body.description || (request.body.completed === null)
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, pattern, description and completion status",
      });
    }
    const newProject = {
      title: request.body.title,
      imgURL: request.body.imgURL,
      pattern: request.body.pattern,
      description: request.body.description,
      completed: request.body.completed,
    };
    const project = await Project.create(newProject);
    return response.status(201).send(project);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for updating a project
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title || !request.body.pattern || !request.body.imgURL || !request.body.description || (request.body.completed === null)
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, pattern, description and completion status",

      });
    }
    const { id } = request.params;
    const result = await Project.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: "Book updated!" })

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }


});

//Route for deleting a project
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Project.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Project not found' });
    }

    return response.status(200).send({ message: 'Project deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;