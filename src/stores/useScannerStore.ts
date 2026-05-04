import { create } from 'zustand';

interface ScannerState {
  isScannerOpen: boolean;
  openScanner: () => void;
  closeScanner: () => void;
}

export const useScannerStore = create<ScannerState>((set) => ({
  isScannerOpen: false,
  openScanner: () => set({ isScannerOpen: true }),
  closeScanner: () => set({ isScannerOpen: false }),
}));