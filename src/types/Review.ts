type Review = undefined | {
  id: string;
  reviewer: string;
  reviewed: string;
  score: number;
  reviewText: string | null;
  createdAt: string;
}

export default Review
