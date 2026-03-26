import Bookdata from "../Bookdata";

export default function Details({boookdata , book}) {
    
  return (
    <>
      <div className="lg:px-12.5 px-4 flex flex-col gap-5 py-5">
        <p className="text-black"><span className="lg:text-[18px] font-bold">Book Title :</span> {book?.bookName}</p>
        <p className="text-black"><span className="lg:text-[18px] font-bold">Author :</span> {book?.author}</p>
        <p className="text-black"><span className="lg:text-[18px] font-bold">Publication Date :</span> {book?.publicationYear}</p>
        <p className="text-black"><span className="lg:text-[18px] font-bold">ASIN :</span> {book?.asinCode}</p>
        <p className="text-black"><span className="lg:text-[18px] font-bold">Language :</span> {book?.lang}</p>
        <p className="text-black"><span className="lg:text-[18px] font-bold">Pages :</span> {book?.numberOfPages}</p>
        <p className="text-black"><span className="lg:text-[18px] font-bold">Book Format :</span> {book?.bookFormat}</p>
      </div>
    </>
  )
}
