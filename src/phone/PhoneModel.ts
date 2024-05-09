import { returnPhoneDTO } from "./PhoneDTO";

export class Phone {
    private _id: string;
    private _name: string;
    private _producername: string;
    private _osname: string;
    private _ramsize: number;
    private _memsize: number;
    private _camres: number;
    private _price: number;
    private _warranty: number;
    private _releaseYear: number;
    private _type: string;
    private _model: string;
    private _producerCode: string;
    private _backPanelColor: string | null;
    private _edgeColor: string | null;
    private _manufacturerDeclaredColor: string | null;
    private _frequencies2G: string | null;
    private _frequencies3G: string | null;
    private _lte4GSupport: string | null;
    private _frequencies4GLTE: string | null;
    private _lteAdvancedSupport: string | null;
    private _lteAdvancedSpeedCategories: string | null;
    private _volteSupport: string | null;
    private _networks5GSupport: string | null;
    private _frequencies5G: string | null;
    private _simCardFormat: string | null;
    private _physicalSimCardsCount: number;
    private _esimCount: number;
    private _screenSizeInch: number;
    private _screenResolution: string;
    private _screenMatrixTechnology: string | null;
    private _screenMatrixTypeDetailed: string | null;
    private _brightness: number;
    private _screenRefreshRate: number;
    private _pixelDensity: number;
    private _aspectRatio: string;
    private _screenColorsCount: number;
    private _bodyType: string | null;
    private _bodyMaterial: string | null;
    private _ruggedness: string | null;
    private _screenProtectiveCoating: string | null;
    private _ipRating: string | null;
    private _screenCutoutType: string | null;
    private _osVersion: string | null;
    private _processorModel: string | null;
    private _coresCount: number;
    private _maxProcessorFrequency: number; // in GHz
    private _processorConfiguration: string | null;
    private _fabricationProcess: string | null;
    private _gpu: string | null;
    private _ramType: string | null;
    private _ramAmount: number; // in GB
    private _virtualRamExtension: string | null;
    private _internalMemoryAmount: number; // in GB
    private _memoryCardSlot: string | null;
    private _mainCamerasCount: number;
    private _mainCameraMegapixels: string | null;
    private _cameraModulesType: string | null;
    private _mainCameraSensorModel: string | null;
    private _mainCameraAperture: string | null;
    private _mainCameraAutofocus: string | null;
    private _flashType: string | null;
    private _lensFieldOfViewAngle: number; // in degrees
    private _opticalStabilization: string | null;
    private _digitalZoomPhoto: number;
    private _opticalZoomPhoto: string | null;
    private _mainCameraResolution: string | null;
    private _dxomarkRatingMainCamera: number;
    private _mainCameraFeaturesTechnologies: string | null;
    private _mainCameraShootingModesFeatures: string | null;
    private _videoShootingFormat: string | null;
    private _videoResolutionFrameRate: string | null;
    private _slowMotionVideo: string | null;
    private _videoZoom: string | null;
    private _videoPlaybackFormats: string | null;
    private _videoShootingFeaturesFunctions: string | null;
    private _dualFrontCamera: string | null;
    private _frontCameraMegapixelsCount: number;
    private _frontCameraAperture: string | null;
    private _frontCameraAutofocus: string | null;
    private _builtInFlash: string | null;
    private _frontCameraResolution: string | null;
    private _dxomarkRatingSelfieCamera: number;
    private _frontCameraFeaturesTechnologies: string | null;
    private _frontCameraShootingModesFeatures: string | null;
    private _stereoSpeakers: string | null;
    private _audioFileFormats: string | null;
    private _fmRadio: string | null;
    private _bluetoothVersion: string | null;
    private _wifiStandard: string | null;
    private _nfc: string | null;
    private _navigationSystems: string | null;
    private _irPort: string | null;
    private _otherDataTransmissionTechnologies: string | null;
    private _chargingInterface: string | null;
    private _headphoneJack: string | null;
    private _otgSupport: string | null;
    private _sensors: string | null;
    private _batteryType: string | null;
    private _batteryCapacity: string | null;
    private _chargerVoltage: string | null;
    private _chargerOutputPower: string | null;
    private _fastCharging: string | null;
    private _fastChargingStandards: string | null;
    private _wirelessChargingSupport: string | null;
    private _reverseWirelessChargingSupport: string | null;
    private _musicPlaybackTime: string | null;
    private _videoPlaybackTime: string | null;
    private _biometricProtection: string | null;
    private _headphonesIncluded: string | null;
    private _chargerIncluded: string | null;
    private _packageContents: string | null;
    private _ledNotificationIndicator: string | null;
    private _additionalFeatures: string | null;
    private _dimensionsAndWeight: string | null;
    constructor(
        id: string,
        name: string,
        producername: string,
        osname: string,
        ramsize: number,
        memsize: number,
        camres: number,
        price: number,
        warranty: number,
        releaseYear: number,
        type: string,
        model: string,
        producerCode: string,
        backPanelColor: string | null,
        edgeColor: string | null,
        manufacturerDeclaredColor: string | null,
        frequencies2G: string | null,
        frequencies3G: string | null,
        lte4GSupport: string | null,
        frequencies4GLTE: string | null,
        lteAdvancedSupport: string | null,
        lteAdvancedSpeedCategories: string | null,
        volteSupport: string | null,
        networks5GSupport: string | null,
        frequencies5G: string | null,
        simCardFormat: string | null,
        physicalSimCardsCount: number,
        esimCount: number,
        screenSizeInch: number,
        screenResolution: string,
        screenMatrixTechnology: string | null,
        screenMatrixTypeDetailed: string | null,
        brightness: number,
        screenRefreshRate: number,
        pixelDensity: number,
        aspectRatio: string,
        screenColorsCount: number,
        bodyType: string | null,
        bodyMaterial: string | null,
        ruggedness: string | null,
        screenProtectiveCoating: string | null,
        ipRating: string | null,
        screenCutoutType: string | null,
        osVersion: string | null,
        processorModel: string | null,
        coresCount: number,
        maxProcessorFrequency: number,
        processorConfiguration: string | null,
        fabricationProcess: string | null,
        gpu: string | null,
        ramType: string | null,
        ramAmount: number,
        virtualRamExtension: string | null,
        internalMemoryAmount: number,
        memoryCardSlot: string | null,
        mainCamerasCount: number,
        mainCameraMegapixels: string | null,
        cameraModulesType: string | null,
        mainCameraSensorModel: string | null,
        mainCameraAperture: string | null,
        mainCameraAutofocus: string | null,
        flashType: string | null,
        lensFieldOfViewAngle: number,
        opticalStabilization: string | null,
        digitalZoomPhoto: number,
        opticalZoomPhoto: string | null,
        mainCameraResolution: string | null,
        dxomarkRatingMainCamera: number,
        mainCameraFeaturesTechnologies: string | null,
        mainCameraShootingModesFeatures: string | null,
        videoShootingFormat: string | null,
        videoResolutionFrameRate: string | null,
        slowMotionVideo: string | null,
        videoZoom: string | null,
        videoPlaybackFormats: string | null,
        videoShootingFeaturesFunctions: string | null,
        dualFrontCamera: string | null,
        frontCameraMegapixelsCount: number,
        frontCameraAperture: string | null,
        frontCameraAutofocus: string | null,
        builtInFlash: string | null,
        frontCameraResolution: string | null,
        dxomarkRatingSelfieCamera: number,
        frontCameraFeaturesTechnologies: string | null,
        frontCameraShootingModesFeatures: string | null,
        stereoSpeakers: string | null,
        audioFileFormats: string | null,
        fmRadio: string | null,
        bluetoothVersion: string | null,
        wifiStandard: string | null,
        nfc: string | null,
        navigationSystems: string | null,
        irPort: string | null,
        otherDataTransmissionTechnologies: string | null,
        chargingInterface: string | null,
        headphoneJack: string | null,
        otgSupport: string | null,
        sensors: string | null,
        batteryType: string | null,
        batteryCapacity: string | null,
        chargerVoltage: string | null,
        chargerOutputPower: string | null,
        fastCharging: string | null,
        fastChargingStandards: string | null,
        wirelessChargingSupport: string | null,
        reverseWirelessChargingSupport: string | null,
        musicPlaybackTime: string | null,
        videoPlaybackTime: string | null,
        biometricProtection: string | null,
        headphonesIncluded: string | null,
        chargerIncluded: string | null,
        packageContents: string | null,
        ledNotificationIndicator: string | null,
        additionalFeatures: string | null,
        dimensionsAndWeight: string | null
    ) {
        this._id = id;
        this._name = name;
        this._producername = producername;
        this._osname = osname;
        this._ramsize = ramsize;
        this._memsize = memsize;
        this._camres = camres;
        this._price = price;
        this._warranty = warranty;
        this._releaseYear = releaseYear;
        this._type = type;
        this._model = model;
        this._producerCode = producerCode;
        this._backPanelColor = backPanelColor;
        this._edgeColor = edgeColor;
        this._manufacturerDeclaredColor = manufacturerDeclaredColor;
        this._frequencies2G = frequencies2G;
        this._frequencies3G = frequencies3G;
        this._lte4GSupport = lte4GSupport;
        this._frequencies4GLTE = frequencies4GLTE;
        this._lteAdvancedSupport = lteAdvancedSupport;
        this._lteAdvancedSpeedCategories = lteAdvancedSpeedCategories;
        this._volteSupport = volteSupport;
        this._networks5GSupport = networks5GSupport;
        this._frequencies5G = frequencies5G;
        this._simCardFormat = simCardFormat;
        this._physicalSimCardsCount = physicalSimCardsCount;
        this._esimCount = esimCount;
        this._screenSizeInch = screenSizeInch;
        this._screenResolution = screenResolution;
        this._screenMatrixTechnology = screenMatrixTechnology;
        this._screenMatrixTypeDetailed = screenMatrixTypeDetailed;
        this._brightness = brightness;
        this._screenRefreshRate = screenRefreshRate;
        this._pixelDensity = pixelDensity;
        this._aspectRatio = aspectRatio;
        this._screenColorsCount = screenColorsCount;
        this._bodyType = bodyType;
        this._bodyMaterial = bodyMaterial;
        this._ruggedness = ruggedness;
        this._screenProtectiveCoating = screenProtectiveCoating;
        this._ipRating = ipRating;
        this._screenCutoutType = screenCutoutType;
        this._osVersion = osVersion;
        this._processorModel = processorModel;
        this._coresCount = coresCount;
        this._maxProcessorFrequency = maxProcessorFrequency;
        this._processorConfiguration = processorConfiguration;
        this._fabricationProcess = fabricationProcess;
        this._gpu = gpu;
        this._ramType = ramType;
        this._ramAmount = ramAmount;
        this._virtualRamExtension = virtualRamExtension;
        this._internalMemoryAmount = internalMemoryAmount;
        this._memoryCardSlot = memoryCardSlot;
        this._mainCamerasCount = mainCamerasCount;
        this._mainCameraMegapixels = mainCameraMegapixels;
        this._cameraModulesType = cameraModulesType;
        this._mainCameraSensorModel = mainCameraSensorModel;
        this._mainCameraAperture = mainCameraAperture;
        this._mainCameraAutofocus = mainCameraAutofocus;
        this._flashType = flashType;
        this._lensFieldOfViewAngle = lensFieldOfViewAngle;
        this._opticalStabilization = opticalStabilization;
        this._digitalZoomPhoto = digitalZoomPhoto;
        this._opticalZoomPhoto = opticalZoomPhoto;
        this._mainCameraResolution = mainCameraResolution;
        this._dxomarkRatingMainCamera = dxomarkRatingMainCamera;
        this._mainCameraFeaturesTechnologies = mainCameraFeaturesTechnologies;
        this._mainCameraShootingModesFeatures = mainCameraShootingModesFeatures;
        this._videoShootingFormat = videoShootingFormat;
        this._videoResolutionFrameRate = videoResolutionFrameRate;
        this._slowMotionVideo = slowMotionVideo;
        this._videoZoom = videoZoom;
        this._videoPlaybackFormats = videoPlaybackFormats;
        this._videoShootingFeaturesFunctions = videoShootingFeaturesFunctions;
        this._dualFrontCamera = dualFrontCamera;
        this._frontCameraMegapixelsCount = frontCameraMegapixelsCount;
        this._frontCameraAperture = frontCameraAperture;
        this._frontCameraAutofocus = frontCameraAutofocus;
        this._builtInFlash = builtInFlash;
        this._frontCameraResolution = frontCameraResolution;
        this._dxomarkRatingSelfieCamera = dxomarkRatingSelfieCamera;
        this._frontCameraFeaturesTechnologies = frontCameraFeaturesTechnologies;
        this._frontCameraShootingModesFeatures = frontCameraShootingModesFeatures;
        this._stereoSpeakers = stereoSpeakers;
        this._audioFileFormats = audioFileFormats;
        this._fmRadio = fmRadio;
        this._bluetoothVersion = bluetoothVersion;
        this._wifiStandard = wifiStandard;
        this._nfc = nfc;
        this._navigationSystems = navigationSystems;
        this._irPort = irPort;
        this._otherDataTransmissionTechnologies = otherDataTransmissionTechnologies;
        this._chargingInterface = chargingInterface;
        this._headphoneJack = headphoneJack;
        this._otgSupport = otgSupport;
        this._sensors = sensors;
        this._batteryType = batteryType;
        this._batteryCapacity = batteryCapacity;
        this._chargerVoltage = chargerVoltage;
        this._chargerOutputPower = chargerOutputPower;
        this._fastCharging = fastCharging;
        this._fastChargingStandards = fastChargingStandards;
        this._wirelessChargingSupport = wirelessChargingSupport;
        this._reverseWirelessChargingSupport = reverseWirelessChargingSupport;
        this._musicPlaybackTime = musicPlaybackTime;
        this._videoPlaybackTime = videoPlaybackTime;
        this._biometricProtection = biometricProtection;
        this._headphonesIncluded = headphonesIncluded;
        this._chargerIncluded = chargerIncluded;
        this._packageContents = packageContents;
        this._ledNotificationIndicator = ledNotificationIndicator;
        this._additionalFeatures = additionalFeatures;
        this._dimensionsAndWeight = dimensionsAndWeight;
    }

