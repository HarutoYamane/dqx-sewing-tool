import { create } from 'zustand';

interface StrengthFilterStore {
  strengthFilter: string[];
  addStrengthFilter: (strengthFilter: string) => void;
  removeStrengthFilter: (strengthFilter: string) => void;
}

interface BastingModeStore {
  bastingMode: boolean;
  setBastingMode: (bastingMode: boolean) => void;
}

export const useStrengthFilterStore = create<StrengthFilterStore>((set) => ({
  strengthFilter: ['弱い', '普通', '強い', '最強'],
  addStrengthFilter: (strengthFilter) =>
    set((state) => ({ strengthFilter: [...state.strengthFilter, strengthFilter] })),
  removeStrengthFilter: (strengthFilter) =>
    set((state) => ({ strengthFilter: state.strengthFilter.filter((f) => f !== strengthFilter) })),
}));

export const useBastingModeStore = create<BastingModeStore>((set) => ({
  bastingMode: false,
  setBastingMode: (bastingMode: boolean) => set({ bastingMode }),
}));
