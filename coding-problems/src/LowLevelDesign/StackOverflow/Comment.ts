class Comment {
    private userId: number;
    private postId: number;
    private content: string;

    constructor(userId: number, postId: number, content: string) {
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    getUserId(): number {
        return this.userId;
    }

    getPostId(): number {
        return this.postId;
    }

    getContent(): string {
        return this.content;
    }
}

export default Comment;