    public toDTO(): returnPhoneDTO {
        return {
            id: this._id,
            name: this._name,
            producername: this._producername,
            osname: this._osname,
            ramsize: this._ramsize,
            memsize: this._memsize,
            camres: this._camres,
            price: this._price,
            warranty: this._warranty,
            release_year: this._releaseYear,
            type: this._type,
            model: this._model,
            producer_code: this._producerCode,
            back_panel_color: this._backPanelColor,
            edge_color: this._edgeColor,
            manufacturer_declared_color: this._manufacturerDeclaredColor,
            frequencies_2g: this._frequencies2G,
            frequencies_3g: this._frequencies3G,
            lte_4g_support: this._lte4GSupport,
            frequencies_4g_lte: this._frequencies4GLTE,
            lte_advanced_support: this._lteAdvancedSupport,
            lte_advanced_speed_categories: this._lteAdvancedSpeedCategories,
            volte_support: this._volteSupport,
            networks_5g_support: this._networks5GSupport,
            frequencies_5g: this._frequencies5G,
            sim_card_format: this._simCardFormat,
            physical_sim_cards_count: this._physicalSimCardsCount,
            esim_count: this._esimCount,
            screen_size_inch: this._screenSizeInch,
            screen_resolution: this._screenResolution,
            screen_matrix_technology: this._screenMatrixTechnology,
            screen_matrix_type_detailed: this._screenMatrixTypeDetailed,
            brightness: this._brightness,
            screen_refresh_rate: this._screenRefreshRate,
            pixel_density: this._pixelDensity,
            aspect_ratio: this._aspectRatio,
            screen_colors_count: this._screenColorsCount,
            body_type: this._bodyType,
            body_material: this._bodyMaterial,
            ruggedness: this._ruggedness,
            screen_protective_coating: this._screenProtectiveCoating,
            ip_rating: this._ipRating,
            screen_cutout_type: this._screenCutoutType,
            os_version: this._osVersion,
            processor_model: this._processorModel,
            cores_count: this._coresCount,
            max_processor_frequency: this._maxProcessorFrequency,
            processor_configuration: this._processorConfiguration,
            fabrication_process: this._fabricationProcess,
            gpu: this._gpu,
            ram_type: this._ramType,
            ram_amount: this._ramAmount,
            virtual_ram_extension: this._virtualRamExtension,
            internal_memory_amount: this._internalMemoryAmount,
            memory_card_slot: this._memoryCardSlot,
            main_cameras_count: this._mainCamerasCount,
            main_camera_megapixels: this._mainCameraMegapixels,
            camera_modules_type: this._cameraModulesType,
            main_camera_sensor_model: this._mainCameraSensorModel,
            main_camera_aperture: this._mainCameraAperture,
            main_camera_autofocus: this._mainCameraAutofocus,
            flash_type: this._flashType,
            lens_field_of_view_angle: this._lensFieldOfViewAngle,
            optical_stabilization: this._opticalStabilization,
            digital_zoom_photo: this._digitalZoomPhoto,
            optical_zoom_photo: this._opticalZoomPhoto,
            main_camera_resolution: this._mainCameraResolution,
            dxomark_rating_main_camera: this._dxomarkRatingMainCamera,
            main_camera_features_technologies: this._mainCameraFeaturesTechnologies,
            main_camera_shooting_modes_features: this._mainCameraShootingModesFeatures,
            video_shooting_format: this._videoShootingFormat,
            video_resolution_frame_rate: this._videoResolutionFrameRate,
            slow_motion_video: this._slowMotionVideo,
            video_zoom: this._videoZoom,
            video_playback_formats: this._videoPlaybackFormats,
            video_shooting_features_functions: this._videoShootingFeaturesFunctions,
            dual_front_camera: this._dualFrontCamera,
            front_camera_megapixels_count: this._frontCameraMegapixelsCount,
            front_camera_aperture: this._frontCameraAperture,
            front_camera_autofocus: this._frontCameraAutofocus,
            built_in_flash: this._builtInFlash,
            front_camera_resolution: this._frontCameraResolution,
            dxomark_rating_selfie_camera: this._dxomarkRatingSelfieCamera,
            front_camera_features_technologies: this._frontCameraFeaturesTechnologies,
            front_camera_shooting_modes_features: this._frontCameraShootingModesFeatures,
            stereo_speakers: this._stereoSpeakers,
            audio_file_formats: this._audioFileFormats,
            fm_radio: this._fmRadio,
            bluetooth_version: this._bluetoothVersion,
            wifi_standard: this._wifiStandard,
            nfc: this._nfc,
            navigation_systems: this._navigationSystems,
            ir_port: this._irPort,
            other_data_transmission_technologies: this._otherDataTransmissionTechnologies,
            charging_interface: this._chargingInterface,
            headphone_jack: this._headphoneJack,
            otg_support: this._otgSupport,
            sensors: this._sensors,
            battery_type: this._batteryType,
            battery_capacity: this._batteryCapacity,
            charger_voltage: this._chargerVoltage,
            charger_output_power: this._chargerOutputPower,
            fast_charging: this._fastCharging,
            fast_charging_standards: this._fastChargingStandards,
            wireless_charging_support: this._wirelessChargingSupport,
            reverse_wireless_charging_support: this._reverseWirelessChargingSupport,
            music_playback_time: this._musicPlaybackTime,
            video_playback_time: this._videoPlaybackTime,
            biometric_protection: this._biometricProtection,
            headphones_included: this._headphonesIncluded,
            charger_included: this._chargerIncluded,
            package_contents: this._packageContents,
            led_notification_indicator: this._ledNotificationIndicator,
            additional_features: this._additionalFeatures,
            dimensions_and_weight: this._dimensionsAndWeight,
        };
    }
        get id(): string {
            return this._id;
        }
    
