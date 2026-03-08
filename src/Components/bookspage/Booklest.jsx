import { useContext, useEffect, useMemo, useState } from "react";
import Bookdata from "./Bookdata";
import Categories from "./Categories";
import { getbooksAPI, getcategoryAPI } from "../../API/Auth";
import { CartContext } from "../cartpage/CartContext";
import { useQuery } from "@tanstack/react-query";

export default function Booklest() {
  const [page, setpage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName],
        
    );

  };
  useEffect(() => {
  console.log("Selected Categories updated:", selectedCategories);
}, [selectedCategories]);
  const { Cart } = useContext(CartContext);

  const { data: bookData, isLoading } = useQuery({
    queryKey: ["books", page, selectedCategories],
    queryFn: async () => {
      const filters =
        selectedCategories.length > 0
          ? { category_name: { $in: "Tax Examiner" } }
          : {};

      const res = await getbooksAPI(page, { params: { filters } });
      return res.data.data;
    },
    keepPreviousData: true,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getcategoryAPI();
      return res.data.data.items;
    },
  });

  const books = bookData?.books || [];
  const pages = bookData?.pagination_links?.meta || {};
  const categories = categoriesData || [];

  const totalCount = categories.reduce((sum, cat) => {
    return sum + cat.books_count;
  }, 0);

  return (
    <>
      <div className="flex md:flex md:flex-col flex-col lg:flex-row bg-[#F5F5F5] ">
        <Categories
          category={categories}
          handleCategoryChange={handleCategoryChange}
          selectedCategories={selectedCategories}
        />
        <div className="">
          <Bookdata
            page={page}
            pages={pages}
            settpage={setpage}
            book={books}
            cart={Cart}
            booktotal={totalCount}
          />
        </div>
      </div>
    </>
  );
}
