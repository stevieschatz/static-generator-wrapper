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
     //create subject
     const subject = new rx.Subject()
     let connection = amqp.createConnection(config.rabbit)

     connection.on('error', (e) => {
       console.log("Error related to amqp: ", e)
       reject(e)
     })

     connection.on('ready', () => {
       console.log('connected...')

       let queueOptions = {
         durable: true,
         autoDelete: false
       }

       let q = connection.queue('test', queueOptions, (queue) => {

           q.subscribe((message) => {
            let data = message.data.toString()
             subject.next(data)
           })
      })
    })
   return subject
}


let processMessages = (Observer) => {
  getConnection().subscribe((data) => console.log(data), null, () => console.log('finished'))
}

processMessages()
