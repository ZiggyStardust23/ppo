import { expect } from 'chai';
import { anything, instance, mock, when } from 'ts-mockito';
import { CommentService } from './service/comment.js';
import { ICommentRepository } from './repository/comment.js';
import { Comment } from './model/comment.js';
import { CommentRepositoryMock } from './repository/mock/comment_mock.js';

describe('CommentService', () => {
    let commentService: CommentService;
    let commentRepositoryMock: ICommentRepository;

    beforeEach(() => {
        commentRepositoryMock = mock(CommentRepositoryMock);
        commentService = new CommentService(instance(commentRepositoryMock));
    });

    describe('createComment', () => {
        it('should create a new comment', async () => {
            // Arrange
            const userId = 'user123';
            const productId = 'product123';
            const text = 'Sample comment';
            const rate = 5;
            const expectedComment: Comment = { guid: 'comment123', userId, productId, text, rate };
            when(commentRepositoryMock.create(anything())).thenReturn(Promise.resolve(expectedComment));

            // Act
            const result = await commentService.createComment(userId, productId, text, rate);

            // Assert
            expect(result).to.deep.equal(expectedComment);
        });
    });

    describe('getCommentsByProductId', () => {
        it('should return comments for the given product ID', async () => {
            // Arrange
            const productId = 'product123';
            const expectedComments: Comment[] = [
                { guid: 'comment1', userId: 'user1', productId, text: 'Comment 1', rate: 4 },
                { guid: 'comment2', userId: 'user2', productId, text: 'Comment 2', rate: 5 }
            ];
            when(commentRepositoryMock.getByProductId(productId)).thenReturn(Promise.resolve(expectedComments));

            // Act
            const result = await commentService.getCommentsByProductId(productId);

            // Assert
            expect(result).to.deep.equal(expectedComments);
        });

        it('should return an empty array if no comments are found for the given product ID', async () => {
            // Arrange
            const productId = 'product123';
            when(commentRepositoryMock.getByProductId(productId)).thenReturn(Promise.resolve([]));

            // Act
            const result = await commentService.getCommentsByProductId(productId);

            // Assert
            expect(result).to.deep.equal([]);
        });
    });

    describe('updateCommentRate', () => {
        it('should update the rate of the comment with the given ID', async () => {
            // Arrange
            const commentId = 'comment123';
            const newRate = 4;
            const existingComment: Comment = { guid: commentId, userId: 'user123', productId: 'product123', text: 'Sample comment', rate: 5 };
            const updatedComment: Comment = { ...existingComment, rate: newRate };
            when(commentRepositoryMock.getById(commentId)).thenReturn(Promise.resolve(existingComment));
            when(commentRepositoryMock.updateRate(commentId, newRate)).thenReturn(Promise.resolve(updatedComment));

            // Act
            const result = await commentService.updateCommentRate(commentId, newRate);

            // Assert
            expect(result).to.deep.equal(updatedComment);
        });

        it('should return null if comment with the given ID is not found', async () => {
            // Arrange
            const commentId = 'invalidCommentId';
            when(commentRepositoryMock.getById(commentId)).thenReturn(Promise.resolve(null));

            // Act
            const result = await commentService.updateCommentRate(commentId, 5);

            // Assert
            expect(result).to.be.null;
        });
    });

    describe('deleteComment', () => {
        it('should delete the comment with the given ID', async () => {
            // Arrange
            const commentId = 'comment123';
            when(commentRepositoryMock.delete(commentId)).thenReturn(Promise.resolve(true));

            // Act
            const result = await commentService.deleteComment(commentId);

            // Assert
            expect(result).to.be.true;
        });

        it('should return false if comment with the given ID is not found', async () => {
            // Arrange
            const commentId = 'invalidCommentId';
            when(commentRepositoryMock.delete(commentId)).thenReturn(Promise.resolve(false));

            // Act
            const result = await commentService.deleteComment(commentId);

            // Assert
            expect(result).to.be.false;
        });
    });
});