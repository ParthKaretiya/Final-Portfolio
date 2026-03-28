export const EASE = {
  out: 'outQuart',
  expo: 'outExpo',
  back: 'outBack(1.4)',
  elastic: 'outElastic(1, 0.6)',
  inOut: 'inOutQuart',
  smooth: 'outCubic',
} as const;

export const DURATION = {
  fast: 400,
  normal: 700,
  slow: 1000,
  cinematic: 1400,
} as const;

export { prefersReducedMotion } from './anime';