        get name(): string {
            return this._name;
        }
    
        get producername(): string {
            return this._producername;
        }
    
        get osname(): string {
            return this._osname;
        }
    
        get ramsize(): number {
            return this._ramsize;
        }
    
        get memsize(): number {
            return this._memsize;
        }
    
        get camres(): number {
            return this._camres;
        }
    
        get price(): number {
            return this._price;
        }
    
        get warranty(): number {
            return this._warranty;
        }
    
        get releaseYear(): number {
            return this._releaseYear;
        }
    
        get type(): string {
            return this._type;
        }
    
        get model(): string {
            return this._model;
        }
    
        get producerCode(): string {
            return this._producerCode;
        }
    
        get backPanelColor(): string | null {
            return this._backPanelColor;
        }
    
        get edgeColor(): string | null {
            return this._edgeColor;
        }
    
        get manufacturerDeclaredColor(): string | null {
            return this._manufacturerDeclaredColor;
        }
    
        get frequencies2G(): string | null {
            return this._frequencies2G;
        }
    
        get frequencies3G(): string | null {
            return this._frequencies3G;
        }
    
        get lte4GSupport(): string | null {
            return this._lte4GSupport;
        }
    
        get frequencies4GLTE(): string | null {
            return this._frequencies4GLTE;
        }
    
