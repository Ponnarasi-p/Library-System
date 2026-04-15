export interface Book {
  id: number;
  title: string;
  author: string;
  totalCopies: number;
  availableCopies: number;
  status: "ACTIVE" | "INACTIVE";
  coverUrl?: string;
}