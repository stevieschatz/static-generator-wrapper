// let queueOptions = {
//   durable: true,
//   autoDelete: false
// }
// let q = connection.queue('test', queueOptions, (queue) => {
//     //This should catch all messages
//     q.bind('#')
//     console.log('Queue Name:', queue.name, 'is open.')
//
//     console.log('Queue:', queue, 'is open..')
//     //This should print messages to stdout
//     q.subscribe((message) => {
//         console.log(message)
//     })
// })



let queueOptions = {
  durable: true,
  autoDelete: false
}

let q = connection.queue('test', queueOptions, (queue) => {
    This should catch all messages
    q.bind('#')
    console.log('Queue Name:', queue.name, 'is open.')

    console.log('Queue:', queue, 'is open..')
    This should print messages to stdout
    q.subscribe((message) => {
        console.log(message.data.toString())

    })
})
