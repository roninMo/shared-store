import express from 'express';
const router = express.Router();

// get
router.get("/:id", (req, res, next) => { 
  console.log("get user -> id: " + {id: req.params.id, req, res, next});

});

// get all
router.get("/", (req, res, next) => {
  console.log('get all users -> information: ', {req, res, next});

});

// delete
router.delete("/:id", (req, res, next) => {
  console.log("delete user -> id: " + {id: req.params.id, req, res, next});

});

// create
router.post("/:id", (req, res, next) => {
  console.log("create user -> id: " + {id: req.params.id, req, res, next});

});

// update
router.put("/:id", (req, res, next) => {
  console.log("update user -> id: " + {id: req.params.id, req, res, next});

});

module.exports = router;
