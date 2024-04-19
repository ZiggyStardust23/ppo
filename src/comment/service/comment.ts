import { Comment } from "../model/comment.js";
import { ICommentRepository } from "../repository/comment.js";

export interface ICommentService {
    createComment(userId: string, productId: string, text: string, rate: number): Promise<Comment>;
    getCommentsByProductId(productId: string): Promise<Comment[]>;
    updateCommentRate(commentId: string, rate: number): Promise<Comment | null>;
    deleteComment(commentId: string): Promise<boolean>;
}

export class CommentService implements ICommentService {
    constructor(private commentRepository: ICommentRepository) {}

    public async createComment(userId: string, productId: string, text: string, rate: number): Promise<Comment> {
        const comment: Comment = {
            guid: 'comment123',
            userId: userId,
            productId: productId,
            text: text,
            rate: rate
        };
        return this.commentRepository.create(comment);
    }

    public async getCommentsByProductId(productId: string): Promise<Comment[]> {
        return this.commentRepository.getByProductId(productId);
    }

    public async updateCommentRate(commentId: string, rate: number): Promise<Comment | null> {
        const comment = await this.commentRepository.getById(commentId);
        if (!comment) {
            return null;
        }
        comment.rate = rate;
        return this.commentRepository.updateRate(commentId, rate);
    }

    public async deleteComment(commentId: string): Promise<boolean> {
        return this.commentRepository.delete(commentId);
    }
}