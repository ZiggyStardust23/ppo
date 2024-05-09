type phoneFullDTO = {
    id: string;
    name: string;
    producername: string;
    osname: string;
    ramsize: number;
    memsize: number;
    camres: number;
    price: number;
    warranty: number;
    release_year: number;
    type: string;
    model: string;
    producer_code: string;
    back_panel_color: string | null;
    edge_color: string | null;
    manufacturer_declared_color: string | null;
    frequencies_2g: string | null;
    frequencies_3g: string | null;
    lte_4g_support: string | null;
    frequencies_4g_lte: string | null;
    lte_advanced_support: string | null;
    lte_advanced_speed_categories: string | null;
    volte_support: string | null;
    networks_5g_support: string | null;
    frequencies_5g: string | null;
    sim_card_format: string | null;
    esim_count: number;
    screen_size_inch: number;
    screen_resolution: string;
    physical_sim_cards_count: number;
    screen_matrix_technology: string | null;
    screen_matrix_type_detailed: string | null;
    brightness: number;
    screen_refresh_rate: number;
    pixel_density: number;
    aspect_ratio: string;
    screen_colors_count: number;
    body_type: string | null;
    body_material: string | null;
    ruggedness: string | null;
    screen_protective_coating: string | null;
    ip_rating: string | null;
    screen_cutout_type: string | null;
    os_version: string | null;
    processor_model: string | null;
    cores_count: number;
    max_processor_frequency: number;
    processor_configuration: string | null;
    fabrication_process: string | null;
    gpu: string | null;
    ram_type: string | null;
    ram_amount: number;
    virtual_ram_extension: string | null;
    internal_memory_amount: number;
    memory_card_slot: string | null;
    main_cameras_count: number;
    main_camera_megapixels: string | null;
    camera_modules_type: string | null;
    main_camera_sensor_model: string | null;
    main_camera_aperture: string | null;
    main_camera_autofocus: string | null;
    flash_type: string | null;
    lens_field_of_view_angle: number;
    optical_stabilization: string | null;
    digital_zoom_photo: number;
    optical_zoom_photo: string | null;
    main_camera_resolution: string | null;
    dxomark_rating_main_camera: number;
    main_camera_features_technologies: string | null;
    main_camera_shooting_modes_features: string | null;
    video_shooting_format: string | null;
    video_resolution_frame_rate: string | null;
    slow_motion_video: string | null;
    video_zoom: string | null;
    video_playback_formats: string | null;
    video_shooting_features_functions: string | null;
    dual_front_camera: string | null;
    front_camera_megapixels_count: number;
    front_camera_aperture: string | null;
    front_camera_autofocus: string | null;
    built_in_flash: string | null;
    front_camera_resolution: string | null;
    dxomark_rating_selfie_camera: number;
    front_camera_features_technologies: string | null;
    front_camera_shooting_modes_features: string | null;
    stereo_speakers: string | null;
    audio_file_formats: string | null;
    fm_radio: string | null;
    bluetooth_version: string | null;
    wifi_standard: string | null;
    nfc: string | null;
    navigation_systems: string | null;
    ir_port: string | null;
    other_data_transmission_technologies: string | null;
    charging_interface: string | null;
    headphone_jack: string | null;
    otg_support: string | null;
    sensors: string | null;
    battery_type: string | null;
    battery_capacity: string | null;
    charger_voltage: string | null;
    charger_output_power: string | null;
    fast_charging: string | null;
    fast_charging_standards: string | null;
    wireless_charging_support: string | null;
    reverse_wireless_charging_support: string | null;
    music_playback_time: string | null;
    video_playback_time: string | null;
    biometric_protection: string | null;
    headphones_included: string | null;
    charger_included: string | null;
    package_contents: string | null;
    led_notification_indicator: string | null;
    additional_features: string | null;
    dimensions_and_weight: string | null;
}

