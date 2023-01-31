import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


export default function checkAuthorisation(
    req: Request,
    res: Response,
    next: NextFunction
    )  {
        

    const token = req.headers.authorization?.split(' ')[1]
        
    if (!token) {
      res.status(401).send('Invalid or missing authorization token')
    } else {
     
        try{ 
        
            jwt.verify(
            token,
            process.env.JWT_SECRET as unknown as string
            )

            next()
        }
        catch(err)
        {
            console.log(err)
            res.status(401).send('Kill the token since it is invalid')
        }
    
    }
}
