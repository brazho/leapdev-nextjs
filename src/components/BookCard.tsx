import Image from "next/image";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <div className="relative rounded-lg shadow-md overflow-hidden bg-base-200">
      <div className="relative h-[300px] w-full">
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary">{book.title}</h3>
        <p className="text-secondary">{book.author}</p>
        <p className="text-accent font-semibold">
          {book.currency} {book.price.toFixed(2)}
        </p>
        <p className="text-base-content mb-2">Rated: {book.rating} / 5</p>
        <p className="text-base-content text-sm line-clamp-3 mb-4">
          {book.description}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="btn btn-secondary text-base-200 px-4 py-2 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book)}
            className="btn btn-secondary text-base-200 px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
