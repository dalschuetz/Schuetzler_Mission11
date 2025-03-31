import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "../Components/Pagination";
import NewBookForm from "../Components/NewBookForm";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<string>("AllBooks");
    const [showForm, setShowForm] = useState<boolean>(false);
    
    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, [], sortOrder);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum, sortOrder]);

    if (loading) return <div>Loading books...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return(
        <div>
            <h1>Admin - Books</h1>

            {!showForm && (
                <button className="btn btn-success mb-3" 
                onClick={() => setShowForm(true)}>Add New Book</button>
            )}

            {showForm && (
                <NewBookForm 
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, [], sortOrder).then((data) => {
                            setBooks(data.books);
                        });
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.bookID}>
                            <td>{b.bookID}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.price}</td>
                            <td>
                                <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => console.log(`Edit ${b.bookID}`)}>Edit</button>
                                <button className="btn btn-danger btn-sm w-100 mb-1" onClick={() => console.log(`Delete ${b.bookID}`)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                        currentPage={pageNum}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        sortOrder={sortOrder}
                        onPageChange={setPageNum}
                        onPageSizeChange={(newSize) => {
                            setPageSize(newSize);
                            setPageNum(1);
                        }}
                        onSortOrderChange={setSortOrder}/>
        </div>
    );
};



export default AdminBooksPage;