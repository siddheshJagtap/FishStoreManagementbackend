module.exports = (app) => {
  const store = require("../controllers/store.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", store.create);

  // Retrieve
  router.get("/", store.findAll);

  // Retrieve all
  router.get("/instock", store.findAllInStock);

  // Retrieve single
  router.get("/:id", store.findOne);

  // Update with id
  router.put("/:id", store.update);

  // Delete with id
  router.delete("/:id", store.delete);

  //Delete
  router.delete("/", store.deleteAll);

  app.use("/api/store", router);
};
