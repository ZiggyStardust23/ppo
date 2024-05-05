import { commentCreateDTO, commentServiceError, commentUpdateRateDTO, returnCommentDTO } from "./CommentDTO";
import { Comment } from "./CommentModel";
import { ICommentRepository } from "./CommentRepository";

export interface ICommentService {
    create(comment: commentCreateDTO): Promise<returnCommentDTO>;
    findByProductId(productId: string): Promise<returnCommentDTO[]>;
    updateRate(comment: commentUpdateRateDTO): Promise<returnCommentDTO | commentServiceError>;
    delete(commentId: string): Promise<boolean>;
}

export class CommentService implements ICommentService {
    constructor(private commentRepository: ICommentRepository) {}

    public async create(comment: commentCreateDTO): Promise<returnCommentDTO> {
        const commentToCreate = new Comment(
            "",
            comment.userid,
            comment.productId,
            comment.text,
            0
        );
        const commentCreated = await this.commentRepository.create(commentToCreate);
        return Promise.resolve(commentCreated.toDTO());
    }

    public async findByProductId(productId: string): Promise<returnCommentDTO[]> {
        const productsGetted = await this.commentRepository.getByProductId(productId);
        if (productsGetted.length == 0){
            return Promise.resolve([]);
        }
        const productsDTOToReturn: returnCommentDTO[] = [];
        for (let p of productsGetted){
            productsDTOToReturn.push(p.toDTO());
        }
        return Promise.resolve(productsDTOToReturn);
    }

    public async updateRate(comment: commentUpdateRateDTO): Promise<returnCommentDTO | commentServiceError> {
        const checkComment = await this.commentRepository.getById(comment.id);
        if (!checkComment) {
            return Promise.resolve({errormsg: "comment to update not found"});
        }
        checkComment.rate = comment.rate;
        const commentUpdated = await this.commentRepository.update(checkComment);
        if (!commentUpdated) {
            return Promise.resolve({errormsg: "comment found but error occured"});
        }
        return Promise.resolve(commentUpdated.toDTO());
    }

    public async delete(commentId: string): Promise<boolean> {
        return this.commentRepository.delete(commentId);
    }
}