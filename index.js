const express=require('express')
const app=express()
const { scrapRestaurantdata } = require('./scrapData');



const PORT=process.env.PORT||4000;

app.use(express.json());// json parser



const scrapRestaurant=async()=>{
    console.log("Scraping the restaurant data....")
    await scrapRestaurantdata()
}


app.use("/scrap",scrapRestaurant)

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