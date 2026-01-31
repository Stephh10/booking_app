"use client";

import { create } from "zustand";

export const useDemoSchedule = create<{
  date: Date | null;
  setDemoSchedule: (value: Date) => void;
}>((set) => ({
  date: null,
  setDemoSchedule: (value: Date) => set({ date: value }),
}));
