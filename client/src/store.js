import create from 'zustand';


const useStore = create((set) => ({
    isUpdated: false,
    toggleUpdate: () => set(state => ({ isUpdated: !state.isUpdated })),
}))


export default useStore;