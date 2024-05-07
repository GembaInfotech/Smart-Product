import jwt from "jsonwebtoken";

const generateToken = (id) =>{
    return jwt.sign({id}, "mysecret", {expiresIn:  "1h"});
}

export {generateToken};