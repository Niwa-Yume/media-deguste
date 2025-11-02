declare module 'lenis' {
  export default class Lenis {
    constructor(options?: { duration?: number; smoothWheel?: boolean; smoothTouch?: boolean });
    raf(time: number): void;
    destroy(): void;
  }
}