        get lteAdvancedSupport(): string | null {
            return this._lteAdvancedSupport;
        }
    
        get lteAdvancedSpeedCategories(): string | null {
            return this._lteAdvancedSpeedCategories;
        }
    
        get volteSupport(): string | null {
            return this._volteSupport;
        }
    
        get networks5GSupport(): string | null {
            return this._networks5GSupport;
        }
    
        get frequencies5G(): string | null {
            return this._frequencies5G;
        }
    
        get simCardFormat(): string | null {
            return this._simCardFormat;
        }
    
        get physicalSimCardsCount(): number {
            return this._physicalSimCardsCount;
        }
    
        get esimCount(): number {
            return this._esimCount;
        }
    
        get screenSizeInch(): number {
            return this._screenSizeInch;
        }
    
        get screenResolution(): string {
            return this._screenResolution;
        }
    
        get screenMatrixTechnology(): string | null {
            return this._screenMatrixTechnology;
        }
    
        get screenMatrixTypeDetailed(): string | null {
            return this._screenMatrixTypeDetailed;
        }
    
        get brightness(): number {
            return this._brightness;
        }
    
        get screenRefreshRate(): number {
            return this._screenRefreshRate;
        }
    
        get pixelDensity(): number {
            return this._pixelDensity;
        }
    
