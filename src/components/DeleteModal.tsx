"use client";

interface DeleteModalProps {
    formTitle: string;
    bookId?: number;
    onDelete: (id: number) => void;
    onCancel: () => void;
}

export default function DeleteModal({ formTitle, bookId, onDelete, onCancel }: DeleteModalProps) {
    if (!bookId) return null;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">{formTitle}</h2>
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-primary text-base-200 px-4 py-2 text-sm font-medium rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(bookId)}
                    className="btn btn-primary text-base-200 px-4 py-2 text-sm font-medium border border-transparent rounded-md"
                >
                    Delete Book
                </button>
            </div>
        </div>
    );
}