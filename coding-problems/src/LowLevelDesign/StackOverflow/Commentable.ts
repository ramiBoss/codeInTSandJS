interface Commentable {
  addComment(userId: number, commentText: string): void;
  getComments(): { userId: number; commentText: string }[];
}

export default Commentable;