type phoneSearchDTO = {
    minramsize: undefined;
    maxramsize: undefined;
    minmemsize: undefined;
    maxmemsize: undefined;
    mincamres: undefined;
    maxcamres: undefined;
    name: string,
    producername: string,
    osname: string,
    minRamSize: number,
    maxRamSize: number,
    minMemSize: number,
    maxMemSize: number,
    minCamRes: number,
    maxCamRes: number,
    minPrice: number,
    maxPrice: number,
    warranty: number,
    releaseYear: number,
    type: string,
    model: string,
    producerCode: string,
    physicalSimCardsCount: number,
    screenSizeInch: number,
    brightness: number,
    screenRefreshRate: number,
    pixelDensity: number,
    aspectRatio: string,
    screenColorsCount: number,
    coresCount: number,
    maxProcessorFrequency: number,
    ramAmount: number,
    internalMemoryAmount: number,
    mainCamerasCount: number,
    lensFieldOfViewAngle: number,
    digitalZoomPhoto: number,
    mainCameraResolution: string,
    dxomarkRatingMainCamera: number,
    frontCameraMegapixelsCount: number,
    dxomarkRatingSelfieCamera: number,
    backPanelColor: string,
    edgeColor: string,
    manufacturerDeclaredColor: string,
    frequencies2G: string,
    frequencies3G: string,
    lte4GSupport: string,
    frequencies4GLTE: string,
    lteAdvancedSupport: string,
    lteAdvancedSpeedCategories: string,
    volteSupport: string,
    networks5GSupport: string,
    frequencies5G: string,
    simCardFormat: string,
    esimCount: number,
    screenResolution: string,
    screenMatrixTechnology: string,
    screenMatrixTypeDetailed: string,
    bodyType: string,
    bodyMaterial: string,
    ruggedness: string,
    screenProtectiveCoating: string,
    ipRating: string,
    screenCutoutType: string,
    osVersion: string,
    processorModel: string,
    processorConfiguration: string,
    fabricationProcess: string,
    gpu: string,
    ramType: string,
    virtualRamExtension: string,
    memoryCardSlot: string,
    cameraModulesType: string,
    mainCameraSensorModel: string,
    mainCameraAperture: string,
    mainCameraAutofocus: string,
    flashType: string,
    opticalStabilization: string,
    opticalZoomPhoto: string,
    mainCameraFeaturesTechnologies: string,
    mainCameraShootingModesFeatures: string,
    videoShootingFormat: string,
    videoResolutionFrameRate: string,
    slowMotionVideo: string,
    videoZoom: string,
    videoPlaybackFormats: string,
    videoShootingFeaturesFunctions: string,
    dualFrontCamera: string,
    frontCameraAperture: string,
    frontCameraAutofocus: string,
    builtInFlash: string,
    frontCameraResolution: string,
    frontCameraFeaturesTechnologies: string,
    frontCameraShootingModesFeatures: string,
    stereoSpeakers: string,
    audioFileFormats: string,
    fmRadio: string,
    bluetoothVersion: string,
    wifiStandard: string,
    nfc: string,
    navigationSystems: string,
    irPort: string,
    otherDataTransmissionTechnologies: string,
    chargingInterface: string,
    headphoneJack: string,
    otgSupport: string,
    sensors: string,
    batteryType: string,
    batteryCapacity: string,
    chargerVoltage: string,
    chargerOutputPower: string,
    fastCharging: string,
    fastChargingStandards: string,
    wirelessChargingSupport: string,
    reverseWirelessChargingSupport: string,
    musicPlaybackTime: string,
    videoPlaybackTime: string,
    biometricProtection: string,
    headphonesIncluded: string,
    chargerIncluded: string,
    packageContents: string,
    ledNotificationIndicator: string,
    additionalFeatures: string,
    deliveryFeatures: string,
    dimensionsAndWeight: string
};


type phoneCreateDTO = {
    name: string;
    producername: string;
    osname: string;
    ramsize: number;
    memsize: number;
    camres: number;
    price: number;
    warranty: number;
    release_year: number;
    type: string;
    model: string;
    producer_code: string;
    back_panel_color: string | null;
    edge_color: string | null;
    manufacturer_declared_color: string | null;
    frequencies_2g: string | null;
    frequencies_3g: string | null;
    lte_4g_support: string | null;
    frequencies_4g_lte: string | null;
    lte_advanced_support: string | null;
    lte_advanced_speed_categories: string | null;
    volte_support: string | null;
    networks_5g_support: string | null;
    frequencies_5g: string | null;
    sim_card_format: string | null;
    esim_count: number;
    screen_size_inch: number;
    screen_resolution: string;
    physical_sim_cards_count: number;
    screen_matrix_technology: string | null;
    screen_matrix_type_detailed: string | null;
    brightness: number;
    screen_refresh_rate: number;
    pixel_density: number;
    aspect_ratio: string;
    screen_colors_count: number;
    body_type: string | null;
    body_material: string | null;
    ruggedness: string | null;
    screen_protective_coating: string | null;
    ip_rating: string | null;
    screen_cutout_type: string | null;
    os_version: string | null;
    processor_model: string | null;
    cores_count: number;
    max_processor_frequency: number;
    processor_configuration: string | null;
    fabrication_process: string | null;
    gpu: string | null;
    ram_type: string | null;
    ram_amount: number;
    virtual_ram_extension: string | null;
    internal_memory_amount: number;
    memory_card_slot: string | null;
    main_cameras_count: number;
    main_camera_megapixels: string | null;
    camera_modules_type: string | null;
    main_camera_sensor_model: string | null;
    main_camera_aperture: string | null;
    main_camera_autofocus: string | null;
    flash_type: string | null;
    lens_field_of_view_angle: number;
    optical_stabilization: string | null;
    digital_zoom_photo: number;
    optical_zoom_photo: string | null;
    main_camera_resolution: string | null;
    dxomark_rating_main_camera: number;
    main_camera_features_technologies: string | null;
    main_camera_shooting_modes_features: string | null;
    video_shooting_format: string | null;
    video_resolution_frame_rate: string | null;
    slow_motion_video: string | null;
    video_zoom: string | null;
    video_playback_formats: string | null;
    video_shooting_features_functions: string | null;
    dual_front_camera: string | null;
    front_camera_megapixels_count: number;
    front_camera_aperture: string | null;
    front_camera_autofocus: string | null;
    built_in_flash: string | null;
    front_camera_resolution: string | null;
    dxomark_rating_selfie_camera: number;
    front_camera_features_technologies: string | null;
    front_camera_shooting_modes_features: string | null;
    stereo_speakers: string | null;
    audio_file_formats: string | null;
    fm_radio: string | null;
    bluetooth_version: string | null;
    wifi_standard: string | null;
    nfc: string | null;
    navigation_systems: string | null;
    ir_port: string | null;
    other_data_transmission_technologies: string | null;
    charging_interface: string | null;
    headphone_jack: string | null;
    otg_support: string | null;
    sensors: string | null;
    battery_type: string | null;
    battery_capacity: string | null;
    charger_voltage: string | null;
    charger_output_power: string | null;
    fast_charging: string | null;
    fast_charging_standards: string | null;
    wireless_charging_support: string | null;
    reverse_wireless_charging_support: string | null;
    music_playback_time: string | null;
    video_playback_time: string | null;
    biometric_protection: string | null;
    headphones_included: string | null;
    charger_included: string | null;
    package_contents: string | null;
    led_notification_indicator: string | null;
    additional_features: string | null;
    dimensions_and_weight: string | null;
}

