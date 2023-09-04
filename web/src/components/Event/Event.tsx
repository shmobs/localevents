import { ArrowRight } from 'lucide-react'
import { EventQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { SimplePageHeader } from 'src/layouts/SiteLayout'
import { cn } from 'src/lib/utils'

import AddressLink from '../AddressLink'
import AuthRequiredDialog from '../AuthRequiredDialog/AuthRequiredDialog'
import MapView from '../Mapbox/Map'
import SectionHeader from '../SectionHeader'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

import { useSetEventInterestMutation } from './useSetEventInterestMutation'

interface IEventStatusBadgeProps {
  status: EventQuery['event']['status']
  interestCount: EventQuery['event']['interestCount']
}
const EventStatusBadge = ({
  status,
  interestCount,
}: IEventStatusBadgeProps) => (
  <>
    <Badge
      variant={(() => {
        switch (status) {
          case 'SUGGESTED':
            return 'indigo'
          case 'REQUESTED':
            return 'yellow'
          default:
            return 'gray'
        }
      })()}
    >
      {status.toLocaleLowerCase()}
      {status === 'REQUESTED' && ` by ${interestCount}`}
    </Badge>
  </>
)

const LocationBtn = ({
  locationId,
  className,
}: {
  locationId: string
  className?: string
}) => (
  <div
    className={cn('mt-4 flex justify-center md:mt-5 md:justify-end', className)}
  >
    <Button asChild>
      <Link to={routes.location({ id: locationId })}>
        View other events at this venue
      </Link>
    </Button>
  </div>
)

interface IEventProps {
  event: EventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  const { currentUser } = useAuth()

  const { name, type, description, location } = event

  const [isInterested, setIsInterested] = React.useState(
    event.isCurrentUserInterested
  )

  const [status, setCurrStatus] = React.useState(event.status)

  const [interestCount, setInterestCount] = React.useState(event.interestCount)

  const onSetEventInterestComplete = (interestCount: number) => {
    setInterestCount(interestCount)
    setCurrStatus(interestCount > 0 ? 'REQUESTED' : 'SUGGESTED')
    setIsInterested(!isInterested)
  }

  const { setEventInterest } = useSetEventInterestMutation({
    onSetEventInterestComplete,
  })

  return (
    <>
      <SimplePageHeader title={name} subtitle={type} />
      <div className="md:flex md:min-h-full md:gap-5">
        {/* Event info */}
        <div className="md:w-1/2">
          <div className="md:flex md:h-full md:flex-col">
            <div className="flex justify-between">
              <EventStatusBadge status={status} interestCount={interestCount} />
              {currentUser ? (
                <Button
                  onClick={() =>
                    setEventInterest({
                      eventId: event.id,
                      isInterested: !isInterested,
                    })
                  }
                  variant="outline"
                >
                  {isInterested ? 'I am not interested' : 'I am interested'}
                </Button>
              ) : (
                <AuthRequiredDialog
                  triggerBtn={
                    <Button variant="outline">
                      Create Request
                      <ArrowRight />
                    </Button>
                  }
                />
              )}
            </div>
            <SectionHeader
              title={
                <span>
                  Hosted by{' '}
                  <Link
                    to={routes.business({ id: location.business.id })}
                    className="link"
                  >
                    {location.business.name}
                  </Link>
                </span>
              }
            />
            <p className="text-base text-gray-500">{description}</p>
            <LocationBtn locationId={location.id} className="hidden md:flex" />
          </div>
        </div>
        {/* Location info */}
        <div className="md:w-1/2">
          <div className="mt-5 h-56 w-full overflow-clip rounded-md md:mt-0 md:h-96">
            <MapView
              lat={location.latitude}
              long={location.longitude}
              zoom={17}
            />
          </div>
          <AddressLink
            className="link mt-1 block text-center text-sm"
            text={location.address}
            searchStr={`${location.business.name}, ${location.address}`}
          />
          <LocationBtn locationId={location.id} className="flex md:hidden" />
        </div>
      </div>
    </>
  )
}

export default Event
