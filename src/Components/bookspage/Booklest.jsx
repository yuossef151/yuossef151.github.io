import { useContext, useEffect, useMemo, useState } from "react";
import Bookdata from "./Bookdata";
import Categories from "./Categories";
import { getbooksAPI, getcategoryAPI } from "../../API/Auth";
import { CartContext } from "../cartpage/CartContext";
import { useQuery } from "@tanstack/react-query";

export default function Booklest() {
  const {page, isLoading2 , isFetching, settpage, bookData , selectedCategories , searchValue ,setSearchValue,Cart} =
    useContext(CartContext);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [searchValue, setSearchValue] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };


// const {
//   data: bookData,
//   isLoading,
//   isFetching,
// } = useQuery({
//   queryKey: ["books", page, searchValue, selectedCategories.join(",")],

// queryFn: async ({ queryKey }) => {
//   const [, page, search, categories] = queryKey;

//   const res = await getbooksAPI(page, {
//     search: search || "",
//     category_id: categories || "",
//   });

//   return res.data.data;
// }
// });
  const mybookdata = bookData;
  console.log(bookData);
  
  useEffect(() => {
  console.log("FILTER:", selectedCategories);
}, [selectedCategories]);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getcategoryAPI();
      return res.data.data.items;
    },
  });

  const books = bookData?.books ?? [];
  const pages = bookData?.pagination_links?.meta ?? {};
  const categories = categoriesData || [];

  const totalCount = categories.reduce((sum, cat) => {
    return sum + cat.books_count;
  }, 0);

  useEffect(() => {
    const selectedData = categories.filter((cat) =>
      selectedCategories.includes(cat.id),
    );

    console.log("Selected Categories Data:", selectedData);
  }, [selectedCategories, categories]);
useEffect(() => {

  if (searchValue !== "" || selectedCategories.length > 0) {
    settpage(1);
    localStorage.setItem("currentBookPage", 1);
  }
}, [searchValue, selectedCategories]);

useEffect(() => {
  console.log("Current page is:", page);
}, [page]);
  return (
    <>
      <div className="flex sm:max-md:flex sm:max-md:flex-col flex-col lg:flex-row  bg-[#F5F5F5] ">
<div className="">
          <Categories
          category={categories}
          handleCategoryChange={handleCategoryChange}
          selectedCategories={selectedCategories}
        />
</div>
        <div className="lg:w-[70%]">
          <Bookdata
            bookdata={mybookdata}
            isLoading={isLoading2}
            isFetching={isFetching}
            search={searchValue}
            setsearch={setSearchValue }
            page={page}
            pages={pages}
            settpage={settpage}
            book={books}
            cart={Cart}
            booktotal={totalCount}
          />
        </div>
      </div>
    </>
  );
}
