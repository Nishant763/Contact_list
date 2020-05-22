const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());//Middleware
app.use(express.static('assets'));
//Middleware 1
// app.use(function(req,res,next){
//     console.log("Middleware 1");
//     next();
// })
var contactList = [
    {
        name:'Nishant',
        phone:'9011876512'
    },
    {
        name:'Rishabh',
        phone:'7657889654'
    },
    {
        name:'Tony Stark',
        phone:'1234567890'
    }
]
app.post('/create-contact', function(req,res){
    // return res.render('practice');
    // contactList.push({name:req.body.name,phone:req.body.phone})
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone: req.body.phone
    },function(err,NewContact){
        if(err){
            console.log("Error:",err);
            return;
        }
        console.log(NewContact)
        return res.redirect('back');    
    })
    
       
});
app.get('/', function(req,res){
    // res.send('<h1>It\'s running or is it?</h1>');
    Contact.find({}, function(err,contacts){
        if(err){
            console.log("Error:",err);
            return;
        }
        return res.render('home',{
            title:'I am flying',
            contact_list:contacts
        });

    })
    
});

app.get('/practice', function(req,res){
    
    
    return res.render('practice',{title:'Practising'});
});

app.get('/delete-contact/', function(req,res){

    console.log(req.query);
    let id = req.query.id;
    Contact.deleteOne({_id: id},function (err) { 
        if(err){
            console.log("Error:",err);
        }
        return res.redirect('back');
     })
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    

});




app.listen(port, function(err){
    if(err) console.log("Error in running the server:",err);
    console.log("My Express server is running on port : ",port);
})