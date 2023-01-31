import db from "db";
import dotenv from 'dotenv'

dotenv.config(); 

class BookModel {
    
    async getAllBooks() {
        try {
            
                          
        } catch (error) {
          throw error;
        }
    }   
       
    async getNewestBooks(numberOfBooks: number) {
        try {
            
            const result = await db.getNewestBooks(numberOfBooks);
            return result.rows;
                          
        } catch (error) {
          throw error;
        }
    }  
    async getTopRatedBooks(numberOfBooks: number) {
        try {
            
            const result = await db.getTopRatedBooks(numberOfBooks);
            return result.rows;
                          
        } catch (error) {
          throw error;
        }
    }  
    async getFilteredBooks(page: number, categories: string[], lowerRating: number, upperRating: number, lowerNumberOfRatings: number, upperNumberOfRatings: number, offset: number) {
        try {
            
            const result = await db.getFilteredBooks(page, categories, lowerRating, upperRating, lowerNumberOfRatings, upperNumberOfRatings, offset);
            return result.rows;
                          
        } catch (error) {
          throw error;
        }
    }  
    async getTotalNumberOfFilteredBooks(categories: string[], lowerRating: number, upperRating: number, lowerNumberOfRatings: number, upperNumberOfRatings: number) {
        try {
            
            const result = await db.getTotalNumberOfFilteredBooks(categories, lowerRating, upperRating, lowerNumberOfRatings, upperNumberOfRatings);
            return result.rows;
                          
        } catch (error) {
          throw error;
        }
    }
    async searchBooks(searchString: string) {
        try {
            
            const result = await db.searchBooks(searchString);
            return result.rows;
                          
        } catch (error) {
          throw error;
        }
    }
}

export default BookModel