        get aspectRatio(): string {
            return this._aspectRatio;
        }
    
        get screenColorsCount(): number {
            return this._screenColorsCount;
        }
    
        get bodyType(): string | null {
            return this._bodyType;
        }
    
        get bodyMaterial(): string | null {
            return this._bodyMaterial;
        }
    
        get ruggedness(): string | null {
            return this._ruggedness;
        }
    
        get screenProtectiveCoating(): string | null {
            return this._screenProtectiveCoating;
        }
    
        get ipRating(): string | null {
            return this._ipRating;
        }
    
        get screenCutoutType(): string | null {
            return this._screenCutoutType;
        }
    
        get osVersion(): string | null {
            return this._osVersion;
        }
    
        get processorModel(): string | null {
            return this._processorModel;
        }
    
        get coresCount(): number {
            return this._coresCount;
        }
    
        get maxProcessorFrequency(): number {
            return this._maxProcessorFrequency;
        }
    
        get processorConfiguration(): string | null {
            return this._processorConfiguration;
        }
    
        get fabricationProcess(): string | null {
            return this._fabricationProcess;
        }
    
        get gpu(): string | null {
            return this._gpu;
        }
    
        get ramType(): string | null {
            return this._ramType;
        }
    
        get ramAmount(): number {
            return this._ramAmount;
        }
    
        get virtualRamExtension(): string | null {
            return this._virtualRamExtension;
        }
    
        get internalMemoryAmount(): number {
            return this._internalMemoryAmount;
        }
    
        get memoryCardSlot(): string | null {
            return this._memoryCardSlot;
        }
    
        get mainCamerasCount(): number {
            return this._mainCamerasCount;
        }
    
        get mainCameraMegapixels(): string | null {
            return this._mainCameraMegapixels;
        }
    
        get cameraModulesType(): string | null {
            return this._cameraModulesType;
        }
    
        get mainCameraSensorModel(): string | null {
            return this._mainCameraSensorModel;
        }
    
        get mainCameraAperture(): string | null {
            return this._mainCameraAperture;
        }
    
        get mainCameraAutofocus(): string | null {
            return this._mainCameraAutofocus;
        }
    
        get flashType(): string | null {
            return this._flashType;
        }
    
        get lensFieldOfViewAngle(): number {
            return this._lensFieldOfViewAngle;
        }
    
        get opticalStabilization(): string | null {
            return this._opticalStabilization;
        }
    
        get digitalZoomPhoto(): number {
            return this._digitalZoomPhoto;
        }
    
