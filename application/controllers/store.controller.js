const db = require("../models");

const Store = db.stores;
const Op = db.Sequelize.Op;

// Create and Save
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create
  const store = {
    title: req.body.title,
    description: req.body.description,
    inStock: req.body.inStock ? req.body.inStock : false,
    shelfNumber_tankNumber: req.body.shelfNumber_tankNumber,
  };

  // Save in the database
  Store.create(store)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Data.",
      });
    });
};

// Retrieve all from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Store.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Data.",
      });
    });
};

// Find a single row with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Store.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find data with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id,
      });
    });
};

// Update data by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Store.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Data was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update data with id=${id}. Maybe data was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating data with id=" + id,
      });
    });
};

// Delete data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Store.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Data was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Data with id=${id}. Maybe data was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete data with id=" + id,
      });
    });
};

// Delete all from the database.
exports.deleteAll = (req, res) => {
  Store.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} data were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all data.",
      });
    });
};

// Find all
exports.findAllInStock = (req, res) => {
  Store.findAll({ where: { inStock: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
