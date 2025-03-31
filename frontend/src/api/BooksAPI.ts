import { Book } from "../types/Book";


interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = "https://localhost:3200/Book";

export const fetchBooks = async (
pageSize: number, pageNum: number, selectedCategories: string[], sortOrder: string,
): Promise<FetchBooksResponse> => {
    try{
        const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(cat)}`).join('&');
        const response = await fetch(`${API_URL}${sortOrder}?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
        if (!response.ok) {
            throw new Error(`Failed to Fetch Books: ${response.statusText}`);}
        return await response.json()
    }

    catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }

    
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });
        if (!response.ok) {
            throw new Error(`Failed to add book: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};
