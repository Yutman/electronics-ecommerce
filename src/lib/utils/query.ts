import queryString from 'query-string';

export type SortOption = 'featured' | 'newest' | 'price_asc' | 'price_desc';

export interface ProductFilters {
  category?: string;
  brands?: string[];
  conditions?: string[];
  cpus?: string[];
  rams?: string[];
  storages?: string[];
  screenSizes?: string[];
  simSlots?: string[];
  connectivities?: string[];
  bandColors?: string[];
  bandSizes?: string[];
  bandTypes?: string[];
  faceSizes?: string[];
  series?: string[];
  priceMin?: number;
  priceMax?: number;
  sort?: SortOption;
  page?: number;
}

export function parseQueryParams(searchParams: Record<string, string | string[] | undefined>): ProductFilters {
  const parseArray = (value: string | string[] | undefined): string[] | undefined => {
    if (!value) return undefined;
    if (Array.isArray(value)) return value.length > 0 ? value : undefined;
    return value.split(',').filter(Boolean);
  };

  const parseNumber = (value: string | string[] | undefined): number | undefined => {
    if (!value || Array.isArray(value)) return undefined;
    const num = parseInt(value, 10);
    return isNaN(num) ? undefined : num;
  };

  const parseSort = (value: string | string[] | undefined): SortOption | undefined => {
    if (!value || Array.isArray(value)) return undefined;
    const validSorts: SortOption[] = ['featured', 'newest', 'price_asc', 'price_desc'];
    return validSorts.includes(value as SortOption) ? (value as SortOption) : undefined;
  };

  return {
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    brands: parseArray(searchParams.brands),
    conditions: parseArray(searchParams.conditions),
    cpus: parseArray(searchParams.cpus),
    rams: parseArray(searchParams.rams),
    storages: parseArray(searchParams.storages),
    screenSizes: parseArray(searchParams.screen_sizes),
    simSlots: parseArray(searchParams.sim_slots),
    connectivities: parseArray(searchParams.connectivities),
    bandColors: parseArray(searchParams.band_colors),
    bandSizes: parseArray(searchParams.band_sizes),
    bandTypes: parseArray(searchParams.band_types),
    faceSizes: parseArray(searchParams.face_sizes),
    series: parseArray(searchParams.series),
    priceMin: parseNumber(searchParams.price_min),
    priceMax: parseNumber(searchParams.price_max),
    sort: parseSort(searchParams.sort),
    page: parseNumber(searchParams.page) || 1,
  };
}

export function stringifyFilters(filters: ProductFilters): string {
  const params: Record<string, string | string[] | number | undefined> = {};

  if (filters.category) params.category = filters.category;
  if (filters.brands?.length) params.brands = filters.brands.join(',');
  if (filters.conditions?.length) params.conditions = filters.conditions.join(',');
  if (filters.cpus?.length) params.cpus = filters.cpus.join(',');
  if (filters.rams?.length) params.rams = filters.rams.join(',');
  if (filters.storages?.length) params.storages = filters.storages.join(',');
  if (filters.screenSizes?.length) params.screen_sizes = filters.screenSizes.join(',');
  if (filters.simSlots?.length) params.sim_slots = filters.simSlots.join(',');
  if (filters.connectivities?.length) params.connectivities = filters.connectivities.join(',');
  if (filters.bandColors?.length) params.band_colors = filters.bandColors.join(',');
  if (filters.bandSizes?.length) params.band_sizes = filters.bandSizes.join(',');
  if (filters.bandTypes?.length) params.band_types = filters.bandTypes.join(',');
  if (filters.faceSizes?.length) params.face_sizes = filters.faceSizes.join(',');
  if (filters.series?.length) params.series = filters.series.join(',');
  if (filters.priceMin !== undefined) params.price_min = filters.priceMin;
  if (filters.priceMax !== undefined) params.price_max = filters.priceMax;
  if (filters.sort && filters.sort !== 'featured') params.sort = filters.sort;
  if (filters.page && filters.page > 1) params.page = filters.page;

  return queryString.stringify(params);
}

export function updateFilter(
  currentFilters: ProductFilters,
  key: keyof ProductFilters,
  value: string | number | string[] | undefined
): ProductFilters {
  const newFilters = { ...currentFilters };

  if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
    delete newFilters[key];
  } else {
    (newFilters as Record<string, unknown>)[key] = value;
  }

  if (key !== 'page') {
    newFilters.page = 1;
  }

  return newFilters;
}

export function toggleArrayFilter(
  currentFilters: ProductFilters,
  key: keyof ProductFilters,
  value: string
): ProductFilters {
  const currentArray = (currentFilters[key] as string[] | undefined) || [];
  const newArray = currentArray.includes(value)
    ? currentArray.filter((v) => v !== value)
    : [...currentArray, value];

  return updateFilter(currentFilters, key, newArray.length > 0 ? newArray : undefined);
}

export function updatePriceRange(
  currentFilters: ProductFilters,
  min: number | undefined,
  max: number | undefined
): ProductFilters {
  const newFilters = { ...currentFilters, page: 1 };

  if (min !== undefined && min > 0) {
    newFilters.priceMin = min;
  } else {
    delete newFilters.priceMin;
  }

  if (max !== undefined) {
    newFilters.priceMax = max;
  } else {
    delete newFilters.priceMax;
  }

  return newFilters;
}

export function clearAllFilters(currentFilters: ProductFilters): ProductFilters {
  return {
    category: currentFilters.category,
    sort: currentFilters.sort,
    page: 1,
  };
}

export function removeFilter(
  currentFilters: ProductFilters,
  key: keyof ProductFilters,
  value?: string
): ProductFilters {
  if (value && Array.isArray(currentFilters[key])) {
    return toggleArrayFilter(currentFilters, key, value);
  }
  return updateFilter(currentFilters, key, undefined);
}

export function getActiveFilterCount(filters: ProductFilters): number {
  let count = 0;

  if (filters.brands?.length) count += filters.brands.length;
  if (filters.conditions?.length) count += filters.conditions.length;
  if (filters.cpus?.length) count += filters.cpus.length;
  if (filters.rams?.length) count += filters.rams.length;
  if (filters.storages?.length) count += filters.storages.length;
  if (filters.screenSizes?.length) count += filters.screenSizes.length;
  if (filters.simSlots?.length) count += filters.simSlots.length;
  if (filters.connectivities?.length) count += filters.connectivities.length;
  if (filters.bandColors?.length) count += filters.bandColors.length;
  if (filters.bandSizes?.length) count += filters.bandSizes.length;
  if (filters.bandTypes?.length) count += filters.bandTypes.length;
  if (filters.faceSizes?.length) count += filters.faceSizes.length;
  if (filters.series?.length) count += filters.series.length;
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) count += 1;

  return count;
}

export function buildProductsUrl(filters: ProductFilters): string {
  const queryStr = stringifyFilters(filters);
  return queryStr ? `/products?${queryStr}` : '/products';
}
