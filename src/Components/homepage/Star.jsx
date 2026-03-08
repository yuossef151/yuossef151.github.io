import { FaStar } from "react-icons/fa";

export default function Star({ rate, countReview }) {
  const rating = rate ? Math.round(rate) : 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-lg ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <span className="text-gray-500 text-sm">
        ({countReview} Review)
      </span>
    </div>
  );
}
