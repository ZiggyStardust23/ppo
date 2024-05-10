import express, { Express, Request, Response } from "express";
import {UserService} from './user/UserService';
import { PostgresUserRepository } from './user/UserRepository';
import {PhoneService} from './phone/PhoneService';
import { PostgresPhoneRepository } from './phone/PhoneRepository';
import {PaymentService} from './payment/PaymentService';
import { PostgresPaymentRepository } from './payment/PaymentRepository';
import {OrderService} from './order/OrderService';
import { PostgresOrderRepository } from './order/OrderRepository';
import {CommentService} from './comment/CommentService';
import { PostgresCommentRepository } from './comment/CommentRepository';
import {BasketService} from './basket/BasketService';
import { PostgresBasketRepository } from './basket/BasketRepository';
import { WishService } from "./wish/WishService";
import { PostgresWishRepository } from "./wish/WishRepository";
import { Pool } from "pg";
import * as conf from '../config'

const app: Express = express();
const PORT = 3000; // Выберите порт, который вы хотите прослушивать
let role: string = "guest";

// Middleware для парсинга JSON-тела запроса
app.use(express.json());

// services
const userRep = new PostgresUserRepository();
const userService = new UserService(userRep);
const phoneRep = new PostgresPhoneRepository();
const phoneService = new PhoneService(phoneRep);
const paymentRep = new PostgresPaymentRepository();
const paymentService = new PaymentService(paymentRep);
const orderRep = new PostgresOrderRepository();
const orderService = new OrderService(orderRep);
const commentRep = new PostgresCommentRepository();
const commentService = new CommentService(commentRep);
const basketRep = new PostgresBasketRepository();
const basketService = new BasketService(basketRep);
const wishRep = new PostgresWishRepository();
const wishService = new WishService(wishRep);
wishRep.initialize();

const pool = new Pool({
        user: conf.user,
        password: conf.password,
        host: conf.host,
        port: conf.port,
        database: conf.database
    });
