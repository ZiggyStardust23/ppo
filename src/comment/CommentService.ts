import { commentCreateDTO, commentUpdateRateDTO } from "./CommentDTO";
import { Comment } from "./CommentModel";
import { ICommentRepository } from "./CommentRepository";

export interface ICommentService {
    create(comment: commentCreateDTO): Promise<Comment>;
    findByProductId(productId: string): Promise<Comment[]>;
    updateRate(comment: commentUpdateRateDTO): Promise<Comment | null>;
    delete(commentId: string): Promise<boolean>;
}

export class CommentService implements ICommentService {
    constructor(private commentRepository: ICommentRepository) {}

    public async create(comment: commentCreateDTO): Promise<Comment> {
        const commentToCreate = new Comment(
            "",
            comment.userId,
            comment.productId,
            comment.text,
            0
        );
        return this.commentRepository.create(commentToCreate);
    }

    public async findByProductId(productId: string): Promise<Comment[]> {
        return this.commentRepository.getByProductId(productId);
    }

    public async updateRate(comment: commentUpdateRateDTO): Promise<Comment | null> {
        const checkComment = await this.commentRepository.getById(comment.id);
        if (!checkComment) {
            return Promise.resolve(null);
        }
        checkComment.rate = comment.rate;
        return this.commentRepository.update(checkComment);
    }

    public async delete(commentId: string): Promise<boolean> {
        return this.commentRepository.delete(commentId);
    }
}