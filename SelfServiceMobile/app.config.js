// app.config.js
import 'dotenv/config';

export default {
    expo: {
        name: "YourAppName",
        slug: "your-app-slug",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF"
            }
        },
        web: {
            favicon: "./assets/favicon.png"
        },
        extra: {
            apiBaseUrl: process.env.API_BASE_URL,
        }
    }
};