type returnPhoneDTO = {
    id: string;
    name: string;
    producername: string;
    osname: string;
    ramsize: number;
    memsize: number;
    camres: number;
    price: number;
    warranty: number;
    release_year: number;
    type: string;
    model: string;
    producer_code: string;
    back_panel_color: string | null;
    edge_color: string | null;
    manufacturer_declared_color: string | null;
    frequencies_2g: string | null;
    frequencies_3g: string | null;
    lte_4g_support: string | null;
    frequencies_4g_lte: string | null;
    lte_advanced_support: string | null;
    lte_advanced_speed_categories: string | null;
    volte_support: string | null;
    networks_5g_support: string | null;
    frequencies_5g: string | null;
    sim_card_format: string | null;
    esim_count: number;
    screen_size_inch: number;
    screen_resolution: string;
    physical_sim_cards_count: number;
    screen_matrix_technology: string | null;
    screen_matrix_type_detailed: string | null;
    brightness: number;
    screen_refresh_rate: number;
    pixel_density: number;
    aspect_ratio: string;
    screen_colors_count: number;
    body_type: string | null;
    body_material: string | null;
    ruggedness: string | null;
    screen_protective_coating: string | null;
    ip_rating: string | null;
    screen_cutout_type: string | null;
    os_version: string | null;
    processor_model: string | null;
    cores_count: number;
    max_processor_frequency: number;
    processor_configuration: string | null;
    fabrication_process: string | null;
    gpu: string | null;
    ram_type: string | null;
    ram_amount: number;
    virtual_ram_extension: string | null;
    internal_memory_amount: number;
    memory_card_slot: string | null;
    main_cameras_count: number;
    main_camera_megapixels: string | null;
    camera_modules_type: string | null;
    main_camera_sensor_model: string | null;
    main_camera_aperture: string | null;
    main_camera_autofocus: string | null;
    flash_type: string | null;
    lens_field_of_view_angle: number;
    optical_stabilization: string | null;
    digital_zoom_photo: number;
    optical_zoom_photo: string | null;
    main_camera_resolution: string | null;
    dxomark_rating_main_camera: number;
    main_camera_features_technologies: string | null;
    main_camera_shooting_modes_features: string | null;
    video_shooting_format: string | null;
    video_resolution_frame_rate: string | null;
    slow_motion_video: string | null;
    video_zoom: string | null;
    video_playback_formats: string | null;
    video_shooting_features_functions: string | null;
    dual_front_camera: string | null;
    front_camera_megapixels_count: number;
    front_camera_aperture: string | null;
    front_camera_autofocus: string | null;
    built_in_flash: string | null;
    front_camera_resolution: string | null;
    dxomark_rating_selfie_camera: number;
    front_camera_features_technologies: string | null;
    front_camera_shooting_modes_features: string | null;
    stereo_speakers: string | null;
    audio_file_formats: string | null;
    fm_radio: string | null;
    bluetooth_version: string | null;
    wifi_standard: string | null;
    nfc: string | null;
    navigation_systems: string | null;
    ir_port: string | null;
    other_data_transmission_technologies: string | null;
    charging_interface: string | null;
    headphone_jack: string | null;
    otg_support: string | null;
    sensors: string | null;
    battery_type: string | null;
    battery_capacity: string | null;
    charger_voltage: string | null;
    charger_output_power: string | null;
    fast_charging: string | null;
    fast_charging_standards: string | null;
    wireless_charging_support: string | null;
    reverse_wireless_charging_support: string | null;
    music_playback_time: string | null;
    video_playback_time: string | null;
    biometric_protection: string | null;
    headphones_included: string | null;
    charger_included: string | null;
    package_contents: string | null;
    led_notification_indicator: string | null;
    additional_features: string | null;
    dimensions_and_weight: string | null;
};



export { phoneFullDTO, phoneCreateDTO, phoneSearchDTO, returnPhoneDTO }