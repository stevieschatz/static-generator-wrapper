'use strict'
//TODO First testng connection between docker rabbit env and my node thing
const rx = require('rxjs')
const amqp = require('amqp')
const konphyg = require('konphyg')
const path = require('path')
const _ = require('lodash')
const Promise = require('bluebird')
const config = konphyg(path.join(__dirname, 'config')).all()



 let getConnection = () => {
   var promise = new Promise(() => {
     let connection = amqp.createConnection(config.rabbit)

     connection.on('error', (e) => {
       console.log("Error related to amqp: ", e)
     })

      connection.on('ready', () => {
        console.log('connected...')
      })

     connection.on('ready', () => {
       let queueOptions = {
         durable: true,
         autoDelete: false
       }
       let q = connection.queue('test', queueOptions, (queue) => {
         
           q.subscribe((message) => {
            let data = message.data.toString()
             console.log(data)
           })
      })
    })

  })

   return promise

}

//Observer
let Observer = {
  next(value){
    console.log(value)
  },
  error(err){
    console.log(err)
  },
  complete(){
    console.log(complete)
  }
}

//TODO Obserable
let processMessages = (Observer) => {
  getConnection()
      .then((data) => {
        console.log(data,'In promise:)')
      })
      .catch((err) => {
        console.log('errror', err);
      })
}

processMessages()
