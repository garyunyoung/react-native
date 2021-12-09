import { GOOGLE_API_KEY } from '@env'

export const API_KEY = GOOGLE_API_KEY
export const ANDROID = 'android'
export const LOCATIONS_MAX = 5
export const LOCATIONS_MIN = 2
export const LATITUDE_DELTA = 0.0922
export const LONGITUDE_DELTA = 0.0421
export const SEARCH_RESULTS_LANGUAGE = 'en'
export const SEARCH_RESULTS_REGION = 'country:nz'

// Auckland Map Region
export const DEFAULT_MAP_REGION = {
  latitude: -36.848461,
  longitude: 174.763336,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}
