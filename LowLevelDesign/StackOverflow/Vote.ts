class Vote {
    private userId: number;
    private postId: number;
    private voteType: number;

    constructor(userId: number, postId: number, voteType: number) {
        this.userId = userId;
        this.postId = postId;
        this.voteType = voteType;
    }

    getUserId(): number {
        return this.userId;
    }

    getPostId(): number {
        return this.postId;
    }

    getVoteType(): number {
        return this.voteType;
    }
}

export default Vote;
