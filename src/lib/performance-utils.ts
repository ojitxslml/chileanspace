
export type QualityTier = 'low' | 'medium' | 'high';

export interface QualitySettings {
  tier: QualityTier;
  pixelRatio: number;
  particleCount: number;
  shadows: boolean;
  shadowMapSize: number;
  fxaa: boolean;
}

export const getPerformanceTier = (): QualityTier => {
  if (typeof window === 'undefined') return 'high';

  // simplistic detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const concurrency = navigator.hardwareConcurrency || 4;
  
  // @ts-ignore - memory might not exist on refined types
  const memory = (navigator as any).deviceMemory || 8;

  if (isMobile) {
    if (memory <= 4 || concurrency <= 4) return 'low';
    return 'medium';
  }

  // Desktop low end
  if (concurrency <= 4) return 'medium';

  return 'high';
};

export const getQualitySettings = (tier: QualityTier): QualitySettings => {
  switch (tier) {
    case 'low':
      return {
        tier,
        pixelRatio: Math.min(window.devicePixelRatio, 1), // Cap at 1x
        particleCount: 5000, // Drastically reduced from 200k
        shadows: false, // No shadows
        shadowMapSize: 0,
        fxaa: false,
      };
    case 'medium':
      return {
        tier,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5), // Cap at 1.5x
        particleCount: 50000, 
        shadows: true,
        shadowMapSize: 1024, // Smaller shadow map
        fxaa: false,
      };
    case 'high':
    default:
      return {
        tier,
        pixelRatio: Math.min(window.devicePixelRatio, 2), // Cap at 2x
        particleCount: 200000, 
        shadows: true,
        shadowMapSize: 2048,
        fxaa: true,
      };
  }
};
