const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const NodeCache = require( "node-cache" );

const { Handler } = require('./scripts/fetch-article')

const server = express();
const port = process.env.PORT || 5000;
const jsonParser = bodyParser.json()

const fetchCache = new NodeCache( { stdTTL: 300, checkperiod: 360 } );

server.get('/get-articles',(req, res) => {
  try{
    let handler = new Handler()
    handler.fetch(req.query,fetchCache).then(result=>{
      if(result && !result.error){
        res.send(result.data)
      }
      else{
        res.status(result.errorCode).send(result)
      }

    })
  }
  catch(error){
    let errorMessage = {
      error: true,
      errorCode: 500,
      details: "Internal Server Error",
    }
    res.status(errorMessage.errorCode).send(errorMessage)
  }

})

server.listen(port,()=>console.log(`Server running at port ${port}...`))
