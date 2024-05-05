import { IOrderRepository } from '../src/order/OrderRepository'
import { OrderService } from '../src/order/OrderService'
import { Order, OrderPosition, OrderStatus } from '../src/order/OrderModel';
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
        const positions = [new OrderPosition("test1", "", "p1", 3), new OrderPosition("test2", "", "p2", 3)];

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
            positions: [{
                id: "test1",
                orderId: "",
                productId: "p1",
                productsAmount: 3
            },
            {
                id: "test2",
                orderId: "",
                productId: "p2",
                productsAmount: 3
            }
        ]
        });
        expect(result).toEqual({
                                id: "test",
                                userid: userid,
                                status: OrderStatus.PLACED,
                                date: someDate,
                                address: adress,
                                positions: [{
                                    id: "test1",
                                    orderId: "",
                                    productId: "p1",
                                    productsAmount: 3
                                },
                                {
                                    id: "test2",
                                    orderId: "",
                                    productId: "p2",
                                    productsAmount: 3
                                }
                            ]
                            });
    });

    it('findById: success', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new OrderPosition("test1", "", "p1", 3), new OrderPosition("test2", "", "p2", 3)];

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
    
        const result = await orderService.findById("test");

        expect(result).toEqual({
                                id: "test",
                                userid: userid,
                                status: OrderStatus.PLACED,
                                address: adress,
                                date: someDate,
                                positions: [{
                                    id: "test1",
                                    orderId: "",
                                    productId: "p1",
                                    productsAmount: 3
                                },
                                {
                                    id: "test2",
                                    orderId: "",
                                    productId: "p2",
                                    productsAmount: 3
                                }
                            ]
                            });
    });

    it('findById: fail', async () => {

        when(orderRepository.getById("test")).thenResolve(null);
    
        const result = await orderService.findById("test");

        expect(result).toEqual({errormsg: "not found in db by id"});
    });

    it('findByUserId: success', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new OrderPosition("test1", "", "p1", 3), new OrderPosition("test2", "", "p2", 3)];

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

        when(orderRepository.getByUserId("test")).thenResolve(ordersToFind);
    
        const result = await orderService.findByUserId("test");

        expect(result).toEqual([
                                {
                                id: "test1",
                                userid: userid,
                                status: OrderStatus.PLACED,
                                address: adress,
                                date: someDate,
                                positions: [{
                                    id: "test1",
                                    orderId: "",
                                    productId: "p1",
                                    productsAmount: 3
                                },
                                {
                                    id: "test2",
                                    orderId: "",
                                    productId: "p2",
                                    productsAmount: 3
                                }
                                ]
                                },
                                {
                                id: "test2",
                                userid: userid,
                                status: OrderStatus.PLACED,
                                address: adress,
                                date: someDate,
                                positions: [{
                                    id: "test1",
                                    orderId: "",
                                    productId: "p1",
                                    productsAmount: 3
                                },
                                {
                                    id: "test2",
                                    orderId: "",
                                    productId: "p2",
                                    productsAmount: 3
                                }
                            ]
                            }]);
    });
    it('findByUserId: fail', async () => {

        when(orderRepository.getByUserId("test")).thenResolve([]);
    
        const result = await orderService.findByUserId("test");

        expect(result).toEqual({errormsg: "not found in db by id"});
    });
    
    it('should succesfully update the status of order', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new OrderPosition("test1", "", "p1", 3), new OrderPosition("test2", "", "p2", 3)];

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
    
        const result = await orderService.updateOrderStatus({     
            id: "test",       
            status: OrderStatus.PROCESSING,
        })

        expect(result).toEqual({
                                id: "test",
                                userid: userid,
                                status: OrderStatus.PROCESSING,
                                address: adress,
                                date: someDate,
                                positions: [{
                                    id: "test1",
                                    orderId: "",
                                    productId: "p1",
                                    productsAmount: 3
                                },
                                {
                                    id: "test2",
                                    orderId: "",
                                    productId: "p2",
                                    productsAmount: 3
                                }
                            ]
                            });
    });

    it('update fail: order not found', async () => {
        when(orderRepository.getById("failtest")).thenResolve(null);
    
        const result = await orderService.updateOrderStatus({     
            id: "failtest",
            status: OrderStatus.PROCESSING,
        })

        expect(result).toEqual({errormsg: "not found in db by id"});
    });

    it('should succesfully add positions to order', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new OrderPosition("test1", "", "p1", 3), new OrderPosition("test2", "", "p2", 3)];
        const positionsToAdd = [new OrderPosition("test2", "", "p2", 3), new OrderPosition("test3", "", "p3", 3)];
        const positionsUpdated = [new OrderPosition("test1", "", "p1", 3), new OrderPosition("test2", "", "p2", 3), new OrderPosition("test3", "", "p3", 3)];

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
    

        const result = await orderService.addPositionsToOrder({     
            id: "test",       
            positions: positionsToAdd,
        })

        expect(result).toEqual({
                                id: "test",
                                userid: userid,
                                status: OrderStatus.PLACED,
                                address: adress,
                                date: someDate,
                                positions: [{
                                    id: "test1",
                                    orderId: "",
                                    productId: "p1",
                                    productsAmount: 3
                                },
                                {
                                    id: "test2",
                                    orderId: "",
                                    productId: "p2",
                                    productsAmount: 3
                                },
                                {
                                    id: "test3",
                                    orderId: "",
                                    productId: "p3",
                                    productsAmount: 3
                                }
                            ]
                            });
    });
    it('should succesfully remove positions from order', async () => {
        const userid = "test";
        const adress = "someaddress";
        const positions = [new OrderPosition("test1", "", "p1", 3), new OrderPosition("test2", "", "p2", 3)];
        const positionsToRemove = [new OrderPosition("test2", "", "p2", 3)];
        const positionsUpdated = [new OrderPosition("test1", "", "p1", 3)];

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
    
        const result = await orderService.removePositionsFromOrder({     
            id: "test",       
            positions: positionsToRemove,
        })

        expect(result).toEqual({
                                id: "test",
                                userid: userid,
                                status: OrderStatus.PLACED,
                                address: adress,
                                date: someDate,
                                positions: [{
                                    id: "test1",
                                    orderId: "",
                                    productId: "p1",
                                    productsAmount: 3
                                },
                            ]
                            });
    });
});
