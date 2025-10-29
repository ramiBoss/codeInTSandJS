import Commentable from "./Commentable";
import User from "./User";
import Votable from "./Votable";

class Answer implements Votable, Commentable {
    private id: number;
    private questionId: number; 
    private body: string;
    private postedByUser: User;

    constructor(id: number, questionId: number, body: string, postedByUser: User) {
        this.id = id;
        this.questionId = questionId;
        this.body = body;
        this.postedByUser = postedByUser;
    }

    addComment(userId: number, commentText: string): void {
        throw new Error("Method not implemented.");
    }
    
    getComments(): { userId: number; commentText: string; }[] {
        throw new Error("Method not implemented.");
    }
    
    upvote(userId: number): void {
        throw new Error("Method not implemented.");
    }
    
    downvote(userId: number): void {
        throw new Error("Method not implemented.");
    }

    getVotes(): { userId: number; voteType: number; }[] {
        throw new Error("Method not implemented.");
    }
}
export default Answer;