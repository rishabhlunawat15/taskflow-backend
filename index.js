const port=8000;
//setup express server
const express=require("express");
const app=express();

//to get test data from postman
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//connect mongodb with mongoose
const mongoose=require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/learning-to-connecct');

//for /user route
const newUserRoutes=require("./route/storeUser.routes");
app.use('/users',newUserRoutes);

//for login
const UserRoutes=require("./route/loginUser.routes");
app.use('/login',UserRoutes);

// Import and mount task routes
const taskRoutes=require("./route/task.routes");
const {requireAuth}=require("./middleware/auth.middleware");
app.use('/',requireAuth, taskRoutes);

app.listen(port,()=>console.log(`Server Started at port ${port}`));