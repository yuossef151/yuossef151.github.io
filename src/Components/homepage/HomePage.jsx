import { useQuery } from "@tanstack/react-query";
import BestSeller from "./BestSeller";
import Feature from "./Feature";
import Img from "./Img";
import Recomend from "./Recomend";
import { getbooks } from "../../API/Auth";

export default function HomePage() {
  const {
    data: bookData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const res = await getbooks();
        return res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Img />
      <Feature />
      <BestSeller bookData={bookData} />
      <Recomend bookData={bookData} />
    </>
  );
}
