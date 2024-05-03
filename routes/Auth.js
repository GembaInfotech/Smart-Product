import express from 'express'
const router = express.Router();
import { Vendors } from '../models/vendormodel.js';
import bcrypt from 'bcrypt'
router.post('/signup', (req,res)=>{
    let{name, email, password, }= req.body;
    name= name.trim();
    email=email.trim();
    password=password.trim();
    if(name==""|| email==""|| password=="")
    {
        res.json({
            status:"FAILED",
            message:"Empty Input Field"
        })
    }
    else if (!/^[a-zA-Z ]*$/.test(name)){
        res.json({
            status:"FAILED",
            message:"Invalid name entered"
        })
    }
    else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email))
    {
        res.json({
            status:"FAILED",
            message:"Invalid Email entered"
        })
    }
    else if (password.length < 8)
    {
        res.json({
            status:"FAILED",
            message:"Password is too short"
        })
    }
    else{
        Vendors.find({email}).then(result => {
            if(result.length){
                res.json({
                    status:"FAILED",
                    message:"User Exists Already"
                })
            } 
            else{

                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword=>{
              
                    const newVendor = new Vendors({
                        name, 
                        email,
                        password:hashedPassword
                    })
                    newVendor.save().then(result=>{
                        res.json({
                            status:"SUCCESS",
                            message:"Signup Successful",
                            data:result
                        })
                       
                    }).catch(err=>{
                        res.json({
                            status:"FAILED",
                            message:"An error occured while creating a password"
                        })
                    })

                }).catch(err=>{
                    res.json({
                        error:err,
                        status:"FAILED",
                        message:"An error occured while hasing the password "
                    })
                })

            }

        }).catch(err => {
            console.log(err);
            res.json({
               
                    status:"FAILED",
                    message:"An error occured while checking for existing user!"
              
            })
        })

    }
})

router.post('/signin',(req,res)=>{
    let{ email, password, }= req.body;
    email=email.trim();
    password=password.trim();
    if(email==""|| password=="")
    {
        res.json({
            status:"FAILED",
            message:"Empty Credentials Field"
        })
    }
    else{
        Vendors.find({email}).then(data=>{
            if(data){

                const hashedPassword= data[0].password;
                bcrypt.compare(password,hashedPassword).then(result =>{
                    if(result){
                        console.log(password, hashedPassword)
                            res.json({
                                status:"SUCCESS",
                                message:"Signin Successful",
                                data:data
                            })
                        
                    }
                    else{
                        res.json({
                            status:"FAILED",
                            message:"Invalid Password"
                           
                        })
                    }
                })
                .catch(err=>{
                    res.json({
                        status:"FAILED",
                        message:"An error occured while comparing password",
                       
                    })
                })
            }
            else{
                res.json({
                    status:"FAILED",
                    message:"An error occured",
                   
                })
            }
        }).catch(err=>{
            res.json({
                status:"FAILED",
                message:"An error occured while checking for existing user!"
              
            })
        })
    }
})
export  {router}