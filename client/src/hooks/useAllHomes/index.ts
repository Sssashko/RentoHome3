import { useHomesStore } from 'store'

const useAllHomes = () => {
  return useHomesStore().homes
}

export default useAllHomes
