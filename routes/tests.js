const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

// GET /tests
router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.send(tests);
  } catch (error) {
    next(error);
  }
});

//GET /tests/:id
router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (test) {
      res.send(test);
    } else {
      res.status(404).send('Test is not found');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const test = await Test.create(req.body);
    const student = await Student.findByPk(req.params.studentId);
    await test.setStudent(student);
    res.status(201).send(test);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Test.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
