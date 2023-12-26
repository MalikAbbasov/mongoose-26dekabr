import express, { json } from 'express';
const app = express()
const port = process.env.PORT
app.use(express.json())
import 'dotenv/config'
const { Schema } = mongoose;

import mongoose from 'mongoose';


mongoose.connect(process.env.DB_SECRET_KEY)
    .then(() => console.log('Connected!'))
    .catch(err => console.log(err.message))


const chefSchema = new Schema({
    name: String,
    age: Number,
    branch: String,
});

const chefModel = mongoose.model("mychefs", chefSchema);

app.get('/', async (req, res) => {
    try {
        const chefs = await chefModel.find({});
        res.status(200).json(chefs)
    } catch (error) {
        res.send("");
    }
})

app.get('/:id', async (req, res) => {
    const {id} = req.params
    const chefs = await chefModel.findById(id)
    res.send(chefs)
})


app.post('/', async(req, res) => {
    try {
        const {name,age,branch} = req.body;
        const newChef = new chefModel({name,age,branch})
        await newChef.save()
        res.status(200).send("successfull")
    } 
    catch (error) {
        res.send("not added")
    }
  })
  
  app.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name,age,branch} = req.body;
    const chefs = await chefModel.findByIdAndUpdate(id, {name,age,branch});
    res.send(chefs)
  })
  
  app.delete('/:id', async (req, res) => {
    const {id} = req.params
    const chefs = await chefModel.findByIdAndDelete(id);
    res.send(chefs)
  })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})