        get opticalZoomPhoto(): string | null {
            return this._opticalZoomPhoto;
        }
    
        get mainCameraResolution(): string | null {
            return this._mainCameraResolution;
        }
    
        get dxomarkRatingMainCamera(): number {
            return this._dxomarkRatingMainCamera;
        }
    
        get mainCameraFeaturesTechnologies(): string | null {
            return this._mainCameraFeaturesTechnologies;
        }
    
        get mainCameraShootingModesFeatures(): string | null {
            return this._mainCameraShootingModesFeatures;
        }
    
        get videoShootingFormat(): string | null {
            return this._videoShootingFormat;
        }
    
        get videoResolutionFrameRate(): string | null {
            return this._videoResolutionFrameRate;
        }
    
        get slowMotionVideo(): string | null {
            return this._slowMotionVideo;
        }
    
        get videoZoom(): string | null {
            return this._videoZoom;
        }
    
        get videoPlaybackFormats(): string | null {
            return this._videoPlaybackFormats;
        }
    
        get videoShootingFeaturesFunctions(): string | null {
            return this._videoShootingFeaturesFunctions;
        }
    
        get dualFrontCamera(): string | null {
            return this._dualFrontCamera;
        }
    
        get frontCameraMegapixelsCount(): number {
            return this._frontCameraMegapixelsCount;
        }
    
        get frontCameraAperture(): string | null {
            return this._frontCameraAperture;
        }
    
        get frontCameraAutofocus(): string | null {
            return this._frontCameraAutofocus;
        }
    
        get builtInFlash(): string | null {
            return this._builtInFlash;
        }
    
        get frontCameraResolution(): string | null {
            return this._frontCameraResolution;
        }
    
        get dxomarkRatingSelfieCamera(): number {
            return this._dxomarkRatingSelfieCamera;
        }
    
        get frontCameraFeaturesTechnologies(): string | null {
            return this._frontCameraFeaturesTechnologies;
        }
    
        get frontCameraShootingModesFeatures(): string | null {
            return this._frontCameraShootingModesFeatures;
        }
    
        get stereoSpeakers(): string | null {
            return this._stereoSpeakers;
        }
    
        get audioFileFormats(): string | null {
            return this._audioFileFormats;
        }
    
        get fmRadio(): string | null {
            return this._fmRadio;
        }
    
        get bluetoothVersion(): string | null {
            return this._bluetoothVersion;
        }
    
        get wifiStandard(): string | null {
            return this._wifiStandard;
        }
    
        get nfc(): string | null {
            return this._nfc;
        }
    
        get navigationSystems(): string | null {
            return this._navigationSystems;
        }
    
        get irPort(): string | null {
            return this._irPort;
        }
    
        get otherDataTransmissionTechnologies(): string | null {
            return this._otherDataTransmissionTechnologies;
        }
    
        get chargingInterface(): string | null {
            return this._chargingInterface;
        }
    
        get headphoneJack(): string | null {
            return this._headphoneJack;
        }
    
        get otgSupport(): string | null {
            return this._otgSupport;
        }
    
        get sensors(): string | null {
            return this._sensors;
        }
    
        get batteryType(): string | null {
            return this._batteryType;
        }
    
        get batteryCapacity(): string | null {
            return this._batteryCapacity;
        }
    
        get chargerVoltage(): string | null {
            return this._chargerVoltage;
        }
    
        get chargerOutputPower(): string | null {
            return this._chargerOutputPower;
        }
    
        get fastCharging(): string | null {
            return this._fastCharging;
        }
    
        get fastChargingStandards(): string | null {
            return this._fastChargingStandards;
        }
    
        get wirelessChargingSupport(): string | null {
            return this._wirelessChargingSupport;
        }
    
        get reverseWirelessChargingSupport(): string | null {
            return this._reverseWirelessChargingSupport;
        }
    
        get musicPlaybackTime(): string | null {
            return this._musicPlaybackTime;
        }
    
        get videoPlaybackTime(): string | null {
            return this._videoPlaybackTime;
        }
    
        get biometricProtection(): string | null {
            return this._biometricProtection;
        }
    
        get headphonesIncluded(): string | null {
            return this._headphonesIncluded;
        }
    
        get chargerIncluded(): string | null {
            return this._chargerIncluded;
        }
    
        get packageContents(): string | null {
            return this._packageContents;
        }
    
        get ledNotificationIndicator(): string | null {
            return this._ledNotificationIndicator;
        }
    
        get additionalFeatures(): string | null {
            return this._additionalFeatures;
        }
    
        get dimensionsAndWeight(): string | null {
            return this._dimensionsAndWeight;
        }
    
        // Сеттеры
        set id(value: string) {
            this._id = value;
        }
    
        set name(value: string) {
            this._name = value;
        }
    
        set producername(value: string) {
            this._producername = value;
        }
    
        set osname(value: string) {
            this._osname = value;
        }
    
        set ramsize(value: number) {
            this._ramsize = value;
        }
    
        set memsize(value: number) {
            this._memsize = value;
        }
    
        set camres(value: number) {
            this._camres = value;
        }
    
