import { Comment } from "./CommentModel";

export interface ICommentRepository {
    create(comment: Comment): Promise<Comment>;
    getByProductId(productId: string): Promise<Comment[]>;
    getById(commentId: string): Promise<Comment | null>;
    update(comment: Comment): Promise<Comment | null>;
    delete(commentId: string): Promise<boolean>;
}