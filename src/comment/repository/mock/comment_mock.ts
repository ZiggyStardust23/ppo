import { ICommentRepository } from '../comment.js';
import { Comment } from '../../model/comment.js';
import { instance, mock } from 'ts-mockito';

export class CommentRepositoryMock implements ICommentRepository {
    private readonly mockInstance: ICommentRepository;

    constructor() {
        this.mockInstance = mock<ICommentRepository>();
    }

    public getInstance(): ICommentRepository {
        return instance(this.mockInstance);
    }

    public create(comment: Comment): Promise<Comment> {
        return Promise.resolve(comment);
    }

    public getByProductId(productId: string): Promise<Comment[]> {
        return Promise.resolve([]);
    }

    public async getById(commentId: string): Promise<Comment | null> {
        const comment: Comment = { guid: 'comment123', userId: 'user123', productId: 'product123', text: 'Sample comment', rate: 5 };
        return Promise.resolve(comment);
    }

    public updateRate(commentId: string, rate: number): Promise<Comment | null> {
        return Promise.resolve(null);
    }

    public delete(commentId: string): Promise<boolean> {
        return Promise.resolve(false);
    }
}