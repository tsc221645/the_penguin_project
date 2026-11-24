export interface IucnCategory { code: string; name: string; description: string; threatened: boolean }

// Plain-language summaries of the official global IUCN Red List categories.
export const iucnCategories: IucnCategory[] = [
  { code: 'NE', name: 'Not Evaluated', description: 'The species has not yet been assessed against the IUCN Red List criteria.', threatened: false },
  { code: 'DD', name: 'Data Deficient', description: 'Available information is not sufficient to assess extinction risk from distribution or population evidence.', threatened: false },
  { code: 'LC', name: 'Least Concern', description: 'The species has been assessed and does not qualify for Near Threatened or a threatened category.', threatened: false },
  { code: 'NT', name: 'Near Threatened', description: 'The species is close to qualifying for a threatened category or may qualify in the near future.', threatened: false },
  { code: 'VU', name: 'Vulnerable', description: 'The species faces a high risk of extinction in the wild.', threatened: true },
  { code: 'EN', name: 'Endangered', description: 'The species faces a very high risk of extinction in the wild.', threatened: true },
  { code: 'CR', name: 'Critically Endangered', description: 'The species faces an extremely high risk of extinction in the wild.', threatened: true },
  { code: 'EW', name: 'Extinct in the Wild', description: 'The species survives only in captivity, cultivation, or outside its known historical range.', threatened: false },
  { code: 'EX', name: 'Extinct', description: 'There is no reasonable doubt that the last individual of the species has died.', threatened: false },
]
