import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export interface WeatherAdvisory {
  id: string;
  type: 'rain' | 'wind' | 'fog' | 'storm' | 'clear' | 'extreme';
  label: string;
  severity: 'low' | 'medium' | 'high';
}

export interface WeatherData {
  temperature: number;
  condition: string;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  pressure: number;
  precipitation: number;
  advisories: WeatherAdvisory[];
  lastUpdated: Date;
  isLoading: boolean;
}

export interface LocationData {
  name: string;
  shortName: string;
  stateOrRegion: string;
  latitude: number;
  longitude: number;
  isLiveGps: boolean;
  accuracy: number | null;
  status: 'idle' | 'acquiring' | 'locked' | 'denied' | 'error';
  error: string | null;
}

export interface WeatherToast {
  id: string;
  title: string;
  message: string;
  type: 'weather' | 'gps' | 'advisory' | 'warning';
  timestamp: string;
  severity?: 'normal' | 'caution' | 'critical';
}

export interface PresetSector {
  id: string;
  name: string;
  shortName: string;
  region: string;
  latitude: number;
  longitude: number;
  description: string;
}

export const PRESET_SECTORS: PresetSector[] = [
  {
    id: 'srinagar',
    name: 'Srinagar, J&K',
    shortName: 'Srinagar',
    region: 'Jammu & Kashmir',
    latitude: 34.0837,
    longitude: 74.7973,
    description: 'HQ 15 Corps • Northern Command Strategic Hub'
  },
  {
    id: 'siachen',
    name: 'Siachen Glacier, Ladakh',
    shortName: 'Siachen',
    region: 'Ladakh Sector',
    latitude: 35.5000,
    longitude: 77.0000,
    description: 'Highest Battlefield • Sub-Zero Combat Sector'
  },
  {
    id: 'uri',
    name: 'Uri Sector (LoC), J&K',
    shortName: 'Uri LoC',
    region: 'Baramulla Sector',
    latitude: 34.0850,
    longitude: 74.0430,
    description: 'Line of Control • Forward Perimeter Post'
  },
  {
    id: 'pathankot',
    name: 'Pathankot, Punjab',
    shortName: 'Pathankot',
    region: 'Punjab Forward Base',
    latitude: 32.2689,
    longitude: 75.6499,
    description: 'IAF Tactical Airbase & Radar Command'
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer, Rajasthan',
    shortName: 'Jaisalmer',
    region: 'Thar Desert Sector',
    latitude: 26.9157,
    longitude: 70.9083,
    description: 'Southern Command • Armoured Battle Group'
  },
  {
    id: 'delhi',
    name: 'New Delhi (HQ IDS)',
    shortName: 'New Delhi',
    region: 'National Capital Command',
    latitude: 28.6139,
    longitude: 77.2090,
    description: 'Integrated Defence Staff • Central Command'
  }
];

interface WeatherLocationContextType {
  location: LocationData;
  weather: WeatherData;
  notificationsEnabled: boolean;
  notificationIntervalSec: number;
  activeToasts: WeatherToast[];
  notificationHistory: WeatherToast[];
  browserNotificationPermission: NotificationPermission;
  requestLiveLocation: () => Promise<void>;
  selectPresetSector: (sectorId: string) => void;
  refreshWeather: () => Promise<void>;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationIntervalSec: (seconds: number) => void;
  requestBrowserNotifications: () => Promise<boolean>;
  dismissToast: (id: string) => void;
  triggerTestNotification: () => void;
}

const WeatherLocationContext = createContext<WeatherLocationContextType | undefined>(undefined);

