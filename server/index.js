const express = require("express") //use for node js 
const mongoose = require("mongoose") //used mongoose for mongodb
const cors = require("cors")
//the models of db 
const UserModel = require('./models/Users')
const MissionModel = require('./models/Missions')
const MsgModel = require('./models/MSG')
const bcrypt = require('bcrypt');  //we was want to use for hash the passwords but i dont know why its not working in my computer 
const jwt = require('jsonwebtoken');  //used for token
const multer = require('multer');  //used for save uploaded pictures

const app = express()
app.use(express.json())
app.use(cors({   //give the access from frontEnd
    origin: 'https://final-project-a19-frontend.vercel.app',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.static('public'));  
// mongoose.connect("mongodb://localhost:27017/UsersMissionsManagement")
//connect to mongodb in cloud 
mongoose.connect("mongodb+srv://hunterman481:EWsTL72vV9XJOMFy@usersmissionsmanagement.byntanj.mongodb.net/?retryWrites=true&w=majority&appName=UsersMissionsManagement")

//by this method we create a token
function makeToken(userType)
{
    const token = jwt.sign(
    
        {role:userType,email:email,userID:id},
        "jwt_secret_key",
        {expiresIn:"1d"}
) 
return token
}

//save the pictures that getten from the frontEND to backEND 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./public/Images")  //save to this path
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)  
    }
})

const upload = multer({storage}) //multer save the picture 

// admin
//this used when user want to make a login (it check if the user is admin or normal user ) and make a token 
app.post('/adminLogin',(req,res)=>{
    const {Email,Password} = req.body
    console.log(Email,Password)
    UserModel.find({email:Email,password:Password})
    .then(users=>{
            if(users.length>0)
            {
                const email = users[0].email
                const id = users[0].id
                const username = users[0].name
                let token;
                if(email==="admin@gmail.com") //we have just one admin then we check if email is this (email is unique) and make a token for admin (role == admin ) this role help us to know in front end witch type of home to display 
                {
                    token = jwt.sign(
                            {role:"admin",name:username,email:email,userID:id},
                            "jwt_secret_key",
                            {expiresIn:"1d"}  //the token is expires just for one day not more 
                    )
                }
                else //in case it a normal user then we make a token with role user (and in front end dispaly a user home not admin home )
                {
                    token = jwt.sign(
                        {role:"user",name:username,email:email,userID:id},
                        "jwt_secret_key",
                        {expiresIn:"1d"}
                )  
                }
                console.log(email,id)
                res.json({ loginStatus: true, token: token ,userID:id}); // we send the token as a json in res (Res that back to frontend as response to the Request) 
            }
            else  //data length back 0 then something wrong
            {
                console.log('failed')
                res.json({ loginStatus: false,ErrorMSG:"email or password is wrong"})
            }
            
                })
    .catch(err=>console.log(err))
    // .catch(err=>res.json(err))
});

//admin
//this used to get all the users in the db and them
app.get('/users',(req,res)=>{
    UserModel.find({email:{$ne:"admin@gmail.com"}})  //we get all the users in the db חוץ מה admin
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
});

//admin
//this used for get all mission in the db 
app.get('/allMissions', (req, res) => {
    //find without filter mean we want to get all elements in the schema
    MissionModel.find() 
    .then(missions => {
        console.log(typeof(missions[0].employeeId)) //this console we use it instead of debugger אליקס ונעמי אתם יכולים להתעלם מהשורות של CONSOLE
        res.json(missions)}) //return the missions
    .catch(err=>res.json(err));
});

//admin
//this used for get the mission of specific user (the id of user include in the request,sended from frontEND)
app.get('/users/userMissions/:id', (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); //data come from frontEND as string and in db we save the id as objectID then we convert string to objectID
    MissionModel.find({"employeeId":objectId}) //get all missions that the field of employeeId of them is objectId
    .then(missions => res.json(missions))
    .catch(err=>res.json(err));
});


//admin
//this used for delete a user (the id of the user we want to delete send with the request)
app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params; //get the id from the request 

    // delete user from User Schema then search his missions to delete them also 
    UserModel.findByIdAndDelete(id) 
    .then(deletedUser => {
        return MissionModel.deleteMany({ employeeId: id });
    })
    .then(result => {
        res.status(200).send(`User and his missions were deleted successfully. ${result.deletedCount} missions were deleted.`);
    })
    .catch(err => { //if something error happen then we back a error json 
        console.error(err);
        res.status(500).json(err);
    });
});

//admin
//this used for delete a mission (delete request)
app.delete('/userMissions/delete/:id', (req, res) => {
    const { id } = req.params; //id of mission

    // delete user then search his missions to delete them also 
    MissionModel.findByIdAndDelete(id)
    .then(result => {
        res.status(200).send(`mission were deleted successfully.`);
    })
    .catch(err => { //if something wrong happen then we send a error respond
        console.error(err);
        res.status(500).json(err);
    });
});

