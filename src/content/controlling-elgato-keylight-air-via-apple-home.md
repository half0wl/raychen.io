---
title: "Controlling Elgato Keylight Air via Apple Home"
slug: "controlling-elgato-keylight-air-via-apple-home"
publishedAt: "2024-01-03"
keywords: "home automation, apple home, elgato keylight air"
---

<ImageWithCaption src="https://res.cloudinary.com/dh3yuijgy/image/upload/v1704296206/elgato-homeapp_dxfls7.png" caption="Elgato Keylight Air over Home.app" alt="Elgato Keylight Air over Home.app" />

This is how you can control the [Elgato Keylight Air](https://www.elgato.com/ww/en/p/key-light-air)
over Home.app. Since Elgato has no native support for HomeKit, you'll need to
have [Homebridge](https://homebridge.io/) installed, and the
[homebridge-http-light-bulb](https://github.com/Supereg/homebridge-http-lightbulb) plugin.

After you have Homebridge and homebridge-http-light-bulb up and running,
add this in the `accessories` section of your Homebridge config:

```json
{
  "accessory": "HTTP-LIGHTBULB",
  "name": "Elgato Keylight Air",
  "debug": false,
  "onUrl": {
    "url": "http://192.168.1.93:9123/elgato/lights",
    "method": "PUT",
    "body": "{\"numberOfLights\":1,\"lights\":[{\"on\":1}]}"
  },
  "offUrl": {
    "url": "http://192.168.1.93:9123/elgato/lights",
    "method": "PUT",
    "body": "{\"numberOfLights\":1, \"lights\":[{\"on\":0}]}"
  },
  "statusUrl": "http://192.168.1.93:9123/elgato/lights",
  "statusPattern": "\"on\":1",
  "brightness": {
    "statusUrl": "http://192.168.1.93:9123/elgato/lights",
    "statusPattern": "\"brightness\":(\\d*)",
    "setUrl": {
      "url": "http://192.168.1.93:9123/elgato/lights",
      "method": "PUT",
      "body": "{\"numberOfLights\":1, \"lights\":[{\"brightness\":%s }]}"
    }
  },
  "colorTemperature": {
    "statusUrl": "http://192.168.1.93:9123/elgato/lights",
    "statusPattern": "\"temperature\":(\\d*)",
    "unit": "mired",
    "minValue": 143,
    "maxValue": 344,
    "setUrl": {
      "url": "http://192.168.1.93:9123/elgato/lights",
      "method": "PUT",
      "body": "{\"numberOfLights\":1,\"lights\":[{\"temperature\": %s }]}"
    }
  }
}
```

Save it, and voila!
