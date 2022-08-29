var router = require('express').Router()

// Kanban
router.use('/auth', require('./auth'))
router.use('/boards', require('./board'))
router.use('/boards/:boardId/sections', require('./section'))
router.use('/boards/:boardId/tasks', require('./task'))

// Expense Tracker
router.use('/expense-tracker', require('./expense-tracker'))


module.exports = router;
