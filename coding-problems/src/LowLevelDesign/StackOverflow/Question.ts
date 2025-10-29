import Answer from "./Answer";
import Commentable from "./Commentable";
import Tag from "./Tag";
import User from "./User";
import Votable from "./Votable";

class Question implements Votable, Commentable {
    private votes: { userId: number; voteType: number }[] = [];
    private comments: { userId: number; commentText: string }[] = [];
    private answers: Answer[] = [];
    private tags: Tag[] = [];

    private title: string;
    private body: string;
    private id: number;
    private postedByUser: User;

    constructor(title: string, body: string, id: number, postedByUser: User) {
        this.title = title;
        this.body = body;
        this.id = id;
        this.postedByUser = postedByUser;
    }

    addAnswer(answer: Answer): void {
        this.answers.push(answer);
    }

    upvote(userId: number): void {
        this.votes.push({ userId, voteType: 1 });
    }

    addTag(tag: Tag): void {
        this.tags.push(tag);
    }

    getTags(): Tag[] {
        return this.tags;
    }

    removeTag(tagId: number): void {
        this.tags = this.tags.filter(tag => tag.getId() !== tagId);
    }

    downvote(userId: number): void {
        this.votes.push({ userId, voteType: -1 });
    }

    getVotes(): { userId: number; voteType: number }[] {
        return this.votes;
    }

    addComment(userId: number, commentText: string): void {
        this.comments.push({ userId, commentText });
    }

    getComments(): { userId: number; commentText: string }[] {
        return this.comments;
    }

    getTitle(): string {
        return this.title;
    }

    getBody(): string {
        return this.body;
    }
}

export default Question;