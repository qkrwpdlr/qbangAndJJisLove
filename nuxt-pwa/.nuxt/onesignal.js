window.$OneSignal = window.OneSignal = window.OneSignal || [];

OneSignal.push(['init', {
  "appId": "1dc91fb3-db09-4248-b48c-71285960f03f",
  "allowLocalhostAsSecureOrigin": true,
  "welcomeNotification": {
    "disable": true
  }
}]);

export default function (ctx, inject) {
  inject('OneSignal', OneSignal)
}
