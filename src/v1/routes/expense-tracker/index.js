const routes = require('express').Router();
const controller = require('../../controllers/expense-tracker/controller');

routes.route('/categories')
   .get(controller.get_Categories)
   .post(controller.create_Categories)

routes.route('/transaction')
   .get(controller.get_Transaction)
   .post(controller.create_Transaction)
   .delete(controller.delete_Transaction)

routes.route('/labels').get(controller.get_Labels)

module.exports = routes;