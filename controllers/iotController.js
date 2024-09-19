
let simulatedDeviceData = {
    deviceName: "ESP8266",
    pinStatus: {
      D0: "connected",
      D1: "connected",
      D2: "connected",
      D3: "connected",
      D4: "connected",
    }
  };
  

  export const getDeviceStatus = (req, res) => {
    res.json(simulatedDeviceData);
  };
  

  export const updateDeviceStatus = (req, res) => {
    const { deviceName, pinStatus } = req.body;
  
    if (deviceName && pinStatus) {
      simulatedDeviceData.deviceName = deviceName;
      simulatedDeviceData.pinStatus = pinStatus;
      res.json({ message: "Device status updated successfully", data: simulatedDeviceData });
    } else {
      res.status(400).json({ message: "Invalid data provided" });
    }
  };
  