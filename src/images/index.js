import { useState, useEffect } from 'react';

const image = {
    pexels: require('~/images/pexels-photo-237272.jpeg'),
    beach: require('~/images/beach-g6dc238df2_1920.jpg'),
    forest: require('~/images/black-forest-gaf3ef4a97_1920.jpg'),
    QRCode: require('~/images/img-zalo-Hi.jpg'),
    instagram: require('~/images/Instagram-Icon.png'),
    zalo: require('~/images/unnamed.webp'),
    logo: require('~/images/logophongnha.png'),
    imgDiscovery: require('~/images/discovery.jpg'),
}

const imageFeature = [
    image.pexels,
    image.beach,
    image.forest
];

export { imageFeature, image };