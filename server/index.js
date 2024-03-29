const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/Users')
const MissionModel = require('./models/Missions')
const MsgModel = require('./models/MSG')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'https://final-project-a19-frontend.vercel.app',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.static('public'));
// mongoose.connect("mongodb://localhost:27017/UsersMissionsManagement")
mongoose.connect("mongodb+srv://hunterman481:EWsTL72vV9XJOMFy@usersmissionsmanagement.byntanj.mongodb.net/?retryWrites=true&w=majority&appName=UsersMissionsManagement")

function makeToken(userType)
{
    const token = jwt.sign(
    
        {role:userType,email:email,userID:id},
        "jwt_secret_key",
        {expiresIn:"1d"}
) 
return token
}

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./public/Images")
    },
    filename: function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage})

// admin
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
                if(email==="admin@gmail.com")
                {
                    token = jwt.sign(
                            {role:"admin",name:username,email:email,userID:id},
                            "jwt_secret_key",
                            {expiresIn:"1d"}
                    )
                }
                else
                {
                    token = jwt.sign(
                        {role:"user",name:username,email:email,userID:id},
                        "jwt_secret_key",
                        {expiresIn:"1d"}
                )  
                }
                console.log(email,id)
                res.json({ loginStatus: true, token: token ,userID:id}); // שולח את הטוקן בתוך התגובה ה-JSON   
            }
            else 
            {
                console.log('failed')
                res.json({ loginStatus: false,ErrorMSG:"email or password is wrong"})
            }
            
                })
    .catch(err=>console.log(err))
    // .catch(err=>res.json(err))
});

//admin
app.get('/users',(req,res)=>{
    UserModel.find({email:{$ne:"admin@gmail.com"}})  //we get all the users in the db חוץ מה admin
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
});

//admin
app.get('/allMissions', (req, res) => {
    //find without filter mean we want to get all elements in the schema
    MissionModel.find() 
    .then(missions => {
        console.log(typeof(missions[0].employeeId))
        res.json(missions)}) //return the missions
    .catch(err=>res.json(err));
});

//admin
app.get('/users/userMissions/:id', (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    MissionModel.find({"employeeId":objectId})
    .then(missions => res.json(missions))
    .catch(err=>res.json(err));
});


//admin
app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params;

    // delete user then search his missions to delete them also 
    UserModel.findByIdAndDelete(id)
    .then(deletedUser => {
        return MissionModel.deleteMany({ employeeId: id });
    })
    .then(result => {
        res.status(200).send(`User and his missions were deleted successfully. ${result.deletedCount} missions were deleted.`);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});

//admin
app.delete('/userMissions/delete/:id', (req, res) => {
    const { id } = req.params; //id of mission

    // delete user then search his missions to delete them also 
    MissionModel.findByIdAndDelete(id)
    .then(result => {
        res.status(200).send(`mission were deleted successfully.`);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});



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
app.post('/add_message',(req,res)=>{
    const {title,content} = req.body //get the title and content
    const status='new'; 
    const newMSG = {
        title,
        MsgContent:content,
        status,
    };
    MsgModel.create(newMSG)
    .then(result=>res.send('success'))
    .catch(err=>res.send('failed'))
})

app.get('/get_messages',(req,res)=>{
    MsgModel.find()  //we get all the users in the db חוץ מה admin
    .then(all_messages=>{
        res.json(all_messages)})
    .catch(err=>res.json(err))
});

//admin
app.post('/add_employee',async (req,res)=>{
    const { name, email, phone, gender } = req.body;
    const password = Math.random().toString(36).slice(-8);  //create random password
    const age = 99; //default value chosen for age (user can change it)
    const image = gender==="male"?'Images/iconMan.png':'Images/iconFemale.png';
    const newEmployee = {
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
//get missions of use and there status is waiting
app.get('/newUserMissions/:id',(req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    MissionModel.find({"employeeId":objectId,"status":"waiting"})
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
app.get('/userData/:id',(req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    UserModel.findById(objectId)
    .then(user=>res.json(user))
    .catch(err=>res.json(res))
})

//user and admin
app.post('/editUserData/:id',upload.single('image'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    const formData = req.body
    if(req.file){
        formData.image = req.file.path.split('public\\')[1]; //split the string path in the public place and the second part (delete public/ from the path string)
    }
    UserModel.updateOne({_id:objectId},{$set:formData})
    .then(res=>res.send('success')) //dont forget to check if length big than 0 then update success
    .catch(err=>res.send(err))
})

//user
app.get('/numMissionsMessages/:id',(req,res)=>{
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.find({"employeeId":objectId,"status":"waiting"}) //we can right employeeID and status with "" or without
    .then(missions=>res.json(missions.length))
    .catch(err=>res.json(err))
})

//user
app.get('/numMessages',(req,res)=>{
    MsgModel.find() //we can right employeeID and status with "" or without
    .then(msg=>res.json(msg.length))
    .catch(err=>res.json(err))
})

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

app.post('/finishMission/:id', (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.updateOne({ _id: objectId }, { $set: { status: 'completed' } })
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