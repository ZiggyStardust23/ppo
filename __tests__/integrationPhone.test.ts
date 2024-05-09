import { PostgresPhoneRepository } from '../src/phone/PhoneRepository';
import { PhoneService, Phone } from '../src/phone/PhoneService';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env
dotenv.config();

// Создаем экземпляр репозитория
const phoneRepository = new PostgresPhoneRepository();
const phoneService = new PhoneService(phoneRepository);

describe('Phone Repository Tests', () => {
    let testPhoneId: string;

    test('createPhone - создание телефона', async () => {
        await phoneRepository.initialize();
        const phone = new Phone(
            "", // _id
            "Phone X", // _name
            "Phone Producer Inc.", // _producername
            "OSX", // _osname
            8, // _ramsize
            128, // _memsize
            12, // _camres
            999, // _price
            12, // _warranty
            2022, // _releaseYear
            "Smartphone", // _type
            "X123", // _model
            "123456", // _producerCode
            "Black", // _backPanelColor
            "Silver", // _edgeColor
            null, // _manufacturerDeclaredColor
            "GSM 900 / GSM 1800", // _frequencies2G
            "HSDPA 900 / HSDPA 2100", // _frequencies3G
            "LTE", // _lte4GSupport
            "LTE 850 / LTE 1800 / LTE 2100", // _frequencies4GLTE
            "LTE-A", // _lteAdvancedSupport
            "Category 21", // _lteAdvancedSpeedCategories
            "Yes", // _volteSupport
            "5G", // _networks5GSupport
            "5G NR bands 77, 78 Sub6/mmWave", // _frequencies5G
            "Nano-SIM", // _simCardFormat
            2, // _physicalSimCardsCount
            0, // _esimCount
            6.7, // _screenSizeInch
            "1080x2340 pixels", // _screenResolution
            "AMOLED", // _screenMatrixTechnology
            "Super AMOLED", // _screenMatrixTypeDetailed
            600, // _brightness
            120, // _screenRefreshRate
            401, // _pixelDensity
            "20:9", // _aspectRatio
            16, // _screenColorsCount
            "Bar", // _bodyType
            "Glass", // _bodyMaterial
            "IP68 dust/water resistant", // _ruggedness
            "Corning Gorilla Glass Victus", // _screenProtectiveCoating
            "IP68", // _ipRating
            "Punch-hole", // _screenCutoutType
            "iOS 14", // _osVersion
            "Apple A14 Bionic", // _processorModel
            8, // _coresCount
            3.1, // _maxProcessorFrequency
            "Hexa-core", // _processorConfiguration
            "5 nm", // _fabricationProcess
            "Apple GPU", // _gpu
            "LPDDR5", // _ramType
            8, // _ramAmount
            null, // _virtualRamExtension
            128, // _internalMemoryAmount
            "No", // _memoryCardSlot
            3, // _mainCamerasCount
            "12 MP, f/1.8, 26mm (wide)", // _mainCameraMegapixels
            "Triple", // _cameraModulesType
            "Sony IMX682", // _mainCameraSensorModel
            "f/2.4", // _mainCameraAperture
            "Yes", // _mainCameraAutofocus
            "LED", // _flashType
            117, // _lensFieldOfViewAngle
            "Yes", // _opticalStabilization
            5, // _digitalZoomPhoto
            "2x", // _opticalZoomPhoto
            "4320p@24/30/60fps, 2160p@30/60/120fps, 1080p@30/60/120/240fps, HDR, Dolby Vision HDR (up to 60fps), stereo sound rec.", // _mainCameraResolution
            120, // _dxomarkRatingMainCamera
            "Night mode, Panorama, ProRAW, Deep Fusion, Smart HDR 3", // _mainCameraFeaturesTechnologies
            "Portrait mode, Night mode, Panorama, ProRAW, Deep Fusion, Smart HDR 3", // _mainCameraShootingModesFeatures
            "HDR10", // _videoShootingFormat
            "2160p@24/30/60fps, 1080p@30/60/120/240fps, gyro-EIS", // _videoResolutionFrameRate
            "Yes", // _slowMotionVideo
            "No", // _videoZoom
            "MP4/H.264", // _videoPlaybackFormats
            "Cinematic video stabilization, Dolby Vision HDR (up to 60fps), stereo sound rec.", // _videoShootingFeaturesFunctions
            "12 MP, f/2.2, 23mm (wide), SL 3D (depth/biometrics sensor)", // _dualFrontCamera
            12, // _frontCameraMegapixelsCount
            "f/2.2", // _frontCameraAperture
            "Yes", // _frontCameraAutofocus
            "Retina Flash", // _builtInFlash
            "Dual", // _frontCameraResolution
            87, // _dxomarkRatingSelfieCamera
            "Night mode, Deep Fusion, HDR", // _frontCameraFeaturesTechnologies
            "Portrait mode, Night mode, Deep Fusion, HDR", // _frontCameraShootingModesFeatures
            "Yes, with stereo speakers", // _stereoSpeakers
            "MP3, WAV, AAX+, AIFF", // _audioFileFormats
            "No", // _fmRadio
            "5.2", // _bluetoothVersion
            "Wi-Fi 6 (802.11ax)", // _wifiStandard
            "Yes", // _nfc
            "GPS, GLONASS, GALILEO, BDS, QZSS", // _navigationSystems
            "Yes", // _irPort
            "Yes", // _otherDataTransmissionTechnologies
            "Lightning", // _chargingInterface
            "Yes", // _headphoneJack
            "Yes", // _otgSupport
            "Face ID, accelerometer, gyro, proximity, compass, barometer", // _sensors
            "Li-Ion", // _batteryType
            "Non-removable Li-Ion 3700 mAh battery", // _batteryCapacity
            "20W", // _chargerVoltage
            "2.22A", // _chargerOutputPower
            "Yes", // _fastCharging
            "USB Power Delivery 2.0", // _fastChargingStandards
            "Qi wireless charging", // _wirelessChargingSupport
            "Yes", // _reverseWirelessChargingSupport
            "Up to 65 h", // _musicPlaybackTime
            "Up to 17 h", // _videoPlaybackTime
            "Face ID", // _biometricProtection
            "No", // _headphonesIncluded
            "Yes", // _chargerIncluded
            "Phone, EarPods with Lightning Connector, Lightning to USB Cable, USB Power Adapter", // _packageContents
            "Yes", // _ledNotificationIndicator
            "Water resistant (up to 30 minutes in a depth of 6 meters), IP68", // _additionalFeatures
            "146.7 x 71.5 x 7.4 mm (5.78 x 2.81 x 0.29 in), 164 g (5.78 oz)" // _dimensionsAndWeight
        );
        
        await phoneService.create({
            name: "Phone X",
            producername: "Phone Producer Inc.",
            osname: "OSX",
            ramsize: 8,
            memsize: 128,
            camres: 12,
            price: 999,
            warranty: 12,
            release_year: 2022,
            type: "Smartphone",
            model: "X123",
            producer_code: "123456",
            back_panel_color: "Black",
            edge_color: "Silver",
            manufacturer_declared_color: null,
            frequencies_2g: "GSM 900 / GSM 1800",
            frequencies_3g: "HSDPA 900 / HSDPA 2100",
            lte_4g_support: "LTE",
            frequencies_4g_lte: "LTE 850 / LTE 1800 / LTE 2100",
            lte_advanced_support: "LTE-A",
            lte_advanced_speed_categories: "Category 21",
            volte_support: "Yes",
            networks_5g_support: "5G",
            frequencies_5g: "5G NR bands 77, 78 Sub6/mmWave",
            sim_card_format: "Nano-SIM",
            esim_count: 0,
            screen_size_inch: 6.7,
            screen_resolution: "1080x2340 pixels",
            physical_sim_cards_count: 2,
            screen_matrix_technology: "AMOLED",
            screen_matrix_type_detailed: "Super AMOLED",
            brightness: 600,
            screen_refresh_rate: 120,
            pixel_density: 401,
            aspect_ratio: "20:9",
            screen_colors_count: 16,
            body_type: "Bar",
            body_material: "Glass",
            ruggedness: "IP68 dust/water resistant",
            screen_protective_coating: "Corning Gorilla Glass Victus",
            ip_rating: "IP68",
            screen_cutout_type: "Punch-hole",
            os_version: "iOS 14",
            processor_model: "Apple A14 Bionic",
            cores_count: 8,
            max_processor_frequency: 3.1,
            processor_configuration: "Hexa-core",
            fabrication_process: "5 nm",
            gpu: "Apple GPU",
            ram_type: "LPDDR5",
            ram_amount: 8,
            virtual_ram_extension: null,
            internal_memory_amount: 128,
            memory_card_slot: "No",
            main_cameras_count: 3,
            main_camera_megapixels: "12 MP, f/1.8, 26mm (wide)",
            camera_modules_type: "Triple",
            main_camera_sensor_model: "Sony IMX682",
            main_camera_aperture: "f/2.4",
            main_camera_autofocus: "Yes",
            flash_type: "LED",
            lens_field_of_view_angle: 117,
            optical_stabilization: "Yes",
            digital_zoom_photo: 5,
            optical_zoom_photo: "2x",
            main_camera_resolution: "4320p@24/30/60fps, 2160p@30/60/120fps, 1080p@30/60/120/240fps, HDR, Dolby Vision HDR (up to 60fps), stereo sound rec.",
            dxomark_rating_main_camera: 120,
            main_camera_features_technologies: "Night mode, Panorama, ProRAW, Deep Fusion, Smart HDR 3",
            main_camera_shooting_modes_features: "Portrait mode, Night mode, Panorama, ProRAW, Deep Fusion, Smart HDR 3",
            video_shooting_format: "HDR10",
            video_resolution_frame_rate: "2160p@24/30/60fps, 1080p@30/60/120/240fps, gyro-EIS",
            slow_motion_video: "Yes",
            video_zoom: "No",
            video_playback_formats: "MP4/H.264",
            video_shooting_features_functions: "Cinematic video stabilization, Dolby Vision HDR (up to 60fps), stereo sound rec.",
            dual_front_camera: "12 MP, f/2.2, 23mm (wide), SL 3D (depth/biometrics sensor)",
            front_camera_megapixels_count: 12,
            front_camera_aperture: "f/2.2",
            front_camera_autofocus: "Yes",
            built_in_flash: "Retina Flash",
            front_camera_resolution: "Dual",
            dxomark_rating_selfie_camera: 87,
            front_camera_features_technologies: "Night mode, Deep Fusion, HDR",
            front_camera_shooting_modes_features: "Portrait mode, Night mode, Deep Fusion, HDR",
            stereo_speakers: "Yes, with stereo speakers",
            audio_file_formats: "MP3, WAV, AAX+, AIFF",
            fm_radio: "No",
            bluetooth_version: "5.2",
            wifi_standard: "Wi-Fi 6 (802.11ax)",
            nfc: "Yes",
            navigation_systems: "GPS, GLONASS, GALILEO, BDS, QZSS",
            ir_port: "Yes",
            other_data_transmission_technologies: "Yes",
            charging_interface: "Lightning",
            headphone_jack: "Yes",
            otg_support: "Yes",
            sensors: "Face ID, accelerometer, gyro, proximity, compass, barometer",
            battery_type: "Li-Ion",
            battery_capacity: "Non-removable Li-Ion 3700 mAh battery",
            charger_voltage: "20W",
            charger_output_power: "2.22A",
            fast_charging: "Yes",
            fast_charging_standards: "USB Power Delivery 2.0",
            wireless_charging_support: "Qi wireless charging",
            reverse_wireless_charging_support: "Yes",
            music_playback_time: "Up to 65 h",
            video_playback_time: "Up to 17 h",
            biometric_protection: "Face ID",
            headphones_included: "No",
            charger_included: "Yes",
            package_contents: "Phone, EarPods with Lightning Connector, Lightning to USB Cable, USB Power Adapter",
            led_notification_indicator: "Yes",
            additional_features: "Water resistant (up to 30 minutes in a depth of 6 meters), IP68",
            dimensions_and_weight: "146.7 x 71.5 x 7.4 mm (5.78 x 2.81 x 0.29 in), 164 g (5.78 oz)"        
        }).then((createdPhone) => {
            if (createdPhone instanceof Error){
                throw(createdPhone);
                }
                expect(createdPhone).toBeDefined();
                expect(createdPhone.id).toBeDefined();
                expect(createdPhone.name).toBe(phone.name);
                expect(createdPhone.producername).toBe(phone.producername);
                expect(createdPhone.osname).toBe(phone.osname);
                expect(createdPhone.ramsize).toBe(phone.ramsize);
                expect(createdPhone.memsize).toBe(phone.memsize);
                expect(createdPhone.camres).toBe(phone.camres);
                expect(createdPhone.price).toBe(phone.price);
                expect(createdPhone.warranty).toBe(phone.warranty);
                expect(createdPhone.release_year).toBe(phone.releaseYear);
                expect(createdPhone.type).toBe(phone.type);
                expect(createdPhone.model).toBe(phone.model);
                expect(createdPhone.producer_code).toBe(phone.producerCode);
                expect(createdPhone.back_panel_color).toBe(phone.backPanelColor);
                expect(createdPhone.edge_color).toBe(phone.edgeColor);
                expect(createdPhone.manufacturer_declared_color).toBe(phone.manufacturerDeclaredColor);
                expect(createdPhone.frequencies_2g).toBe(phone.frequencies2G);
                expect(createdPhone.frequencies_3g).toBe(phone.frequencies3G);
                expect(createdPhone.lte_4g_support).toBe(phone.lte4GSupport);
                expect(createdPhone.frequencies_4g_lte).toBe(phone.frequencies4GLTE);
                expect(createdPhone.lte_advanced_support).toBe(phone.lteAdvancedSupport);
                expect(createdPhone.lte_advanced_speed_categories).toBe(phone.lteAdvancedSpeedCategories);
                expect(createdPhone.volte_support).toBe(phone.volteSupport);
                expect(createdPhone.networks_5g_support).toBe(phone.networks5GSupport);
                expect(createdPhone.frequencies_5g).toBe(phone.frequencies5G);
                expect(createdPhone.sim_card_format).toBe(phone.simCardFormat);;
                expect(createdPhone.screen_resolution).toBe(phone.screenResolution);
                expect(createdPhone.physical_sim_cards_count).toBe(phone.physicalSimCardsCount);
                expect(createdPhone.screen_matrix_technology).toBe(phone.screenMatrixTechnology);
                expect(createdPhone.screen_matrix_type_detailed).toBe(phone.screenMatrixTypeDetailed);
                expect(createdPhone.brightness).toBe(phone.brightness);
                expect(createdPhone.screen_refresh_rate).toBe(phone.screenRefreshRate);
                expect(createdPhone.pixel_density).toBe(phone.pixelDensity);
                expect(createdPhone.aspect_ratio).toBe(phone.aspectRatio);
                expect(createdPhone.screen_colors_count).toBe(phone.screenColorsCount);
                expect(createdPhone.body_type).toBe(phone.bodyType);
                expect(createdPhone.body_material).toBe(phone.bodyMaterial);
                expect(createdPhone.ruggedness).toBe(phone.ruggedness);
                expect(createdPhone.screen_protective_coating).toBe(phone.screenProtectiveCoating);
                expect(createdPhone.ip_rating).toBe(phone.ipRating);
                expect(createdPhone.screen_cutout_type).toBe(phone.screenCutoutType);
                expect(createdPhone.os_version).toBe(phone.osVersion);
                expect(createdPhone.processor_model).toBe(phone.processorModel);
                expect(createdPhone.cores_count).toBe(phone.coresCount);
                expect(createdPhone.processor_configuration).toBe(phone.processorConfiguration);
                expect(createdPhone.fabrication_process).toBe(phone.fabricationProcess);
                expect(createdPhone.gpu).toBe(phone.gpu);
                expect(createdPhone.ram_type).toBe(phone.ramType);
                expect(createdPhone.ram_amount).toBe(phone.ramAmount);
                expect(createdPhone.virtual_ram_extension).toBe(phone.virtualRamExtension);
                expect(createdPhone.internal_memory_amount).toBe(phone.internalMemoryAmount);
                expect(createdPhone.memory_card_slot).toBe(phone.memoryCardSlot);
                expect(createdPhone.main_cameras_count).toBe(phone.mainCamerasCount);
                expect(createdPhone.main_camera_megapixels).toBe(phone.mainCameraMegapixels);
                expect(createdPhone.camera_modules_type).toBe(phone.cameraModulesType);
                expect(createdPhone.main_camera_sensor_model).toBe(phone.mainCameraSensorModel);
                expect(createdPhone.main_camera_aperture).toBe(phone.mainCameraAperture);
                expect(createdPhone.main_camera_autofocus).toBe(phone.mainCameraAutofocus);
                expect(createdPhone.flash_type).toBe(phone.flashType);
                expect(createdPhone.lens_field_of_view_angle).toBe(phone.lensFieldOfViewAngle);
                expect(createdPhone.optical_stabilization).toBe(phone.opticalStabilization);
                expect(createdPhone.digital_zoom_photo).toBe(phone.digitalZoomPhoto);
                expect(createdPhone.optical_zoom_photo).toBe(phone.opticalZoomPhoto);
                expect(createdPhone.main_camera_resolution).toBe(phone.mainCameraResolution);
                expect(createdPhone.dxomark_rating_main_camera).toBe(phone.dxomarkRatingMainCamera);
                expect(createdPhone.main_camera_features_technologies).toBe(phone.mainCameraFeaturesTechnologies);
                expect(createdPhone.main_camera_shooting_modes_features).toBe(phone.mainCameraShootingModesFeatures);
                expect(createdPhone.video_shooting_format).toBe(phone.videoShootingFormat);
                expect(createdPhone.video_resolution_frame_rate).toBe(phone.videoResolutionFrameRate);
                expect(createdPhone.slow_motion_video).toBe(phone.slowMotionVideo);
                expect(createdPhone.video_zoom).toBe(phone.videoZoom);
                expect(createdPhone.video_playback_formats).toBe(phone.videoPlaybackFormats);
                expect(createdPhone.video_shooting_features_functions).toBe(phone.videoShootingFeaturesFunctions);
                expect(createdPhone.dual_front_camera).toBe(phone.dualFrontCamera);
                expect(createdPhone.front_camera_megapixels_count).toBe(phone.frontCameraMegapixelsCount);
                expect(createdPhone.front_camera_aperture).toBe(phone.frontCameraAperture);
                expect(createdPhone.front_camera_autofocus).toBe(phone.frontCameraAutofocus);
                expect(createdPhone.built_in_flash).toBe(phone.builtInFlash);
                expect(createdPhone.front_camera_resolution).toBe(phone.frontCameraResolution);
                expect(createdPhone.dxomark_rating_selfie_camera).toBe(phone.dxomarkRatingSelfieCamera);
                expect(createdPhone.front_camera_features_technologies).toBe(phone.frontCameraFeaturesTechnologies);
                expect(createdPhone.front_camera_shooting_modes_features).toBe(phone.frontCameraShootingModesFeatures);
                expect(createdPhone.stereo_speakers).toBe(phone.stereoSpeakers);
                expect(createdPhone.audio_file_formats).toBe(phone.audioFileFormats);
                expect(createdPhone.fm_radio).toBe(phone.fmRadio);
                expect(createdPhone.bluetooth_version).toBe(phone.bluetoothVersion);
                expect(createdPhone.wifi_standard).toBe(phone.wifiStandard);
                expect(createdPhone.nfc).toBe(phone.nfc);
                expect(createdPhone.navigation_systems).toBe(phone.navigationSystems);
                expect(createdPhone.ir_port).toBe(phone.irPort);
                expect(createdPhone.other_data_transmission_technologies).toBe(phone.otherDataTransmissionTechnologies);
                expect(createdPhone.charging_interface).toBe(phone.chargingInterface);
                expect(createdPhone.headphone_jack).toBe(phone.headphoneJack);
                expect(createdPhone.otg_support).toBe(phone.otgSupport);
                expect(createdPhone.sensors).toBe(phone.sensors);
                expect(createdPhone.battery_type).toBe(phone.batteryType);
                expect(createdPhone.battery_capacity).toBe(phone.batteryCapacity);
                expect(createdPhone.charger_voltage).toBe(phone.chargerVoltage);
                expect(createdPhone.charger_output_power).toBe(phone.chargerOutputPower);
                expect(createdPhone.fast_charging).toBe(phone.fastCharging);
                expect(createdPhone.fast_charging_standards).toBe(phone.fastChargingStandards);
                expect(createdPhone.wireless_charging_support).toBe(phone.wirelessChargingSupport);
                expect(createdPhone.reverse_wireless_charging_support).toBe(phone.reverseWirelessChargingSupport);
                expect(createdPhone.music_playback_time).toBe(phone.musicPlaybackTime);
                expect(createdPhone.video_playback_time).toBe(phone.videoPlaybackTime);
                expect(createdPhone.biometric_protection).toBe(phone.biometricProtection);
                expect(createdPhone.headphones_included).toBe(phone.headphonesIncluded);
                expect(createdPhone.charger_included).toBe(phone.chargerIncluded);
                expect(createdPhone.package_contents).toBe(phone.packageContents);
                expect(createdPhone.led_notification_indicator).toBe(phone.ledNotificationIndicator);
                expect(createdPhone.additional_features).toBe(phone.additionalFeatures);
                expect(createdPhone.dimensions_and_weight).toBe(phone.dimensionsAndWeight);
                testPhoneId = createdPhone.id;
            }).catch((error: Error) => {
                console.error(error.message);
                expect(false).toBe(true);
            })
    });

    test('findPhoneById - получение телефона по ID', async () => {
        await phoneService.findById(testPhoneId)
            .then((fetchedPhone) => {
            if (fetchedPhone instanceof Error){
                throw(fetchedPhone);
                }
                expect(fetchedPhone).toBeDefined();
                expect(fetchedPhone?.id).toBe(testPhoneId);
            }).catch((error: Error) => {
                console.error(error.message);
                expect(false).toBe(true);
            })
    });

    test('updatePhone - обновление данных телефона', async () => {
        const updatedPhone = await phoneService.update({
            id: testPhoneId,
            name: "Phone 1",
            producername: "Phone Producer Inc.",
            osname: "OSX",
            ramsize: 8,
            memsize: 128,
            camres: 12,
            price: 999,
            warranty: 12,
            release_year: 2022,
            type: "Smartphone",
            model: "X123",
            producer_code: "123456",
            back_panel_color: "Black",
            edge_color: "Silver",
            manufacturer_declared_color: null,
            frequencies_2g: "GSM 900 / GSM 1800",
            frequencies_3g: "HSDPA 900 / HSDPA 2100",
            lte_4g_support: "LTE",
            frequencies_4g_lte: "LTE 850 / LTE 1800 / LTE 2100",
            lte_advanced_support: "LTE-A",
            lte_advanced_speed_categories: "Category 21",
            volte_support: "Yes",
            networks_5g_support: "5G",
            frequencies_5g: "5G NR bands 77, 78 Sub6/mmWave",
            sim_card_format: "Nano-SIM",
            esim_count: 0,
            screen_size_inch: 6.7,
            screen_resolution: "1080x2340 pixels",
            physical_sim_cards_count: 2,
            screen_matrix_technology: "AMOLED",
            screen_matrix_type_detailed: "Super AMOLED",
            brightness: 600,
            screen_refresh_rate: 120,
            pixel_density: 401,
            aspect_ratio: "20:9",
            screen_colors_count: 16,
            body_type: "Bar",
            body_material: "Glass",
            ruggedness: "IP68 dust/water resistant",
            screen_protective_coating: "Corning Gorilla Glass Victus",
            ip_rating: "IP68",
            screen_cutout_type: "Punch-hole",
            os_version: "iOS 14",
            processor_model: "Apple A14 Bionic",
            cores_count: 8,
            max_processor_frequency: 3.1,
            processor_configuration: "Hexa-core",
            fabrication_process: "5 nm",
            gpu: "Apple GPU",
            ram_type: "LPDDR5",
            ram_amount: 8,
            virtual_ram_extension: null,
            internal_memory_amount: 128,
            memory_card_slot: "No",
            main_cameras_count: 3,
            main_camera_megapixels: "12 MP, f/1.8, 26mm (wide)",
            camera_modules_type: "Triple",
            main_camera_sensor_model: "Sony IMX682",
            main_camera_aperture: "f/2.4",
            main_camera_autofocus: "Yes",
            flash_type: "LED",
            lens_field_of_view_angle: 117,
            optical_stabilization: "Yes",
            digital_zoom_photo: 5,
            optical_zoom_photo: "2x",
            main_camera_resolution: "4320p@24/30/60fps, 2160p@30/60/120fps, 1080p@30/60/120/240fps, HDR, Dolby Vision HDR (up to 60fps), stereo sound rec.",
            dxomark_rating_main_camera: 120,
            main_camera_features_technologies: "Night mode, Panorama, ProRAW, Deep Fusion, Smart HDR 3",
            main_camera_shooting_modes_features: "Portrait mode, Night mode, Panorama, ProRAW, Deep Fusion, Smart HDR 3",
            video_shooting_format: "HDR10",
            video_resolution_frame_rate: "2160p@24/30/60fps, 1080p@30/60/120/240fps, gyro-EIS",
            slow_motion_video: "Yes",
            video_zoom: "No",
            video_playback_formats: "MP4/H.264",
            video_shooting_features_functions: "Cinematic video stabilization, Dolby Vision HDR (up to 60fps), stereo sound rec.",
            dual_front_camera: "12 MP, f/2.2, 23mm (wide), SL 3D (depth/biometrics sensor)",
            front_camera_megapixels_count: 12,
            front_camera_aperture: "f/2.2",
            front_camera_autofocus: "Yes",
            built_in_flash: "Retina Flash",
            front_camera_resolution: "Dual",
            dxomark_rating_selfie_camera: 87,
            front_camera_features_technologies: "Night mode, Deep Fusion, HDR",
            front_camera_shooting_modes_features: "Portrait mode, Night mode, Deep Fusion, HDR",
            stereo_speakers: "Yes, with stereo speakers",
            audio_file_formats: "MP3, WAV, AAX+, AIFF",
            fm_radio: "No",
            bluetooth_version: "5.2",
            wifi_standard: "Wi-Fi 6 (802.11ax)",
            nfc: "Yes",
            navigation_systems: "GPS, GLONASS, GALILEO, BDS, QZSS",
            ir_port: "Yes",
            other_data_transmission_technologies: "Yes",
            charging_interface: "Lightning",
            headphone_jack: "Yes",
            otg_support: "Yes",
            sensors: "Face ID, accelerometer, gyro, proximity, compass, barometer",
            battery_type: "Li-Ion",
            battery_capacity: "Non-removable Li-Ion 3700 mAh battery",
            charger_voltage: "20W",
            charger_output_power: "2.22A",
            fast_charging: "Yes",
            fast_charging_standards: "USB Power Delivery 2.0",
            wireless_charging_support: "Qi wireless charging",
            reverse_wireless_charging_support: "Yes",
            music_playback_time: "Up to 65 h",
            video_playback_time: "Up to 17 h",
            biometric_protection: "Face ID",
            headphones_included: "No",
            charger_included: "Yes",
            package_contents: "Phone, EarPods with Lightning Connector, Lightning to USB Cable, USB Power Adapter",
            led_notification_indicator: "Yes",
            additional_features: "Water resistant (up to 30 minutes in a depth of 6 meters), IP68",
            dimensions_and_weight: "146.7 x 71.5 x 7.4 mm (5.78 x 2.81 x 0.29 in), 164 g (5.78 oz)"        
    }).then((updatedPhone) => {
        if (updatedPhone instanceof Error){
            throw(updatedPhone);
            }
            expect(updatedPhone).toBeDefined();
            expect(updatedPhone?.id).toBe(testPhoneId);
            expect(updatedPhone?.name).toBe("Phone 1");
        }).catch((error: Error) => {
            console.error(error.message);
            expect(false).toBe(true);
        })
    });
});
