import create from "zustand";

const useStore = create((set) => ({
  isUpdated: false,
  departments: [
    "Yok",
    "NRD03",
    "NRD12",
    "NRD15",
    "NRD17",
    "NRD21",
    "NRD22",
    "NRD23",
    "NRD0101",
    "NRD0201",
  ],
  setDepartment: (department) => (localStorage.setItem("department",department)),
  toggleUpdate: () => set((state) => ({ isUpdated: !state.isUpdated })),
}));

export default useStore;
