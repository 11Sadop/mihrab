import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Compass, MapPin, RotateCw } from "lucide-react";

export default function Qibla() {
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState(false); 
    const [noCompass, setNoCompass] = useState(false);
  const headingRef = useRef(0);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  
  // Add smoothing to heading to make it feel premium and precise
  const [smoothedHeading, setSmoothedHeading] = useState<number>(0);
  
  useEffect(() => {
    let animationFrameId: number;
    const smoothFactor = 0.15; // Lower is smoother but slower
    
    const animate = () => {
      setSmoothedHeading(prev => {
        // Handle the 360 wrap-around
        let diff = deviceHeading - prev;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        
        let next = prev + diff * smoothFactor;
        next = (next + 360) % 360;
        return next;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [deviceHeading]);
  
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  const calculateQiblaDirection = (lat: number, lng: number) => {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
    const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

    const y = Math.sin(kaabaLngRad - lngRad);
    const x =
      Math.cos(latRad) * Math.tan(kaabaLatRad) -
      Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad);

    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    qibla = (qibla + 360) % 360;

    return qibla;
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("الموقع غير مدعوم في هذا المتصفح");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const direction = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(direction);
        setError(null);
      },
      (err) => {
        setError("يرجى السماح بالوصول للموقع");
      }
    );
  };

  const requestCompass = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === "granted") {
          setPermissionGranted(true);
        }
      } catch (err) {
        setError("يرجى السماح بالوصول للبوصلة");
      }
    } else {
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    let hasAbsoluteOrientation = false;
    
    const handleAbsoluteOrientation = (event: DeviceOrientationEvent) => {
      hasAbsoluteOrientation = true;
      if (event.alpha !== null) {
        let heading = 360 - event.alpha;
        heading = (heading + 360) % 360;
        setDeviceHeading(heading);
        headingRef.current = heading;
      }
    };
    
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (hasAbsoluteOrientation) return;
      
      if (event.alpha !== null) {
        let heading: number;
        if ((event as any).webkitCompassHeading !== undefined) {
          heading = (event as any).webkitCompassHeading;
        } else {
          heading = 360 - event.alpha;
          heading = (heading + 360) % 360;
        }
        headingRef.current = heading;
        setDeviceHeading(heading);
      }
    };

    if (permissionGranted) {
      window.addEventListener("deviceorientationabsolute", handleAbsoluteOrientation as any, true);
      window.addEventListener("deviceorientation", handleOrientation, true);
      // Check for compass data after 3 seconds - if still 0, device has no compass
setTimeout(() => { if (headingRef.current === 0) setNoCompass(true); }, 3000);
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleAbsoluteOrientation as any, true);
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [permissionGranted]);

  useEffect(() => {
    requestLocation();
    // Auto-enable compass on Android (no permission API)
  
  }, []);

  const qiblaRotation = qiblaDirection !== null ? qiblaDirection - smoothedHeading : 0;
  const normalizedRotation = ((qiblaRotation % 360) + 360) % 360;
  const isAligned = normalizedRotation < 15 || normalizedRotation > 345;

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background to-secondary/20">
      <Header title="اتجاه القبلة" showBack />
{noCompass && (
  <div style={{background: '#fff3cd', padding: '20px', margin: '16px', borderRadius: '12px', textAlign: 'center', direction: 'rtl'}}>
    <p style={{fontSize: '18px', fontWeight: 'bold', color: '#856404', margin: '0 0 10px 0'}}>⚠️ جهازك لا يدعم البوصلة الحية</p>
    <p style={{margin: '0 0 15px 0'}}>اتجاه القبلة من موقعك: <strong style={{fontSize: '24px'}}>{Math.round(qiblaDirection || 0)}°</strong> من الشمال</p>
    <a href="https://www.google.com/maps/dir/?api=1&destination=21.4225,39.8262" target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', padding: '12px 24px', background: '#4285f4', color: 'white', borderRadius: '8px', textDecoration: 'none'}}>🗺️ افتح في خرائط قوقل</a>
  </div>
)}
      <main className="container max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 space-y-6 pt-4">
        <Card className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold">بوصلة القبلة</h2>
            <p className="text-sm text-muted-foreground">
              اتجاه القبلة نحو الكعبة المشرفة
            </p>
          </div>

          {error ? (
            <div className="text-center space-y-4">
              <p className="text-red-500 text-sm">{error}</p>
              <Button onClick={requestLocation} data-testid="button-retry-location">
                <RotateCw className="w-4 h-4 ml-2" />
                إعادة المحاولة
              </Button>
            </div>
          ) : qiblaDirection !== null ? (
            <div className="space-y-6">
              <div className="relative w-72 h-72 mx-auto">
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-full h-full"
                  style={{ transform: `rotate(${-smoothedHeading}deg)` }}
                >
                  <defs>
                    <linearGradient id="compassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="qiblaArrow" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <circle cx="100" cy="100" r="95" fill="url(#compassGradient)" stroke="hsl(var(--border))" strokeWidth="2" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
                  
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                    <line
                      key={angle}
                      x1="100"
                      y1="10"
                      x2="100"
                      y2={angle % 90 === 0 ? "20" : "15"}
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={angle % 90 === 0 ? "2" : "1"}
                      transform={`rotate(${angle} 100 100)`}
                      opacity={angle % 90 === 0 ? "0.8" : "0.4"}
                    />
                  ))}
                  
                  <text x="100" y="35" textAnchor="middle" className="fill-primary font-bold text-sm">N</text>
                  <text x="100" y="175" textAnchor="middle" className="fill-muted-foreground text-xs">S</text>
                  <text x="170" y="104" textAnchor="middle" className="fill-muted-foreground text-xs">E</text>
                  <text x="30" y="104" textAnchor="middle" className="fill-muted-foreground text-xs">W</text>
                  
                  <g transform={`rotate(${qiblaDirection} 100 100)`} filter="url(#glow)">
                    <path
                      d="M100 25 L104 85 L100 95 L96 85 Z"
                      fill="url(#qiblaArrow)"
                    />
                    <circle cx="100" cy="22" r="8" fill="hsl(var(--primary))" />
                    <rect x="96" y="18" width="8" height="8" rx="1" fill="hsl(var(--primary-foreground))" />
                  </g>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-4 h-4 rounded-full shadow-lg transition-colors duration-300 ${
                    isAligned && permissionGranted ? 'bg-green-500' : 'bg-primary'
                  }`} />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-1 h-8 bg-red-500/80 rounded-full -translate-y-4" />
                </div>
              </div>

              {permissionGranted && (
                <div className={`text-center py-3 px-4 rounded-xl transition-all duration-300 ${
                  isAligned 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {isAligned ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-medium">أنت متجه نحو القبلة</span>
                    </div>
                  ) : (
                    <span>وجّه أعلى الجهاز نحو رمز الكعبة</span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">اتجاه القبلة</p>
                  <p className="text-3xl font-bold text-primary font-mono">
                    {Math.round(qiblaDirection)}°
                  </p>
                </div>
                {permissionGranted && (
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">اتجاهك</p>
                    <p className="text-3xl font-bold font-mono">
                      {Math.round(smoothedHeading)}°
                    </p>
                  </div>
                )}
              </div>

              {!permissionGranted && (
                <Button
                  onClick={requestCompass}
                  className="w-full"
                  size="lg"
                  data-testid="button-enable-compass"
                >
                  <Compass className="w-5 h-5 ml-2" />
                  تفعيل البوصلة
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
                <MapPin className="w-8 h-8" />
              </div>
              <p className="text-muted-foreground">جاري تحديد الموقع...</p>
            </div>
          )}
        </Card>

        {location && (
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <p className="font-medium">موقعك الحالي</p>
                <p className="text-muted-foreground text-xs">
                  {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 space-y-3">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <Compass className="w-4 h-4 text-primary" />
            كيفية الاستخدام
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-right">
            <li>1. اضغط على "تفعيل البوصلة"</li>
            <li>2. وجّه أعلى الجهاز نحو رمز الكعبة (المربع)</li>
            <li>3. عندما تصبح النقطة خضراء، أنت متجه للقبلة</li>
            <li>4. ابتعد عن المعادن للحصول على قراءة دقيقة</li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
