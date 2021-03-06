import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'geoen',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_stat_location_on',
      iconColor: '#ff0000'
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '786629739060-5n8tc3nberf8cs1h2rr9lvamta5ls2af.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
