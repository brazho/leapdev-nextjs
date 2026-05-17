"use client";

import { useState } from "react";
import data from "../../public/data.json";
import BookCard from "@/components/BookCard";
import Modal from "@/components/Modal";
import BookForm from "@/components/BookForm";
import { Book } from "@/types/book";
import ThemeToggle from "@/components/ThemeToggle";
import DeleteModal from "@/components/DeleteModal";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [IsDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1,
    };
    setBooks([...books, book]);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setBooks(
      books.map((book) =>
        book.id === selectedBook?.id ? { ...book, ...updatedBook } : book
      )
    );
    setIsModalOpen(false);
    setSelectedBook(undefined);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeletion = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
    setIsDeleteModalOpen(false);
    setIsModalOpen(false);
  };


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-accent">Book Gallery</h1>
        <div className="flex items-center">
          <ThemeToggle />
          <button
            onClick={() => {
              setSelectedBook(undefined);
              setIsModalOpen(true);
            }}
            className="btn btn-primary text-base-200 px-6 py-2 rounded-lg"
          >
            Add New Book
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(undefined);
        }}
      >
        {
          IsDeleteModalOpen ?
            <DeleteModal
              formTitle="Are you sure you want to delete this book?"
              bookId={selectedBook?.id}
              onDelete={handleConfirmDeletion}
              onCancel={() => {
                setIsModalOpen(false);
                setIsDeleteModalOpen(false);
                setSelectedBook(undefined);
              }}
            />
            :
            <BookForm
              formHeading={selectedBook ? "Edit Book" : "Add New Book"}
              book={selectedBook}
              onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
              onCancel={() => {
                setIsModalOpen(false);
                setSelectedBook(undefined);
              }}
            />
        }
      </Modal>
    </main>
  );
}
