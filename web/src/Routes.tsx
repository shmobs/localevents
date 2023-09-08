// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import SiteLayout from './layouts/SiteLayout/SiteLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={SiteLayout}>
        <Route path="/sign-in-sign-up" page={AuthPage} name="auth" />
        <Route path="/event/{id}" page={EventPage} name="event" />
        <Route path="/business/{id}" page={BusinessPage} name="business" />
        <Route path="/my-events" page={MyEventsPage} name="myEvents" />
        <Route path="/privacy" page={PrivacyPage} name="privacy" />
        <Route notfound page={NotFoundPage} />
      </Set>
      <Set wrap={SiteLayout} withoutPadding>
        <Route path="/" page={SearchNearbyPage} name="home" />
        <Route path="/location/{id}" page={LocationPage} name="location" />
        <Route path="/text-search" page={TextSearchPage} name="searchForVenue" />
        <Route path="/text-search/{searchQuery}" page={TextSearchPage} name="searchForVenueWithQuery" />
      </Set>
    </Router>
  )
}

export default Routes
