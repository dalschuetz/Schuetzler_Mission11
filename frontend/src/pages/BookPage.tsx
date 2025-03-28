import { useState } from "react";
import Welcome from "../Components/Welcome";
import CategoryFilter from "../Components/CategoryFilter";
import BookList from "../Components/BookList";
import CartSummary from "../Components/CartSummary";

function BookPage (){
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return(
    <>
      <div className='container'>
          <CartSummary />
          <Welcome />
        <div className='row'>
          <div className='col-md-3'>
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>
          <div className='col-md-9'>
            <BookList selectedCategories={selectedCategories}/>
          </div>
        </div>
      </div>
    </>
    );
}

export default BookPage;