        set price(value: number) {
            this._price = value;
        }
    
        set warranty(value: number) {
            this._warranty = value;
        }
    
        set releaseYear(value: number) {
            this._releaseYear = value;
        }
    
        set type(value: string) {
            this._type = value;
        }
    
        set model(value: string) {
            this._model = value;
        }
    
        set producerCode(value: string) {
            this._producerCode = value;
        }
    
        set backPanelColor(value: string | null) {
            this._backPanelColor = value;
        }
    
        set edgeColor(value: string | null) {
            this._edgeColor = value;
        }
    
        set manufacturerDeclaredColor(value: string | null) {
            this._manufacturerDeclaredColor = value;
        }
    
        set frequencies2G(value: string | null) {
            this._frequencies2G = value;
        }
    
        set frequencies3G(value: string | null) {
            this._frequencies3G = value;
        }
    
        set lte4GSupport(value: string | null) {
            this._lte4GSupport = value;
        }
    
        set frequencies4GLTE(value: string | null) {
            this._frequencies4GLTE = value;
        }
    
        set lteAdvancedSupport(value: string | null) {
            this._lteAdvancedSupport = value;
        }
    
        set lteAdvancedSpeedCategories(value: string | null) {
            this._lteAdvancedSpeedCategories = value;
        }
    
        set volteSupport(value: string | null) {
            this._volteSupport = value;
        }
    
        set networks5GSupport(value: string | null) {
            this._networks5GSupport = value;
        }
    
        set frequencies5G(value: string | null) {
            this._frequencies5G = value;
        }
    
        set simCardFormat(value: string | null) {
            this._simCardFormat = value;
        }
    
        set physicalSimCardsCount(value: number) {
            this._physicalSimCardsCount = value;
        }
    
        set esimCount(value: number) {
            this._esimCount = value;
        }
    
        set screenSizeInch(value: number) {
            this._screenSizeInch = value;
        }
    
        set screenResolution(value: string) {
            this._screenResolution = value;
        }
    
        set screenMatrixTechnology(value: string | null) {
            this._screenMatrixTechnology = value;
        }
    
        set screenMatrixTypeDetailed(value: string | null) {
            this._screenMatrixTypeDetailed = value;
        }
    
        set brightness(value: number) {
            this._brightness = value;
        }
    
        set screenRefreshRate(value: number) {
            this._screenRefreshRate = value;
        }
    
        set pixelDensity(value: number) {
            this._pixelDensity = value;
        }
    
        set aspectRatio(value: string) {
            this._aspectRatio = value;
        }
    
        set screenColorsCount(value: number) {
            this._screenColorsCount = value;
        }
    
        set bodyType(value: string | null) {
            this._bodyType = value;
        }
    
        set bodyMaterial(value: string | null) {
            this._bodyMaterial = value;
        }
    
        set ruggedness(value: string | null) {
            this._ruggedness = value;
        }
    
        set screenProtectiveCoating(value: string | null) {
            this._screenProtectiveCoating = value;
        }
    
        set ipRating(value: string | null) {
            this._ipRating = value;
        }
    
        set screenCutoutType(value: string | null) {
            this._screenCutoutType = value;
        }
    
        set osVersion(value: string | null) {
            this._osVersion = value;
        }
    
        set processorModel(value: string | null) {
            this._processorModel = value;
        }
    
        set coresCount(value: number) {
            this._coresCount = value;
        }
    
        set maxProcessorFrequency(value: number) {
            this._maxProcessorFrequency = value;
        }
    
        set processorConfiguration(value: string | null) {
            this._processorConfiguration = value;
        }
    
        set fabricationProcess(value: string | null) {
            this._fabricationProcess = value;
        }
    
        set gpu(value: string | null) {
            this._gpu = value;
        }
    
        set ramType(value: string | null) {
            this._ramType = value;
        }
    
        set ramAmount(value: number) {
            this._ramAmount = value;
        }
    
        set virtualRamExtension(value: string | null) {
            this._virtualRamExtension = value;
        }
    
        set internalMemoryAmount(value: number) {
            this._internalMemoryAmount = value;
        }
    
        set memoryCardSlot(value: string | null) {
            this._memoryCardSlot = value;
        }
    
        set mainCamerasCount(value: number) {
            this._mainCamerasCount = value;
        }
    
        set mainCameraMegapixels(value: string | null) {
            this._mainCameraMegapixels = value;
        }
    
        set cameraModulesType(value: string | null) {
            this._cameraModulesType = value;
        }
    
        set mainCameraSensorModel(value: string | null) {
            this._mainCameraSensorModel = value;
        }
    
        set mainCameraAperture(value: string | null) {
            this._mainCameraAperture = value;
        }
    
        set mainCameraAutofocus(value: string | null) {
            this._mainCameraAutofocus = value;
        }
    
        set flashType(value: string | null) {
            this._flashType = value;
        }
    
        set lensFieldOfViewAngle(value: number) {
            this._lensFieldOfViewAngle = value;
        }
    
        set opticalStabilization(value: string | null) {
            this._opticalStabilization = value;
        }
    
