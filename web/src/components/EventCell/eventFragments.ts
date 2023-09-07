export const EVENT_SHORT_INFO_FRAGMENT = gql`
  fragment EventShortInfo on Event {
    id
    name
    description
    type
    status
    isCurrentUserInterested
    interestCount
  }
`