//admin
//this used for add a new mission in the db  (post request because we add data)
app.post('/add_mission',async (req,res)=>{
    const { date, missionDescription, time, userid } = req.body;    
    try {
        // search user by his id
        const user = await UserModel.findById(userid);
        const endDateISO = `${date}T${time}`

        //we get the name of userId to send it to frontend and display his name beside the word mission (ronen missions)
        const employeeName = user.name;
        // create new object to add to our database
        const newMission = {
            employeeId: userid,
            employeeName,
            // missionDate: date,
            endDate: new Date(endDateISO),
            missionDescription,
            status: 'waiting',
        };

        // save to our db 
        const savedMission = await MissionModel.create(newMission);
        res.status(201).send(savedMission);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding mission");
    }
})

//admin
//this used to add a new message to the db (post request because we add data)
app.post('/add_message',(req,res)=>{
    const {title,content} = req.body //get the title and content
    const status='new'; 
    const newMSG = {
        title,
        MsgContent:content,
        status,
    };
    MsgModel.create(newMSG) //add to db 
    .then(result=>res.send('success'))
    .catch(err=>res.send('failed'))
})

//admin,user
//this get all the messages (get request becasue we just get from the db not add or update it)
app.get('/get_messages',(req,res)=>{
    MsgModel.find()  //we get all the users in the db חוץ מה admin
    .then(all_messages=>{
        res.json(all_messages)})
    .catch(err=>res.json(err))
});

//admin
//this add a new employee to the db 
app.post('/add_employee',async (req,res)=>{
    const { name, email, phone, gender } = req.body;
    const password = Math.random().toString(36).slice(-8);  //create random password
    const age = 99; //default value chosen for age (user can change it)
    const image = gender==="male"?'Images/iconMan.png':'Images/iconFemale.png'; //check a gender then save a path of image 
    const newEmployee = {  //make new object with data of employee to add for db 
        name,
        email,
        phone,
        gender,
        age,
        image,
        password,
    };
    UserModel.create(newEmployee)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
});

//user 
//get missions of user and that there status is waiting (id of user send with the request )
app.get('/newUserMissions/:id',(req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    MissionModel.find({"employeeId":objectId,"status":"waiting"})  //get just mission in waiting status 
    .then(missions => 
        // {res.json(missions)
        {if(missions.length>0)
        {
            res.json({ missionsStatus: true, Missions:missions});
        }
        else{
           res.json({ missionsStatus: false,ErrorMSG:"no missions founded"})
        }
        })
    .catch(err=>res.json(err));
});

//user 
//get missions of use and there status is in proccess and completed
app.get('/ExistingUserMissions/:id',(req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    MissionModel.find({"employeeId":objectId,"status":{$in: ['IN PROCESS','completed']}})
    .then(missions => 
        // {res.json(missions)
        {if(missions.length>0)
        {
            res.json({ missionsStatus: true, Missions:missions});
        }
        else{
           res.json({ missionsStatus: false,ErrorMSG:"no missions founded"})
        }
        })
    .catch(err=>res.json(err));
});

//user
//get the data of user (id of user we want his data is send with the request )
app.get('/userData/:id',(req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    UserModel.findById(objectId)
    .then(user=>res.json(user))
    .catch(err=>res.json(res))
})

//user and admin (they both can update data of the user)
app.post('/editUserData/:id',upload.single('image'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    const formData = req.body //formData because there is a pictures 
    if(req.file){
        formData.image = req.file.path.split('public\\')[1]; //split the string path in the public place and the second part (delete public/ from the path string)
    }
    UserModel.updateOne({_id:objectId},{$set:formData})
    .then(res=>res.send('success')) //dont forget to check if length big than 0 then update success
    .catch(err=>res.send(err))
})

//user
//this get the number of mission in the db in status waiting (in user home we display the num of new missions for the user )
app.get('/numMissionsMessages/:id',(req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.find({"employeeId":objectId,"status":"waiting"}) //we can right employeeID and status with "" or without
    .then(missions=>res.json(missions.length))
    .catch(err=>res.json(err))
})

//user
//like in the numMissionsMessages
app.get('/numMessages',(req,res)=>{
    MsgModel.find() //we can right employeeID and status with "" or without
    .then(msg=>res.json(msg.length))
    .catch(err=>res.json(err))
})

//user
//this used when user make accept for mission (in db we change the status of the mission from waiting for IN PROCESS)
app.post('/acceptMission/:id', (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.updateOne({ _id: objectId }, { $set: { status: 'IN PROCESS' } })
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).send('Mission not found');
            }
            res.send('Mission updated successfully');
        })
        .catch(err => {
            res.status(500).send('Error updating mission');
        });
});

//user
//this used for change the status of mission to completed 
app.post('/finishMission/:id', (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.updateOne({ _id: objectId }, { $set: { status: 'completed' } }) //here we update in the db 
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).send('Mission not found');
            }
            res.send('Mission updated successfully');
        })
        .catch(err => {
            res.status(500).send('Error updating mission');
        });
});



app.listen(3001,()=>{
    console.log("server is running")
})