export default {
    port: process.env.PORT || 3000,
    folderStorage: process.env.URL_STORAGE || './storage',
    pictureQuality: process.env.PICTURE_QUALITY || 80,
    secretKey: process.env.SECRETKEY || '09a380aa-d680-4324-b3a0-79ff33e1ec05',
    publicRoutes: process.env.PUBLICROUTES || [
        'users/create',
        'users/auth',
        'customer/create',
        'storage',
    ],
}
