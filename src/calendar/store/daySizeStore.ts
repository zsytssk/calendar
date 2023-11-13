import create from 'zustand';

export type Size = {
  height?: number;
  width?: number;
};
type State = {
  height?: number;
  width?: number;
  setSize(size: Size): void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useDaySizeStore = create<State>((set, get) => ({
  height: undefined,
  width: undefined,
  setSize: (size) => {
    set({
      ...size,
    });
  },
}));
