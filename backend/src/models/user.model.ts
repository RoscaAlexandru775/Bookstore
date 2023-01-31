import db from "db";
import User from '../types/user.type'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config(); 

class UserModel {
    
    async register(user: User) {
        try {
            
            
          const { name, password, email} = user;
          const hashedPassword = await bcrypt.hash(password, 10);
          const result = await db.registerUser(name, email, hashedPassword);
          if(result.rowCount === 0) {
            throw 'Something went wrong';
          }
          return result.rows[0];
                  
        } catch (error) {
          throw error;
        }
    }   
    async login(user: User) {
      try {
          
          
          const { email , password} = user;
          const result = await db.loginUser(email);
          const hashedPassword = result.rows[0].password;
          const {name} = result.rows[0];        
          const response = await bcrypt.compare(password, hashedPassword)
          if(!response) {
            throw 'Invalid credentials';
          }          
          const token = jwt.sign({role: "USER", name: name, userId: result.rows[0].user_id},  process.env.JWT_SECRET || "secret");
          return token;
                
      } catch (error) {
        throw error;
      }
  }   
    
}

export default UserModel