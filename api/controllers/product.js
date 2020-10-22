const ProductModel = require('../models/product.js')

/**
 * product
 * @class
 */
class Product {
  constructor (app, connect) {
    this.app = app
    this.ProductModel = connect.model('products', ProductModel)

    this.create()
    this.show()
    this.search()
    this.delete()
    this.update()

  }

  /**
   * Show
   */
  show () {
    this.app.get('/product/show/:id', (req, res) => {
      try {
        this.ProductModel.findById(req.params.id).then(product => {
          res.status(200).json(product || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
  /**
   * Create
   */
  create () {
    this.app.post('/product/create', (req, res) => {
      try{
          const ProductModel = this.ProductModel(req.body)
          ProductModel.save().then(product => {
            res.status(200).json(product || {})
          })
      }
      catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
  
  /**
   * Search
   */
  search () {
    this.app.post('/product/search', (req, res) => {
      try {

        this.ProductModel.find({}).populate("administrator, members, staff").then(product => {
          res.status(200).json(product || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Delete
   */
  delete () {
    this.app.delete('/product/delete/:id', (req, res) => {
      try {
        this.ProductModel.findByIdAndRemove(req.params.id).then(product => {
          res.status(200).json(product || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

   /**
   * Update
   */
  update () {
    this.app.put('/product/update/:id', (req, res) => {
      try {
        this.ProductModel.findByIdAndUpdate(req.params.id, req.body).then(product => {
          res.status(200).json(product || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
}

module.exports = Product
