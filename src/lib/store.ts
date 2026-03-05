import { create } from "zustand";

export interface DotEvent {
  id: string;
  timestamp: number;
  latencyMs: number;
  category: "highlight" | "score" | "foul";
}

export interface Clip {
  dotId: string;
  startTime: number;
  endTime: number;
  duration: number;
}

export interface Pulse {
  id: string;
  x: number;
  y: number;
  createdAt: number;
}

interface SimulatorState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  dots: DotEvent[];
  clipWindowM: number;
  clipWindowN: number;
  activePulses: Pulse[];

  play: () => void;
  pause: () => void;
  tick: (dt: number) => void;
  addDot: () => void;
  addPulse: (x: number, y: number) => void;
  cleanPulses: () => void;
  reset: () => void;
}

let dotIdCounter = 0;

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  isPlaying: true,
  currentTime: 0,
  duration: 60,
  dots: [],
  clipWindowM: 10,
  clipWindowN: 2,
  activePulses: [],

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  tick: (dt: number) => {
    const { isPlaying, currentTime, duration } = get();
    if (!isPlaying) return;
    const next = currentTime + dt;
    set({ currentTime: next > duration ? 0 : next });
  },

  addDot: () => {
    const { currentTime, clipWindowM, clipWindowN } = get();
    const id = `dot-${++dotIdCounter}`;
    const latencyMs = 5 + Math.random() * 3; // 5-8ms
    const dot: DotEvent = {
      id,
      timestamp: currentTime,
      latencyMs,
      category: ["highlight", "score", "foul"][
        Math.floor(Math.random() * 3)
      ] as DotEvent["category"],
    };
    set((s) => ({
      dots: [...s.dots, dot],
    }));
  },

  addPulse: (x: number, y: number) => {
    const id = `pulse-${Date.now()}-${Math.random()}`;
    set((s) => ({
      activePulses: [...s.activePulses, { id, x, y, createdAt: Date.now() }],
    }));
  },

  cleanPulses: () => {
    const now = Date.now();
    set((s) => ({
      activePulses: s.activePulses.filter((p) => now - p.createdAt < 1000),
    }));
  },

  reset: () =>
    set({
      currentTime: 0,
      dots: [],
      activePulses: [],
      isPlaying: true,
    }),
}));
