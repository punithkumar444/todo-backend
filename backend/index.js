const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.post("/todos",async function(req,res){
    const createPayload = req.body;
    const ParsedPayload = createTodo.safeParse(createPayload);
    if(!ParsedPayload.success){
        res.status(411).json({
            msg :"you sent wrong inputs",
        })
        return;
    }
    //put it in mongodb
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false,
    })
    res.json({
        msg :"todo is created"
    })
})
app.get("/todos",async function(req,res){
    const todos = await todo.find({});
    res.json({
        todos
    })
})
app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    const ParsedPayload = updateTodo.safeParse(updatePayload);
    if(!ParsedPayload.success){
        res.status(411).json({
            msg :"you sent wrong inputs",
        })
        return;
    }
    await todo.findByIdAndUpdate({
        _id : req.body.id
    },{
        completed:true
    })
    res.json({
        msg:"todo is updated"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 8080");
});
