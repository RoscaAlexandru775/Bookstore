import db from "db";
import Cart from '../types/cart.type'
import dotenv from 'dotenv'

dotenv.config(); 

class CartModel {
    
    async addToCart(cart: Cart) {
        try {
            
        const { user_id, book_id } = cart;
        const checkIfBookIsInCart = await db.checkIfBookIsInCart(user_id, book_id);
        if(checkIfBookIsInCart.rows.length > 0) {
            throw 'Book is already in cart';
        }
        const result = await db.addToCart(user_id, book_id);
    
        return result.rows[0];
                  
        } catch (error) {
          throw error;
        }
    }   
    
    async removeFromCart(cartId: number) {
        try {
            
            const id = cartId || 0;
            const result = await db.removeFromCart(id);
            
            return result.rows[0];
                  
        } catch (error) {
          throw error;
        }
    }  
    async getUserCart(userId: number) {
        try {
            
      

            const result = await db.getUserCart(userId);
            
            for(let i = 0; i < result.rows.length; i++) {
                 const res = await db.getBookById(result.rows[i].book_id);
                 result.rows[i].book  = res.rows[0];
            }
            
            return result.rows;
                  
        } catch (error) {
          throw error;
        }
    }  
    
}

export default CartModel