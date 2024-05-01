import { IOrderRepository } from '../src/order/OrderRepository'
import { OrderService } from '../src/order/OrderService'
import { Order, Position, OrderStatus } from '../src/order/OrderModel';
import { mock, instance, when, anything } from 'ts-mockito';

describe('OrderService', () => {
    let orderService: OrderService;
    let orderRepository: IOrderRepository;

    beforeEach(() => {
        orderRepository = mock<IOrderRepository>();
        orderService = new OrderService(instance(orderRepository));
    });

    it('should create an order', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3)];

        const someDate = new Date();
        const orderCreated = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        )
        when(orderRepository.create(anything())).thenResolve(orderCreated);
    
        const result = await orderService.create({            
            userid: userid,
            address: adress,
            positions: positions
        });
        expect(result).toEqual(orderCreated);
    });

    it('findById: success', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3)];

        const someDate = new Date();
        const orderToFind = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        )

        when(orderRepository.getById("test")).thenResolve(orderToFind);
    

        // Act
        const result = await orderService.findById("test");

        // Assert
        expect(result).toEqual(orderToFind);
    });

    it('findById: fail', async () => {

        when(orderRepository.getById("test")).thenResolve(null);
    

        // Act
        const result = await orderService.findById("test");

        // Assert
        expect(result).toEqual(null);
    });

    it('findByuserid: success', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3)];

        const someDate = new Date();
        const ordersToFind = [
            new Order(
            "test1", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        ),
        new Order(
            "test2", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        )
        ]

        when(orderRepository.getByuserid("test")).thenResolve(ordersToFind);
    

        // Act
        const result = await orderService.findByuserid("test");

        // Assert
        expect(result).toEqual(ordersToFind);
    });
    it('findByuserid: fail', async () => {

        when(orderRepository.getByuserid("test")).thenResolve([]);
    

        // Act
        const result = await orderService.findByuserid("test");

        // Assert
        expect(result).toEqual([]);
    });
    
    it('should succesfully update the status of order', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3)];

        const someDate = new Date();
        const orderToFind = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        )

        const orderUpdated = new Order(
            "test", 
            userid, 
            OrderStatus.PROCESSING,
            adress,
            someDate,
            positions
        )

        when(orderRepository.getById("test")).thenResolve(orderToFind);
        when(orderRepository.update(anything())).thenResolve(orderUpdated);
    

        // Act
        const result = await orderService.updateOrderStatus({     
            id: "test",       
            status: OrderStatus.PROCESSING,
        })

        // Assert
        expect(result).toEqual(orderUpdated);
    });

    it('update fail: order not found', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3)];

        const someDate = new Date();
        const orderToFind = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        )

        when(orderRepository.getById("failtest")).thenResolve(null);
    
        const result = await orderService.updateOrderStatus({     
            id: "failtest",
            status: OrderStatus.PROCESSING,
        })

        expect(result).toEqual(null);
    });

    it('should succesfully add positions to order', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3)];
        const positionsToAdd = [new Position("test2", "", "p2", 3), new Position("test3", "", "p3", 3)];
        const positionsUpdated = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3), new Position("test3", "", "p3", 3)];

        const someDate = new Date();
        const orderToFind = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        )

        const orderUpdated = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positionsUpdated
        )

        when(orderRepository.getById("test")).thenResolve(orderToFind);
        when(orderRepository.update(anything())).thenResolve(orderUpdated);
    

        // Act
        const result = await orderService.addPositionsToOrder({     
            id: "test",       
            positions: positionsToAdd,
        })

        // Assert
        expect(result).toEqual(orderUpdated);
    });
    it('should succesfully remove positions from order', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new Position("test1", "", "p1", 3), new Position("test2", "", "p2", 3)];
        const positionsToRemove = [new Position("test2", "", "p2", 3)];
        const positionsUpdated = [new Position("test1", "", "p1", 3)];

        const someDate = new Date();
        const orderToFind = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positions
        )

        const orderUpdated = new Order(
            "test", 
            userid, 
            OrderStatus.PLACED,
            adress,
            someDate,
            positionsUpdated
        )

        when(orderRepository.getById("test")).thenResolve(orderToFind);
        when(orderRepository.update(anything())).thenResolve(orderUpdated);
    

        // Act
        const result = await orderService.removePositionsFromOrder({     
            id: "test",       
            positions: positionsToRemove,
        })

        // Assert
        expect(result).toEqual(orderUpdated);
    });
});
