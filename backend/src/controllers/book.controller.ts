import { Request, Response, NextFunction } from "express";
import BookModel from "models/book.model";

const bookModel = new BookModel();

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookModel.getAllBooks();
    res.status(200).send();
  } catch (err: any) {
    res.status(500).send(err);
  }
};

export const getNewestBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        const numberOfBooks = req.query.numberOfBooks;
        let limit = parseInt(numberOfBooks?.toString() || '10');
        
        const result = await bookModel.getNewestBooks(limit);
        res.status(200).send(result);

    } catch (err: any) {
        res.status(500).send(err);
    }
}

export const getTopRatedBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        const numberOfBooks = req.query.numberOfBooks;
        let limit = parseInt(numberOfBooks?.toString() || '20');
        
        const result = await bookModel.getTopRatedBooks(limit);
        res.status(200).send(result);

    } catch (err: any) {
        res.status(500).send(err);
    }
}


export const getFilteredBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try {
        const page = parseInt(req.query.page?.toString() || '0');
        const categories = req.query.categories?.toString().split(',').filter( value => value !== '') || [];
        const lowerRating = parseInt(req.query.lowerRating?.toString() || '0');
        const upperRating = parseInt(req.query.upperRating?.toString() || '5');
        const lowerNumberOfRatings = parseInt(req.query.lowerNumberOfRatings?.toString() || '0');
        const upperNumberOfRatings = parseInt(req.query.upperNumberOfRatings?.toString() || '1000000');
        const offset = page * 9;
        
        //TO DO change this to a enum
        if(categories.length === 0) {
            categories.push('Romance')
            categories.push('Horror')
            categories.push('Thriller')
            categories.push('History')
            categories.push('Mystery')
            categories.push('Astrnomy')
            categories.push('Physics')
            categories.push('Science')
            categories.push('Mathematics')
            categories.push('Psychology')
            categories.push('Nutrition')
            categories.push('Philosophy')
        }
        else{
            categories.map( (value, index) => {
                if(value === 'ROMANCE') 
                    categories[index] = 'Romance'
                else if(value === 'HORROR')
                    categories[index] = 'Horror'
                else if(value === 'THRILLER')
                    categories[index] = 'Thriller'
                else if(value === 'HISTORY')
                    categories[index] = 'History'
                else if(value === 'MYSTERY')
                    categories[index] = 'Mystery'
                else if(value === 'ASTRONOMY')
                    categories[index] = 'Astronomy'
                else if(value === 'PHYSICS')
                    categories[index] = 'Physics'
                else if(value === 'SCIENCE')
                    categories[index] = 'Science'
                else if(value === 'MATHEMATICS')
                    categories[index] = 'Mathematics'
                else if(value === 'PSYCHOLOGY')
                    categories[index] = 'Psychology'
                else if(value === 'NUTRITION')
                    categories[index] = 'Nutrition'
                else if(value === 'PHILOSOPHY')
                    categories[index] = 'Philosophy'
            })
            
        }
        
        const result = await bookModel.getFilteredBooks(page, categories, lowerRating, upperRating, lowerNumberOfRatings, upperNumberOfRatings, offset);
        const result2 = await bookModel.getTotalNumberOfFilteredBooks(categories, lowerRating, upperRating, lowerNumberOfRatings, upperNumberOfRatings);
        const totalNumberOfBooks = result2[0].count;
        const totalPages = Math.ceil(totalNumberOfBooks / 9);
        const response = {
            books: result,
            totalPages: totalPages
        }
        res.status(200).send(response);

    } catch (err: any) {
        res.status(500).send(err);
    }
}
export const searchBooks = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    try{
        const result = await bookModel.searchBooks(req.query.searchQuery?.toString() || '');
        const response = {
            books: result,
            totalPages: 0
        }
        
        res.status(200).send(response);
    }catch (err: any)
    {
        res.status(500).send(err)
    }
}