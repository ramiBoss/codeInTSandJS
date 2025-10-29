import Answer from "./Answer";
import Question from "./Question";
import Tag from "./Tag";
import User from "./User";

class StackOverflowSystem {
  // Implementation of StackOverflow system would go here
  private static instance: StackOverflowSystem;
  private questions: Map<number, Question>;
  private answers: Map<number, Answer>;
  private users: Map<number, User>;
  private tags: Map<number, Tag>;
  
  private constructor() {
    this.questions = new Map();
    this.answers = new Map();
    this.users = new Map();
    this.tags = new Map();
  }

    public static getInstance(): StackOverflowSystem {
        if (!StackOverflowSystem.instance) {
            StackOverflowSystem.instance = new StackOverflowSystem();
        }
        return StackOverflowSystem.instance;
    }

    createUser(id: number, name: string): User {
        const user = new User(id, name);
        this.users.set(id, user);
        return user;
    }

    createTag(id: number, name: string): Tag {
        const tag = new Tag(id, name);
        this.tags.set(id, tag);
        return tag;
    }

    createQuestion(title: string, body: string, id: number, postedByUser: User): Question {
        const question = new Question(title, body, id, postedByUser);
        this.questions.set(id, question);
        return question;
    }

    createAnswer(id: number, questionId: number, body: string, postedByUser: User): Answer {
        const answer = new Answer(id, questionId, body, postedByUser);
        this.answers.set(id, answer);
        return answer;
    }

    getAllQuestions(): Question[] {
        return Array.from(this.questions.values());
    }

    getAllAnswers(): Answer[] {
        return Array.from(this.answers.values());
    }

    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }

    getAllTags(): Tag[] {
        return Array.from(this.tags.values());
    }

    getUserById(id: number): User | undefined {
        return this.users.get(id);
    }

    getQuestionById(id: number): Question | undefined {
        return this.questions.get(id);
    }

    getAnswerById(id: number): Answer | undefined {
        return this.answers.get(id);
    }

    getTagById(id: number): Tag | undefined {
        return this.tags.get(id);
    }

    commentOnQuestion(questionId: number, userId: number, commentText: string): void {
        const question = this.questions.get(questionId);
        if (question) {
            question.addComment(userId, commentText);
        }
    }

    commentOnAnswer(answerId: number, userId: number, commentText: string): void {
        const answer = this.answers.get(answerId);
        if (answer) {
            answer.addComment(userId, commentText);
        }
    }

    voteOnQuestion(questionId: number, userId: number, isUpvote: boolean): void {
        const question = this.questions.get(questionId);
        if (question) {
            if (isUpvote) {
                question.upvote(userId);
            } else {
                question.downvote(userId);
            }
        }
    }

    voteOnAnswer(answerId: number, userId: number, isUpvote: boolean): void {
        const answer = this.answers.get(answerId);
        if (answer) {
            if (isUpvote) {
                answer.upvote(userId);
            } else {
                answer.downvote(userId);
            }
        }
    }

    searchQuestionsByTag(tagName: string): Question[] {
        const result: Question[] = [];
        for (const question of this.questions.values()) {
            const tags = question.getTags();
            if (tags.some(tag => tag.getName() === tagName)) {
                result.push(question);
            }
        }
        return result;
    }

    searchQuestion(query: string): Question[] {
        const result: Question[] = [];
        for (const question of this.questions.values()) {
            if (question.getTitle().includes(query) || question.getBody().includes(query)) {
                result.push(question);
            }
        }
        return result;
    }
}

export default StackOverflowSystem;