// Map WMO weather codes from Open-Meteo to tactical military conditions
const mapWmoCodeToCondition = (code: number, windSpeed: number, temp: number): { condition: string; advisories: WeatherAdvisory[]; visibility: number } => {
  const advisories: WeatherAdvisory[] = [];
  let condition = 'Clear Sky';
  let visibility = 10; // km default

  if (code === 0) {
    condition = 'Clear Sky';
    visibility = 10;
  } else if (code === 1 || code === 2) {
    condition = 'Partly Cloudy';
    visibility = 9.5;
  } else if (code === 3) {
    condition = 'Overcast';
    visibility = 8;
  } else if (code === 45 || code === 48) {
    condition = 'Fog / Mist';
    visibility = 2.5;
    advisories.push({ id: 'fog', type: 'fog', label: 'Fog Alert', severity: 'high' });
  } else if (code >= 51 && code <= 55) {
    condition = 'Light Drizzle';
    visibility = 6;
    advisories.push({ id: 'rain', type: 'rain', label: 'Light Rain', severity: 'low' });
  } else if (code >= 61 && code <= 65) {
    condition = code === 65 ? 'Heavy Rain' : 'Moderate Rain';
    visibility = code === 65 ? 3 : 5;
    advisories.push({ id: 'rain', type: 'rain', label: 'Rain Alert', severity: code === 65 ? 'high' : 'medium' });
  } else if (code >= 71 && code <= 77) {
    condition = 'Snowfall';
    visibility = 2;
    advisories.push({ id: 'fog', type: 'fog', label: 'Snow Advisory', severity: 'high' });
  } else if (code >= 80 && code <= 82) {
    condition = 'Rain Showers';
    visibility = 4.5;
    advisories.push({ id: 'rain', type: 'rain', label: 'Shower Alert', severity: 'medium' });
  } else if (code >= 95) {
    condition = 'Thunderstorm';
    visibility = 3;
    advisories.push({ id: 'storm', type: 'storm', label: 'Storm Warning', severity: 'high' });
  }

  // Wind check
  if (windSpeed >= 20) {
    advisories.push({ 
      id: 'wind', 
      type: 'wind', 
      label: `Wind Advisory (${Math.round(windSpeed)} km/h)`, 
      severity: windSpeed > 35 ? 'high' : 'medium' 
    });
  }

  // High Heat or Extreme Cold
  if (temp < 0) {
    advisories.push({ id: 'cold', type: 'extreme', label: 'Sub-Zero Combat Temp', severity: 'high' });
  } else if (temp > 40) {
    advisories.push({ id: 'heat', type: 'extreme', label: 'Extreme Heat Index', severity: 'high' });
  }

  // Default pills if empty
  if (advisories.length === 0) {
    advisories.push({ id: 'clear', type: 'clear', label: 'Optimal Recon', severity: 'low' });
  }

  return { condition, advisories, visibility };
};

