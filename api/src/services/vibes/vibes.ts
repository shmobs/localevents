import { QueryResolvers, Event } from 'types/graphql'

import { generateAndStoreVibes, retrieveVibes } from './vibeUtils'

export const getPlaceVibes: QueryResolvers['getPlaceVibes'] = async ({
  locationId,
  vibeCount = 3 as number,
}): Promise<Event[]> => {
  const existingVibes = await retrieveVibes({
    locationId,
    vibeCount: vibeCount as number, // idk why this is necessary
  })

  if (existingVibes) {
    return existingVibes
  }

  // if this place doesn't have enough vibes, generate some and store them in the database, then return them
  await generateAndStoreVibes({ locationId, vibeCount: vibeCount as number })

  const vibesToReturn = await retrieveVibes({
    locationId,
    vibeCount: vibeCount as number, // idk why this is necessary
  })

  // if we still don't have enough vibes, return an empty array (this should never happen)
  if (!vibesToReturn) {
    console.log(
      'ERROR: generateAndStoreVibes failed to generate enough vibes, for some reason'
    )
    return []
  }

  return vibesToReturn
}
