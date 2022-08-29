const model = require('../../models/expense-tracker/model');

async function create_Categories(req, res) {
   const Create = new model.Categories({
      type: 'Investment',
      color: '#fcbe44',
   });

   await Create.save((err, data) => {
      if (err) {
         res.status(500).send({
            message: err.message || 'Some error occurred while creating the Categories.',
         });
      }
      res.send(data);
   });
}

async function get_Categories(req, res) {
   try {
      const data = await model.Categories.find({}).sort({ _id: -1 });
      const filter = await data.map(v => Object.assign({}, {
         type: v.type,
         color: v.color,
      }))
      return res.send(filter);
   } catch (err) {
      res.status(500).send({
         message: err.message || 'Some error occurred while retrieving Categories.',
      });
   }
}

async function create_Transaction(req, res) {
   if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
   const { name, type, amount } = req.body;
   const Create = new model.Transaction({
      type,
      name,
      amount,
      date: new Date()
   });

   Create.save((err, data) => {
      if (err) {
         res.status(500).send({
            message: err.message || 'Some error occurred while creating the Transaction.',
         });
      }
      res.send(data);
   })
}

async function get_Transaction(req, res) {
   try {
      const data = await model.Transaction.find({}).sort({ _id: -1 });
      return res.send(data);
   } catch (err) {
      res.status(500).send({
         message: err.message || 'Some error occurred while retrieving Transaction.',
      });
   }
}

async function delete_Transaction(req, res) {
   if (!req.body) return res.status(400).json("Post HTTP Data not Provided");

   const { id } = req.body;
   try {
      await model.Transaction.findByIdAndDelete(id);
      return res.status(200).json('Delete Successful');
   } catch (err) {
      return res.status(500).json(err.message || 'Error in Deleting Record');
   }
}

async function get_Labels(req, res) {
   try {
      model.Transaction.aggregate([
         {
            $lookup: {
               from: 'categories',
               localField: 'type',
               foreignField: 'type',
               as: 'category_info'
            }
         },
         {
            $unwind: '$category_info'
         }]).then(data => {
            const filter = data.map(v => Object.assign({}, {
               _id: v._id,
               name: v.name,
               type: v.type,
               amount: v.amount,
               color: v.category_info.color
            }))

            res.json(filter)
         })
         .catch(err => res.status(400).json(err.message || 'Looup Collection Error')
         )
   } catch (err) {
      res.status(500).send({
         message: err.message || 'Some error occurred while retrieving Labels.',
      });
   }
}

module.exports = {
   create_Categories,
   get_Categories,
   create_Transaction,
   get_Transaction,
   delete_Transaction,
   get_Labels
}