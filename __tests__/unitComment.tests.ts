import { ICommentRepository } from '../src/comment/CommentRepository'
import { CommentService } from '../src/comment/CommentService'
import { Comment } from '../src/comment/CommentModel';
import { mock, instance, when, anything } from 'ts-mockito';

describe('CommentService', () => {
    let commentService: CommentService;
    let commentRepository: ICommentRepository;

    beforeEach(() => {
        commentRepository = mock<ICommentRepository>();
        commentService = new CommentService(instance(commentRepository));
    });

    it('should create a comment', async () => {
        const productId = "test";
        const userId = "test";
        const text = "anytext";

        const commentCreated = new Comment(
            "test", 
            userId, 
            productId,
            text,
            0,
        )
        when(commentRepository.create(anything())).thenResolve(commentCreated);
    
        const result = await commentService.create({            
            userid: userId,
            productId: productId,
            text: text
        });
        expect(result).toEqual({
                                id: "test", 
                                userId: userId, 
                                productId: productId,
                                text: text,
                                rate: 0
                            });
    });

    it('findByProductId: success', async () => {
        const productId = "test";
        const userId = "test";
        const text = "anytext";

        const commentsToFind = [
            new Comment(
            "test1", 
            userId, 
            productId,
            text,
            0,
        ),
        new Comment(
            "test2", 
            userId, 
            productId,
            text,
            0,
        )
        ]

        when(commentRepository.getByProductId("test")).thenResolve(commentsToFind);
    
        const result = await commentService.findByProductId("test");

        expect(result).toEqual([{
                                id: "test1", 
                                userId: userId, 
                                productId: productId,
                                text: text,
                                rate: 0
                            },
                            {
                                id: "test2", 
                                userId: userId, 
                                productId: productId,
                                text: text,
                                rate: 0
                            }]);
                        });

    it('findByProductId: fail', async () => {

        when(commentRepository.getByProductId("badid")).thenResolve([]);
    
        const result = await commentService.findByProductId("badid");

        expect(result).toEqual([]);
    });

    it('update rate', async () => {
        const productId = "test";
        const userId = "test";
        const text = "anytext";

        const commentToFind = new Comment(
            "test", 
            userId, 
            productId,
            text,
            0,
        )
        const commentUpdated = new Comment(
            "test", 
            userId, 
            productId,
            text,
            5,
        )

        when(commentRepository.getById("test")).thenResolve(commentToFind);
        when(commentRepository.update(anything())).thenResolve(commentUpdated);
    
        const result = await commentService.updateRate({     
            id: "test",
            rate: 5,
        })

        expect(result).toEqual({
                                id: "test", 
                                userId: userId, 
                                productId: productId,
                                text: text,
                                rate: 5
                            });
    });
    it('update rate failed', async () => {
        when(commentRepository.getById("badid")).thenResolve(null);
        const result = await commentService.updateRate({     
            id: "badid",
            rate: 5,
        })

        expect(result).toEqual({errormsg: "comment to update not found"});
    });
    it('delete comment', async () => {
        when(commentRepository.delete("test")).thenResolve(true);
        const result = await commentService.delete("test")

        expect(result).toEqual(true);
    });
    it('delete comment fail', async () => {
        when(commentRepository.delete("badid")).thenResolve(false);
        const result = await commentService.delete("badid")

        expect(result).toEqual(false);
    });
});
