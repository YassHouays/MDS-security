const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const https = require('https')
const fs = require('fs');


require('dotenv').config()

const routes = require('./routes.js')

/**
 * Server
 * @Class
 */
class Server {
  constructor () {
    this.app = express()
  }

  /**
   * Data base connect
   * @return {Object} connect
   */
  dbConnect () {
    const host = `mongodb+srv://${process.env.NOSQL_USER}:${process.env.NOSQL_PWD}@${process.env.NOSQL_HOST}/${process.env.NOSQL_TABLE}?retryWrites=true&w=majority`
    mongoose.set('useCreateIndex', true)
    const connect = mongoose.createConnection(host, { useNewUrlParser: true, useUnifiedTopology: true })

    connect.on('error', (err) => {
      setTimeout(() => {
        console.error(`[ERROR] api dbConnect() -> ${err}`)
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    connect.on('disconnected', () => {
      setTimeout(() => {
        console.log('[DISCONNECTED] api dbConnect() -> mongodb disconnected')
        this.connect = this.dbConnect(host)
      }, 5000)
    })

    process.on('SIGINT', () => {
      connect.close(() => {
        console.log('[API END PROCESS] api dbConnect() -> close mongodb connection')
        process.exit(0)
      })
    })
    return connect
  }

  /**
   * Middleware
   */
  middleware () {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ 'extended': true }))
  }

  /**
   * Routes
   */
  routes () {
    this.app.use((req, res, next) => {
      if (req.headers['token']) {
        if (req.headers['token'] !== process.env.ACCESS_TOKEN) {
          res.status(401).json({
            code: 401,
            message: 'Wrong token'
          })
        } else {
          next()
        }
      } else {
        res.status(401).json({
          code: 401,
          message: 'You need to had a token'
        })
      }
    })

    new routes.User(this.app, this.connect)
    new routes.Product(this.app, this.connect)


    this.app.use((req, res) => {
      res.status(404).json({
        code: 404,
        message: 'not found'
      })
    })
  }

  /**
   * Run
   */
  run () {
    try {
      const options = {
        key: fs.readFileSync('../config/key/api/key.pem'),
        cert: fs.readFileSync('../config/key/api/cert.pem')
      };
      this.connect = this.dbConnect()
      this.dbConnect()
      this.middleware()
      this.routes()
      this.app.listen(3000)
      console.log('go sur : http://localhost:3000')
      https.createServer(options, this.app).listen(8082);
    } catch (err) {
      console.log(`[ERROR] Server -> ${err}`)
    }
  }
}

module.exports = Server