// Обработчик запросов
app.get('/api/users/:id', async (req: Request, res: Response) => {
    const userId = req.params.id; // Получаем id пользователя из URL и преобразуем его в число
    // Поиск пользователя по id
    console.log(userId);
    try{
        const user = await userService.findUserById(userId, role);
        res.json(user);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/users/logout', async (req: Request, res: Response) => {
    role = "guest";
    res.json("logout");
});

app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login({ email, password }, role);

        if (user instanceof Error) {
            throw user;
        }

        // Определите роль и пароль
        if (user.role === 0) {
            role = 'shop_admin';
        } else if (user.role === 1) {
            role = 'seller';
        } else {
            role = 'shop_user';
        }

        res.json(user);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users/reg', async (req: Request, res: Response) => {
    const { email, name, phone_number, password } = req.body;

    try{
        const user = await userService.registration({email, name, phone_number, password}, role);
        res.json(user);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/users/', async (req: Request, res: Response) => {
    const { email, name, phone_number, password, userrole} = req.body;

    try{
        const user = await userService.createUser({email, name, phone_number, password, role: userrole}, role);
        res.json(user);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/users', async (req: Request, res: Response) => {
    const { id, email, name, phone_number, password, userrole} = req.body;

    try{
        const user = await userService.updateUser({id, email, name, phone_number, password, role: userrole}, role);
        res.json(user);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/phones/:id', async (req: Request, res: Response) => {
    const phoneId = req.params.id; // Получаем id пользователя из URL и преобразуем его в число
    
    try{
        const phone = await phoneService.findById(phoneId, role);
        res.json(phone);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/phones/', async (req: Request, res: Response) => {
    const { 
        name,
        producername,
        osname,
        ramsize,
        memsize,
        camres,
        price,
        warranty,
        release_year,
        type,
        model,
        producer_code,
        back_panel_color,
        edge_color,
        manufacturer_declared_color,
        frequencies_2g,
        frequencies_3g,
        lte_4g_support,
        frequencies_4g_lte,
        lte_advanced_support,
        lte_advanced_speed_categories,
        volte_support,
        networks_5g_support,
        frequencies_5g,
        sim_card_format,
        physical_sim_cards_count,
        esim_count,
        screen_size_inch,
        screen_resolution,
        screen_matrix_technology,
        screen_matrix_type_detailed,
        brightness,
        screen_refresh_rate,
        pixel_density,
        aspect_ratio,
        screen_colors_count,
        body_type,
        body_material,
        ruggedness,
        screen_protective_coating,
        ip_rating,
        screen_cutout_type,
        os_version,
        processor_model,
        cores_count,
        max_processor_frequency,
        processor_configuration,
        fabrication_process,
        gpu,
        ram_type,
        ram_amount,
        virtual_ram_extension,
        internal_memory_amount,
        memory_card_slot,
        main_cameras_count,
        main_camera_megapixels,
        camera_modules_type,
        main_camera_sensor_model,
        main_camera_aperture,
        main_camera_autofocus,
        flash_type,
        lens_field_of_view_angle,
        optical_stabilization,
        digital_zoom_photo,
        optical_zoom_photo,
        main_camera_resolution,
        dxomark_rating_main_camera,
        main_camera_features_technologies,
        main_camera_shooting_modes_features,
        video_shooting_format,
        video_resolution_frame_rate,
        slow_motion_video,
        video_zoom,
        video_playback_formats,
        video_shooting_features_functions,
        dual_front_camera,
        front_camera_megapixels_count,
        front_camera_aperture,
        front_camera_autofocus,
        built_in_flash,
        front_camera_resolution,
        dxomark_rating_selfie_camera,
        front_camera_features_technologies,
        front_camera_shooting_modes_features,
        stereo_speakers,
        audio_file_formats,
        fm_radio,
        bluetooth_version,
        wifi_standard,
        nfc,
        navigation_systems,
        ir_port,
        other_data_transmission_technologies,
        charging_interface,
        headphone_jack,
        otg_support,
        sensors,
        battery_type,
        battery_capacity,
        charger_voltage,
        charger_output_power,
        fast_charging,
        fast_charging_standards,
        wireless_charging_support,
        reverse_wireless_charging_support,
        music_playback_time,
        video_playback_time,
        biometric_protection,
        headphones_included,
        charger_included,
        package_contents,
        led_notification_indicator,
        additional_features,
        dimensions_and_weight} = req.body;

    try{
        const phone = await phoneService.create({
            name,
            producername,
            osname,
            ramsize,
            memsize,
            camres,
            price,
            warranty,
            release_year,
            type,
            model,
            producer_code,
            back_panel_color,
            edge_color,
            manufacturer_declared_color,
            frequencies_2g,
            frequencies_3g,
            lte_4g_support,
            frequencies_4g_lte,
            lte_advanced_support,
            lte_advanced_speed_categories,
            volte_support,
            networks_5g_support,
            frequencies_5g,
            sim_card_format,
            physical_sim_cards_count,
            esim_count,
            screen_size_inch,
            screen_resolution,
            screen_matrix_technology,
            screen_matrix_type_detailed,
            brightness,
            screen_refresh_rate,
            pixel_density,
            aspect_ratio,
            screen_colors_count,
            body_type,
            body_material,
            ruggedness,
            screen_protective_coating,
            ip_rating,
            screen_cutout_type,
            os_version,
            processor_model,
            cores_count,
            max_processor_frequency,
            processor_configuration,
            fabrication_process,
            gpu,
            ram_type,
            ram_amount,
            virtual_ram_extension,
            internal_memory_amount,
            memory_card_slot,
            main_cameras_count,
            main_camera_megapixels,
            camera_modules_type,
            main_camera_sensor_model,
            main_camera_aperture,
            main_camera_autofocus,
            flash_type,
            lens_field_of_view_angle,
            optical_stabilization,
            digital_zoom_photo,
            optical_zoom_photo,
            main_camera_resolution,
            dxomark_rating_main_camera,
            main_camera_features_technologies,
            main_camera_shooting_modes_features,
            video_shooting_format,
            video_resolution_frame_rate,
            slow_motion_video,
            video_zoom,
            video_playback_formats,
            video_shooting_features_functions,
            dual_front_camera,
            front_camera_megapixels_count,
            front_camera_aperture,
            front_camera_autofocus,
            built_in_flash,
            front_camera_resolution,
            dxomark_rating_selfie_camera,
            front_camera_features_technologies,
            front_camera_shooting_modes_features,
            stereo_speakers,
            audio_file_formats,
            fm_radio,
            bluetooth_version,
            wifi_standard,
            nfc,
            navigation_systems,
            ir_port,
            other_data_transmission_technologies,
            charging_interface,
            headphone_jack,
            otg_support,
            sensors,
            battery_type,
            battery_capacity,
            charger_voltage,
            charger_output_power,
            fast_charging,
            fast_charging_standards,
            wireless_charging_support,
            reverse_wireless_charging_support,
            music_playback_time,
            video_playback_time,
            biometric_protection,
            headphones_included,
            charger_included,
            package_contents,
            led_notification_indicator,
            additional_features,
            dimensions_and_weight}, role);
        res.json(phone);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/phones', async (req: Request, res: Response) => {
    const {
        id, 
        name,
        producername,
        osname,
        ramsize,
        memsize,
        camres,
        price,
        warranty,
        release_year,
        type,
        model,
        producer_code,
        back_panel_color,
        edge_color,
        manufacturer_declared_color,
        frequencies_2g,
        frequencies_3g,
        lte_4g_support,
        frequencies_4g_lte,
        lte_advanced_support,
        lte_advanced_speed_categories,
        volte_support,
        networks_5g_support,
        frequencies_5g,
        sim_card_format,
        physical_sim_cards_count,
        esim_count,
        screen_size_inch,
        screen_resolution,
        screen_matrix_technology,
        screen_matrix_type_detailed,
        brightness,
        screen_refresh_rate,
        pixel_density,
        aspect_ratio,
        screen_colors_count,
        body_type,
        body_material,
        ruggedness,
        screen_protective_coating,
        ip_rating,
        screen_cutout_type,
        os_version,
        processor_model,
        cores_count,
        max_processor_frequency,
        processor_configuration,
        fabrication_process,
        gpu,
        ram_type,
        ram_amount,
        virtual_ram_extension,
        internal_memory_amount,
        memory_card_slot,
        main_cameras_count,
        main_camera_megapixels,
        camera_modules_type,
        main_camera_sensor_model,
        main_camera_aperture,
        main_camera_autofocus,
        flash_type,
        lens_field_of_view_angle,
        optical_stabilization,
        digital_zoom_photo,
        optical_zoom_photo,
        main_camera_resolution,
        dxomark_rating_main_camera,
        main_camera_features_technologies,
        main_camera_shooting_modes_features,
        video_shooting_format,
        video_resolution_frame_rate,
        slow_motion_video,
        video_zoom,
        video_playback_formats,
        video_shooting_features_functions,
        dual_front_camera,
        front_camera_megapixels_count,
        front_camera_aperture,
        front_camera_autofocus,
        built_in_flash,
        front_camera_resolution,
        dxomark_rating_selfie_camera,
        front_camera_features_technologies,
        front_camera_shooting_modes_features,
        stereo_speakers,
        audio_file_formats,
        fm_radio,
        bluetooth_version,
        wifi_standard,
        nfc,
        navigation_systems,
        ir_port,
        other_data_transmission_technologies,
        charging_interface,
        headphone_jack,
        otg_support,
        sensors,
        battery_type,
        battery_capacity,
        charger_voltage,
        charger_output_power,
        fast_charging,
        fast_charging_standards,
        wireless_charging_support,
        reverse_wireless_charging_support,
        music_playback_time,
        video_playback_time,
        biometric_protection,
        headphones_included,
        charger_included,
        package_contents,
        led_notification_indicator,
        additional_features,
        dimensions_and_weight} = req.body;

    try{
        const phone = await phoneService.update({id, 
            name,
            producername,
            osname,
            ramsize,
            memsize,
            camres,
            price,
            warranty,
            release_year,
            type,
            model,
            producer_code,
            back_panel_color,
            edge_color,
            manufacturer_declared_color,
            frequencies_2g,
            frequencies_3g,
            lte_4g_support,
            frequencies_4g_lte,
            lte_advanced_support,
            lte_advanced_speed_categories,
            volte_support,
            networks_5g_support,
            frequencies_5g,
            sim_card_format,
            physical_sim_cards_count,
            esim_count,
            screen_size_inch,
            screen_resolution,
            screen_matrix_technology,
            screen_matrix_type_detailed,
            brightness,
            screen_refresh_rate,
            pixel_density,
            aspect_ratio,
            screen_colors_count,
            body_type,
            body_material,
            ruggedness,
            screen_protective_coating,
            ip_rating,
            screen_cutout_type,
            os_version,
            processor_model,
            cores_count,
            max_processor_frequency,
            processor_configuration,
            fabrication_process,
            gpu,
            ram_type,
            ram_amount,
            virtual_ram_extension,
            internal_memory_amount,
            memory_card_slot,
            main_cameras_count,
            main_camera_megapixels,
            camera_modules_type,
            main_camera_sensor_model,
            main_camera_aperture,
            main_camera_autofocus,
            flash_type,
            lens_field_of_view_angle,
            optical_stabilization,
            digital_zoom_photo,
            optical_zoom_photo,
            main_camera_resolution,
            dxomark_rating_main_camera,
            main_camera_features_technologies,
            main_camera_shooting_modes_features,
            video_shooting_format,
            video_resolution_frame_rate,
            slow_motion_video,
            video_zoom,
            video_playback_formats,
            video_shooting_features_functions,
            dual_front_camera,
            front_camera_megapixels_count,
            front_camera_aperture,
            front_camera_autofocus,
            built_in_flash,
            front_camera_resolution,
            dxomark_rating_selfie_camera,
            front_camera_features_technologies,
            front_camera_shooting_modes_features,
            stereo_speakers,
            audio_file_formats,
            fm_radio,
            bluetooth_version,
            wifi_standard,
            nfc,
            navigation_systems,
            ir_port,
            other_data_transmission_technologies,
            charging_interface,
            headphone_jack,
            otg_support,
            sensors,
            battery_type,
            battery_capacity,
            charger_voltage,
            charger_output_power,
            fast_charging,
            fast_charging_standards,
            wireless_charging_support,
            reverse_wireless_charging_support,
            music_playback_time,
            video_playback_time,
            biometric_protection,
            headphones_included,
            charger_included,
            package_contents,
            led_notification_indicator,
            additional_features,
            dimensions_and_weight}, role);
        res.json(phone);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/orders/', async (req: Request, res: Response) => {
    const { userid, address, positions} = req.body;

    try{
        const order = await orderService.create({userid, address, positions}, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/orders/:id', async (req: Request, res: Response) => {
    const orderId = req.params.id;
    try{
        const order = await orderService.findById(orderId, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/orders', async (req: Request, res: Response) => {
    const userId = req.query.userid as string;

    try{
        const order = await orderService.findByUserId(userId, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/orders/status', async (req: Request, res: Response) => {
    const { id, status} = req.body;

    try{
        const order = await orderService.updateOrderStatus({id, status}, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/orders/add', async (req: Request, res: Response) => {
    const { id, positions} = req.body;

    try{
        const order = await orderService.addPositionsToOrder({id, positions}, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/orders/remove', async (req: Request, res: Response) => {
    const { id, positions} = req.body;

    try{
        const order = await orderService.removePositionsFromOrder({id, positions}, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/payments/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try{
        const payment = await paymentService.findById(id, role);
        res.json(payment);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/payments', async (req: Request, res: Response) => {
    const orderId = req.query.orderId as string;

    try{
        const payment = await paymentService.findByOrderId(orderId, role);
        res.json(payment);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/payments', async (req: Request, res: Response) => {
    const orderId = req.query.orderId as string;

    try{
        const payment = await paymentService.create(orderId, role);
        res.json(payment);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/payments', async (req: Request, res: Response) => {
    const { id, orderId, status, sum} = req.body;

    try{
        const payment = await paymentService.update({id, orderId, status, sum}, role);
        res.json(payment);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/baskets', async (req: Request, res: Response) => {
    const userId = req.query.userid as string;

    try{
        const order = await basketService.create(userId, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/baskets', async (req: Request, res: Response) => {
    const userId = req.query.userid as string;

    try{
        const order = await basketService.findByUserId(userId, role);
        res.json(order);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/baskets/clear', async (req: Request, res: Response) => {
    const basketId = req.query.basketid as string;

    try{
        const result = await basketService.clear(basketId, role);
        res.json(result)
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/baskets/price', async (req: Request, res: Response) => {
    const basketId = req.query.basketid as string;

    try{
        const sum = await basketService.calculateTotalPrice(basketId, role);
        res.json(sum);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/baskets/add', async (req: Request, res: Response) => {
    const {id, positions} = req.body;

    try{
        const basket = await basketService.addProductsToBasket({id, positions}, role);
        res.json(basket);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/baskets/remove', async (req: Request, res: Response) => {
    const {id, positions} = req.body;

    try{
        const basket = await basketService.removeProductsFromBasket({id, positions}, role);
        res.json(basket);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/comments', async (req: Request, res: Response) => {
    const {userid, productId, text} = req.body;

    try{
        const comment = await commentService.create({userid, productId, text}, role);
        res.json(comment);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/comments', async (req: Request, res: Response) => {
    const productId = req.query.productId as string;

    try{
        const comments = await commentService.findByProductId(productId, role);
        res.json(comments);
    }
    catch(e: any){
        res.json(e);
    }
});

app.put('/api/comments', async (req: Request, res: Response) => {
    const {id, rate} = req.body;

    try{
        const comment = await commentService.updateRate({id, rate}, role);
        res.json(comment);
    }
    catch(e: any){
        res.json(e);
    }
});

app.delete('/api/comments', async (req: Request, res: Response) => {
    const commentId = req.query.commentId as string;

    try{
        const result = await commentService.delete(commentId, role);
        res.json(result);
    }
    catch(e: any){
        res.json(e);
    }
});

app.post('/api/wishes', async (req: Request, res: Response) => {
    const {userId, productId} = req.body;

    try{
        const wish = await wishService.create({userId, productId}, role);
        res.json(wish);
    }
    catch(e: any){
        res.json(e);
    }
});

app.get('/api/wishes', async (req: Request, res: Response) => {
    const userId = req.query.userId as string;

    try{
        const wishes = await wishService.findByUserId(userId, role);
        res.json(wishes);
    }
    catch(e: any){
        res.json(e);
    }
});
app.delete('/api/wishes', async (req: Request, res: Response) => {
    const id = req.query.id as string;

    try{
        const result = await wishService.delete(id, role);
        res.json(result);
    }
    catch(e: any){
        res.json(e);
    }
});


// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});