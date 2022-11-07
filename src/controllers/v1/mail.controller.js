
import config from '@config'
import axios from 'axios'


const send = (req, res) => {
  console.log(req.body)
  const message = `
From: *${req.body.email}* 
Name: * ${req.body.name}* 
Messasge: * ${req.body.text}* `
  axios.post(`${config.messageApi}`, {
    message: message,
    token: config.messageToken
  }).then(response => {
    res.status(200).json({
      message: 'Success'
    })
  }).catch(err => {
    res.status(400)
  })
}
export default {
  send
}