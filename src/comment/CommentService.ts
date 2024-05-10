import { commentCreateDTO, commentUpdateRateDTO, returnCommentDTO } from "./CommentDTO";
import { Comment } from "./CommentModel";
import { ICommentRepository } from "./CommentRepository";

export interface ICommentService {
    create(comment: commentCreateDTO, role: string): Promise<returnCommentDTO>;
    findByProductId(productId: string, role: string): Promise<returnCommentDTO[] | Error>;
    updateRate(comment: commentUpdateRateDTO, role: string): Promise<returnCommentDTO | Error>;
    delete(commentId: string, role: string): Promise<boolean>;
}

export class CommentService implements ICommentService {
    constructor(private commentRepository: ICommentRepository) {}

    public async create(comment: commentCreateDTO, role: string): Promise<returnCommentDTO> {
        const commentToCreate = new Comment(
            "",
            comment.userid,
            comment.productId,
            comment.text,
            0
        );
        const commentCreated = await this.commentRepository.create(commentToCreate, role);
        return Promise.resolve(commentCreated.toDTO());
    }

    public async findByProductId(productId: string, role: string): Promise<returnCommentDTO[] | Error> {
        const productsGetted = await this.commentRepository.getByProductId(productId, role);
        if (productsGetted.length == 0){
            return Promise.reject(new Error("comments not found by this product id"));
        }
        const productsDTOToReturn: returnCommentDTO[] = [];
        for (let p of productsGetted){
            productsDTOToReturn.push(p.toDTO());
        }
        return Promise.resolve(productsDTOToReturn);
    }

    public async updateRate(comment: commentUpdateRateDTO, role: string): Promise<returnCommentDTO | Error> {
        const checkComment = await this.commentRepository.getById(comment.id, role);
        if (!checkComment) {
            return Promise.reject(new Error("comment to update not found"));
        }
        checkComment.rate = comment.rate;
        const commentUpdated = await this.commentRepository.update(checkComment, role);
        if (!commentUpdated) {
            return Promise.reject(new Error("comment found but error occured"));
        }
        return Promise.resolve(commentUpdated.toDTO());
    }

    public async delete(commentId: string, role: string): Promise<boolean> {
        return this.commentRepository.delete(commentId, role);
    }
}