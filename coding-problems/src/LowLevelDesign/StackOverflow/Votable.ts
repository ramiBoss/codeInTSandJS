interface Votable {
  upvote(userId: number): void;
  downvote(userId: number): void;
  getVotes(): { userId: number; voteType: number }[];
}

export default Votable;
