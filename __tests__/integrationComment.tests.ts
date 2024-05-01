import { PostgresCommentRepository } from '../src/comment/CommentRepository'
import { Comment } from '../src/comment/CommentModel'
import { CommentService } from '../src/comment/CommentService'
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' }); // Используем конфигурацию для тестов

describe('Comment Integration Tests', () => {
    let repository: PostgresCommentRepository;
    let service: CommentService;
    repository = new PostgresCommentRepository();
    service = new CommentService(repository);

    test('createComment - создание комментария', async () => {
        await repository.initialize()
        const newComment = new Comment('', '1', '1', 'Отличный товар!', 0);
        const createdComment = await service.create(newComment);
        
        expect(createdComment).toBeDefined();
        expect(createdComment.id).toBeDefined();
        expect(createdComment.userid).toBe(newComment.userid);
        expect(createdComment.productId).toBe(newComment.productId);
        expect(createdComment.text).toBe(newComment.text);
        expect(createdComment.rate).toBe(newComment.rate);
    });

    test('getCommentsByProductId - получение комментариев по ID продукта', async () => {
        const productId = '1';
        const comments = await service.findByProductId(productId);
        
        expect(comments).toHaveLength(1); // Предполагается, что только что созданный комментарий существует
        expect(comments[0].productId).toBe(productId);
    });

    test('updateComment - обновление комментария', async () => {
        const productId = '1';
        const comments = await service.findByProductId(productId);
        const commentId = comments[0].id;

        const updatedRate = 4;
        const updated = await service.updateRate({id: commentId, rate: updatedRate});

        expect(updated).toBeDefined();
        expect(updated?.id).toBe(commentId);
        expect(updated?.rate).toBe(updatedRate);
    });

    test('deleteComment - удаление комментария', async () => {
        const productId = '1';
        const comments = await service.findByProductId(productId);
        const commentId = comments[0].id;

        const deleted = await service.delete(commentId);
        expect(deleted).toBeTruthy();
    });
});