export const WeatherLocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Location state (defaults to Live GPS acquisition)
  const [location, setLocation] = useState<LocationData>({
    name: 'Live GPS Location (Acquiring...)',
    shortName: 'Live Location',
    stateOrRegion: 'Operational Sector',
    latitude: 28.6139,
    longitude: 77.2090,
    isLiveGps: true,
    accuracy: null,
    status: 'acquiring',
    error: null
  });

  // Weather state
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 11,
    condition: 'Partly Cloudy',
    weatherCode: 1,
    humidity: 68,
    windSpeed: 12,
    windDirection: 240,
    visibility: 8,
    pressure: 1013,
    precipitation: 0,
    advisories: [
      { id: 'rain', type: 'rain', label: 'Rain Alert', severity: 'medium' },
      { id: 'wind', type: 'wind', label: 'Wind Advisory', severity: 'low' },
      { id: 'fog', type: 'fog', label: 'Fog Alert', severity: 'low' }
    ],
    lastUpdated: new Date(),
    isLoading: false
  });

  // Notification state
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [notificationIntervalSec, setNotificationIntervalSec] = useState<number>(60); // Check/notify every 60s
  const [activeToasts, setActiveToasts] = useState<WeatherToast[]>([]);
  const [notificationHistory, setNotificationHistory] = useState<WeatherToast[]>([]);
  const [browserNotificationPermission, setBrowserNotificationPermission] = useState<NotificationPermission>(() => {
    return typeof Notification !== 'undefined' ? Notification.permission : 'default';
  });

  const lastNotifiedWeatherRef = useRef<{ temp: number; condition: string } | null>(null);
  const periodicTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Push a new tactical toast notification
  const pushNotification = useCallback((toast: Omit<WeatherToast, 'id' | 'timestamp'>) => {
    const newToast: WeatherToast = {
      ...toast,
      id: `wtoast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setActiveToasts(prev => [newToast, ...prev].slice(0, 3)); // Max 3 toasts simultaneously
    setNotificationHistory(prev => [newToast, ...prev].slice(0, 25)); // Keep 25 in history

    // Also trigger native browser notification if granted
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        new Notification(newToast.title, {
          body: newToast.message,
          icon: '/favicon.ico',
          tag: 'vajra-weather-alert'
        });
      } catch {
        // Ignore native notification error in iframe sandboxes
      }
    }

    // Auto dismiss after 7 seconds
    setTimeout(() => {
      setActiveToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 7000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setActiveToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Request browser notification permission
  const requestBrowserNotifications = useCallback(async (): Promise<boolean> => {
    if (typeof Notification === 'undefined') return false;
    try {
      const res = await Notification.requestPermission();
      setBrowserNotificationPermission(res);
      return res === 'granted';
    } catch {
      return false;
    }
  }, []);

  // Reverse geocode latitude & longitude
  const reverseGeocode = async (lat: number, lon: number): Promise<{ name: string; shortName: string; region: string }> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: { 'User-Agent': 'VajraDefenseNetwork/2.0' },
          signal: controller.signal
        }
      );
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const address = data.address || {};
        const city = address.city || address.town || address.village || address.suburb || address.county || 'Detected Post';
        const state = address.state || address.state_district || address.country || 'Bharat';
        return {
          name: `${city}, ${state}`,
          shortName: city,
          region: state
        };
      }
    } catch {
      // Fallback below
    }

    // Fallback format
    const latStr = `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}`;
    const lonStr = `${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? 'E' : 'W'}`;
    return {
      name: `GPS Sector (${latStr}, ${lonStr})`,
      shortName: 'Live Grid',
      region: 'Active GPS'
    };
  };

  // Fetch accurate live weather from Open-Meteo
  const fetchWeather = useCallback(async (lat: number, lon: number, locationNameStr?: string) => {
    setWeather(prev => ({ ...prev, isLoading: true }));
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Weather API returned ${res.status}`);
      const data = await res.json();

      const cur = data.current || {};
      const temp = Math.round(cur.temperature_2m ?? 22);
      const humidity = Math.round(cur.relative_humidity_2m ?? 50);
      const windSpeed = Math.round(cur.wind_speed_10m ?? 12);
      const windDirection = Math.round(cur.wind_direction_10m ?? 240);
      const pressure = Math.round(cur.surface_pressure ?? 1013);
      const precipitation = cur.precipitation ?? 0;
      const code = cur.weather_code ?? 0;

      const { condition, advisories, visibility } = mapWmoCodeToCondition(code, windSpeed, temp);

      setWeather({
        temperature: temp,
        condition,
        weatherCode: code,
        humidity,
        windSpeed,
        windDirection,
        visibility,
        pressure,
        precipitation,
        advisories,
        lastUpdated: new Date(),
        isLoading: false
      });

      // Check if weather significantly shifted or first notification
      const locLabel = locationNameStr || location.name;
      const last = lastNotifiedWeatherRef.current;
      if (!last || Math.abs(last.temp - temp) >= 3 || last.condition !== condition) {
        lastNotifiedWeatherRef.current = { temp, condition };
        if (notificationsEnabled) {
          pushNotification({
            title: `WEATHER INTEL UPDATE • ${locLabel.toUpperCase()}`,
            message: `Current: ${temp}°C, ${condition}. Wind: ${windSpeed} km/h, Humidity: ${humidity}%, Visibility: ${visibility} km.`,
            type: advisories.some(a => a.severity === 'high') ? 'warning' : 'weather',
            severity: advisories.some(a => a.severity === 'high') ? 'critical' : 'normal'
          });
        }
      }
    } catch {
      // Fallback with realistic tactical values
      setWeather(prev => ({
        ...prev,
        isLoading: false,
        lastUpdated: new Date()
      }));
    }
  }, [location.name, notificationsEnabled, pushNotification]);

  // Request user's live device location
  const requestLiveLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        status: 'error',
        error: 'Geolocation is not supported by this browser.'
      }));
      return;
    }

    setLocation(prev => ({ ...prev, status: 'acquiring', error: null }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        const geo = await reverseGeocode(latitude, longitude);

        setLocation({
          name: geo.name,
          shortName: geo.shortName,
          stateOrRegion: geo.region,
          latitude,
          longitude,
          isLiveGps: true,
          accuracy: Math.round(accuracy),
          status: 'locked',
          error: null
        });

        pushNotification({
          title: 'LIVE GPS LOCATION LOCKED',
          message: `Position established at ${geo.name} (±${Math.round(accuracy)}m). Synchronizing real-time meteorological feed...`,
          type: 'gps',
          severity: 'normal'
        });

        // Immediately fetch weather for this live coordinate
        fetchWeather(latitude, longitude, geo.name);
      },
      (err) => {
        let msg = 'Unable to acquire GPS signal.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission denied by user.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'GPS signal unavailable. Using tactical border default.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'GPS acquisition timed out.';
        }

        setLocation(prev => ({
          ...prev,
          status: err.code === err.PERMISSION_DENIED ? 'denied' : 'error',
          error: msg
        }));

        pushNotification({
          title: 'GPS ACQUISITION NOTICE',
          message: `${msg} Active sector remains ${location.name}.`,
          type: 'warning',
          severity: 'caution'
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000
      }
    );
  }, [fetchWeather, pushNotification]);

  // Select a tactical preset sector
  const selectPresetSector = useCallback((sectorId: string) => {
    const found = PRESET_SECTORS.find(s => s.id === sectorId);
    if (!found) return;

    setLocation({
      name: found.name,
      shortName: found.shortName,
      stateOrRegion: found.region,
      latitude: found.latitude,
      longitude: found.longitude,
      isLiveGps: false,
      accuracy: null,
      status: 'locked',
      error: null
    });

    pushNotification({
      title: `SECTOR CHANGED • ${found.name.toUpperCase()}`,
      message: `${found.description}. Re-routing satellite radar intelligence...`,
      type: 'advisory',
      severity: 'normal'
    });

    fetchWeather(found.latitude, found.longitude, found.name);
  }, [fetchWeather, pushNotification]);

  // Manual weather refresh
  const refreshWeather = useCallback(async () => {
    await fetchWeather(location.latitude, location.longitude, location.name);
  }, [fetchWeather, location.latitude, location.longitude, location.name]);

  // Trigger test notification on user request
  const triggerTestNotification = useCallback(() => {
    pushNotification({
      title: `TACTICAL WEATHER INTEL • ${location.name.toUpperCase()}`,
      message: `Simulated Alert: Temperature ${weather.temperature}°C, Wind ${weather.windSpeed} km/h (${weather.condition}). Radar & Optoelectronic sensors nominal.`,
      type: 'weather',
      severity: 'normal'
    });
  }, [location.name, pushNotification, weather.condition, weather.temperature, weather.windSpeed]);

  // Periodic weather check and notification generator
  useEffect(() => {
    if (!notificationsEnabled) {
      if (periodicTimerRef.current) clearInterval(periodicTimerRef.current);
      return;
    }

    periodicTimerRef.current = setInterval(() => {
      // Re-fetch weather
      fetchWeather(location.latitude, location.longitude, location.name);
    }, Math.max(30, notificationIntervalSec) * 1000);

    return () => {
      if (periodicTimerRef.current) clearInterval(periodicTimerRef.current);
    };
  }, [fetchWeather, location.latitude, location.longitude, location.name, notificationIntervalSec, notificationsEnabled]);

  // Auto-attempt live GPS immediately on initial load, with seamless IP location detection
  useEffect(() => {
    let isMounted = true;

    // Fast IP-based initial location lookup so user's real city is resolved immediately
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(ipData => {
        if (!isMounted) return;
        if (ipData && typeof ipData.latitude === 'number' && typeof ipData.longitude === 'number') {
          const cityName = ipData.city || 'Live Location';
          const regionName = ipData.region || ipData.country_name || 'Operational Sector';
          const fullName = `${cityName}, ${regionName}`;
          
          setLocation(prev => {
            // Only update if not already locked by high-accuracy GPS
            if (prev.status === 'locked' && prev.accuracy !== null) return prev;
            return {
              name: fullName,
              shortName: cityName,
              stateOrRegion: regionName,
              latitude: ipData.latitude,
              longitude: ipData.longitude,
              isLiveGps: true,
              accuracy: 2500,
              status: 'locked',
              error: null
            };
          });

          fetchWeather(ipData.latitude, ipData.longitude, fullName);
        }
      })
      .catch(() => {
        // If IP service unreachable, fetch with default theater coordinates
        if (isMounted) {
          fetchWeather(28.6139, 77.2090, 'HQ Operational Grid');
        }
      });

    // Request high-precision device GPS
    if (navigator.geolocation) {
      requestLiveLocation();
    }

    return () => {
      isMounted = false;
    };
  }, [fetchWeather, requestLiveLocation]);

  return (
    <WeatherLocationContext.Provider
      value={{
        location,
        weather,
        notificationsEnabled,
        notificationIntervalSec,
        activeToasts,
        notificationHistory,
        browserNotificationPermission,
        requestLiveLocation,
        selectPresetSector,
        refreshWeather,
        setNotificationsEnabled,
        setNotificationIntervalSec,
        requestBrowserNotifications,
        dismissToast,
        triggerTestNotification
      }}
    >
      {children}
    </WeatherLocationContext.Provider>
  );
};

export const useWeatherLocation = (): WeatherLocationContextType => {
  const ctx = useContext(WeatherLocationContext);
  if (!ctx) {
    throw new Error('useWeatherLocation must be used within a WeatherLocationProvider');
  }
  return ctx;
};
