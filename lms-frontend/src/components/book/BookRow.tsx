import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import styles from "@/styles/books.module.css";

export default function BookRow({
  book,
  onView,
  onEdit,
  onDelete,
  loadingId,
}: any) {
  const isDeleting = loadingId === book.id;

  return (
    <div className={styles.row}>
      <div>{book.title || "-"}</div>
      <div>{book.author || "-"}</div>
      <div>{book.totalCopies ?? "-"}</div>

      <div>
        <Badge status={book.status} />
      </div>

      <div className={styles.actions}>
        <Button onClick={() => onView(book.id)}>
          View
        </Button>

        <Button onClick={() => onEdit(book.id)}>
          Edit
        </Button>

        <Button
          onClick={() => onDelete(book.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}