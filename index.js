const express=require('express')
const app=express()
const cors=require('cors');
const cron = require('node-cron'); // Required node-cron and moment-timezone for scheduling tasks
const moment = require('moment-timezone');

const categoryRoute=require('./routes/Category')
const restaurantRoute=require('./routes/Restaurant')

const { fetchRestaurantUpdatedData } = require('./fetchRestaurantUpdatedData');
const { dbConnect } = require('./mongoDBHelper');
const { scrapRestaurantdata } = require('./scrapData');
require('dotenv').config();

const PORT=process.env.PORT||4000;

app.use(express.json());// json parser



// connect to db
dbConnect()


const scrapRestaurant=async()=>{
    console.log("Scraping the restaurant data....")
    await scrapRestaurantdata()
}


app.use("/api/v1/scrap",scrapRestaurant)

// default route 
app.use('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Server is up and running"
    })
})

// server  listen 
app.listen(PORT,()=>{
    console.log(`App is running at port  ${PORT} `)
})