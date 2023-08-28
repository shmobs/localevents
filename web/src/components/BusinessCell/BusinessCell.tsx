import type {
  FindBusinessQuery,
  FindBusinessQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Business from '../Business'

export const QUERY = gql`
  query FindBusinessQuery($id: String!) {
    business: business(id: $id) {
      id
      name
      description
      locations {
        id
        address
        latitude
        longitude
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBusinessQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  business,
}: CellSuccessProps<FindBusinessQuery, FindBusinessQueryVariables>) => {
  return <Business business={business} />
}