        set digitalZoomPhoto(value: number) {
            this._digitalZoomPhoto = value;
        }
    
        set opticalZoomPhoto(value: string | null) {
            this._opticalZoomPhoto = value;
        }
    
        set mainCameraResolution(value: string | null) {
            this._mainCameraResolution = value;
        }
    
        set dxomarkRatingMainCamera(value: number) {
            this._dxomarkRatingMainCamera = value;
        }
    
        set mainCameraFeaturesTechnologies(value: string | null) {
            this._mainCameraFeaturesTechnologies = value;
        }
    
        set mainCameraShootingModesFeatures(value: string | null) {
            this._mainCameraShootingModesFeatures = value;
        }
    
        set videoShootingFormat(value: string | null) {
            this._videoShootingFormat = value;
        }
    
        set videoResolutionFrameRate(value: string | null) {
            this._videoResolutionFrameRate = value;
        }
    
        set slowMotionVideo(value: string | null) {
            this._slowMotionVideo = value;
        }
    
        set videoZoom(value: string | null) {
            this._videoZoom = value;
        }
    
        set videoPlaybackFormats(value: string | null) {
            this._videoPlaybackFormats = value;
        }
    
        set videoShootingFeaturesFunctions(value: string | null) {
            this._videoShootingFeaturesFunctions = value;
        }
    
        set dualFrontCamera(value: string | null) {
            this._dualFrontCamera = value;
        }
    
        set frontCameraMegapixelsCount(value: number) {
            this._frontCameraMegapixelsCount = value;
        }
    
        set frontCameraAperture(value: string | null) {
            this._frontCameraAperture = value;
        }
    
        set frontCameraAutofocus(value: string | null) {
            this._frontCameraAutofocus = value;
        }
    
        set builtInFlash(value: string | null) {
            this._builtInFlash = value;
        }
    
        set frontCameraResolution(value: string | null) {
            this._frontCameraResolution = value;
        }
    
        set dxomarkRatingSelfieCamera(value: number) {
            this._dxomarkRatingSelfieCamera = value;
        }
    
        set frontCameraFeaturesTechnologies(value: string | null) {
            this._frontCameraFeaturesTechnologies = value;
        }
    
        set frontCameraShootingModesFeatures(value: string | null) {
            this._frontCameraShootingModesFeatures = value;
        }
    
        set stereoSpeakers(value: string | null) {
            this._stereoSpeakers = value;
        }
    
        set audioFileFormats(value: string | null) {
            this._audioFileFormats = value;
        }
    
        set fmRadio(value: string | null) {
            this._fmRadio = value;
        }
    
        set bluetoothVersion(value: string | null) {
            this._bluetoothVersion = value;
        }
    
        set wifiStandard(value: string | null) {
            this._wifiStandard = value;
        }
    
        set nfc(value: string | null) {
            this._nfc = value;
        }
    
        set navigationSystems(value: string | null) {
            this._navigationSystems = value;
        }
    
        set irPort(value: string | null) {
            this._irPort = value;
        }
    
        set otherDataTransmissionTechnologies(value: string | null) {
            this._otherDataTransmissionTechnologies = value;
        }
    
        set chargingInterface(value: string | null) {
            this._chargingInterface = value;
        }
    
        set headphoneJack(value: string | null) {
            this._headphoneJack = value;
        }
    
        set otgSupport(value: string | null) {
            this._otgSupport = value;
        }
    
        set sensors(value: string | null) {
            this._sensors = value;
        }
    
        set batteryType(value: string | null) {
            this._batteryType = value;
        }
    
        set batteryCapacity(value: string | null) {
            this._batteryCapacity = value;
        }
    
        set chargerVoltage(value: string | null) {
            this._chargerVoltage = value;
        }
    
        set chargerOutputPower(value: string | null) {
            this._chargerOutputPower = value;
        }
    
        set fastCharging(value: string | null) {
            this._fastCharging = value;
        }
    
        set fastChargingStandards(value: string | null) {
            this._fastChargingStandards = value;
        }
    
        set wirelessChargingSupport(value: string | null) {
            this._wirelessChargingSupport = value;
        }
    
        set reverseWirelessChargingSupport(value: string | null) {
            this._reverseWirelessChargingSupport = value;
        }
    
        set musicPlaybackTime(value: string | null) {
            this._musicPlaybackTime = value;
        }
    
        set videoPlaybackTime(value: string | null) {
            this._videoPlaybackTime = value;
        }
    
        set biometricProtection(value: string | null) {
            this._biometricProtection = value;
        }
    
        set headphonesIncluded(value: string | null) {
            this._headphonesIncluded = value;
        }
    
        set chargerIncluded(value: string | null) {
            this._chargerIncluded = value;
        }
    
        set packageContents(value: string | null) {
            this._packageContents = value;
        }
    
        set ledNotificationIndicator(value: string | null) {
            this._ledNotificationIndicator = value;
        }
    
        set additionalFeatures(value: string | null) {
            this._additionalFeatures = value;
        }
    
        set dimensionsAndWeight(value: string | null) {
            this._dimensionsAndWeight = value;
        }
    }
    
