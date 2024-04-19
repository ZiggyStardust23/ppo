import { Comment } from "../model/comment";

export interface ICommentRepository {
    create(comment: Comment): Promise<Comment>;
    getByProductId(productId: string): Promise<Comment[]>;
    getById(commentId: string): Promise<Comment | null>;
    updateRate(commentId: string, rate: number): Promise<Comment | null>;
    delete(commentId: string): Promise<boolean>;
}