function optimizerFlow() {}

const PHILOSOPHY = `
  We want to lean towards providing users with the least amount of options possible.
    guide the users towards making the right decision and provide them less freedom than they think they want.

  The site should be opinionated about the process users take to build their lineups while still allowing users personality to effect the lineups

  The site should (in future) learn from users and not only optimize for optimal strategy but also for user happiness

  building lineups on fantasystacks should make users feel confident about their choices (or alternatively feel like they didn't make/have a choice)

  We want to force users to make good decisioins and provide them all the information they need to make them when they need to make them

  We want to warn the user before they do anything that can ruin their daily fantasy exzperience

  Users love data. we want to provide plenty of data to look at while providing the minimum levers to pull while building lineups

  The most common question people have is comparing two v twos, looking at chalk,  and looking at contrarian plays.  We need to encourage users to do this themselves with our interface.

  We want to maintain the fun of lineup tinkering while working with many lineups.  We want building 20+ lineups to feel as close to as fun as tinkering with 1 lineup.

  We want to optimize for Single Lineups, less than 10 lineups, and many lineups

  We want to make it easy to play both cash and gpps at same time without user having to add a bunch of lineup managing overhead

  Users should be able to build competitive lineups without visiting another site

  Building lineups IS the fun part of daily fantasy.  We don't want to make it fast.  We want to make the boring and tedious parts fast, (as well as reacting to late news)
  but we want to encourage users to take their time on the fun parts of building lineups
`

const MVP = `
  to start we build an nba only optimizer with the following features:

    1. A Fast Optimizer in typescript
    2. The ability to edit projections
    3. Default projections delivered from backend
    4. The ability to save projections
    5. The ability to download projections to csv
`

const optimizerPlans = `
  Ability to limit players
  Ability to limit max percentages of players
  Ability to group players
  Run Optimizer in a service worker
  Run OPtimizer in multiple threads
  Port optimizer to web assembly
  If needed a genetic algorithm that kicks in when user needs lineup to finish quicker or user is on a slow device
`

const projectionPlans = `
  ability to adjust projections via minutes usage pace and other levers

  create a more powerful experience that asks the user the correct questions to adjust projecjions

  auto detect names and column headings to make uploading projections from any main source people would do it from work
`

const pushNotificationPlans = `
  send push notifications for prelock and injury situations
  use user data (maybe twitter data if legal) to predict when a player might be out without having to manually update with the news
`

const lineupBuilderPlans = `
  auto make suggestions for manually building lineups
  show optimal lineup as user builds (optimal in terms of best rest of team to pick)
  we should not allow users to dupe on accident so any lineup when built should be hashed to see if it has already been built
`

const lineupManagerPlans = `
  will need to spec out in more detail the best way to allow users to manage their lineups
`

const mobilePlans = `
  for full features the app is meant to be used as a progressive web app
  it should have really solid offline support
  we should be able to optimize for our users on the backend if their device is too slow (might be every device) if not too expensive
`

const lineupAnalyzerSupport = `
  Allow users to view data on the lineup such percentile predictions, foul trouble and overtime chances, ect.
`

const projections = `
  the generation of base projections should always remain private and proprietary but the user projections should be transparent
`

const offlineSupport = `
  the app should work completely offline (expecially on mobile) and sync with backend whenever it is offline.  In general though users should be able to tinker with lineups compeltely locally on their machine
  This will require a sync mechanism for keeping the client up to date with backend and users other devices
`

const styling = `
  the styling should be simple and intuitive.  The goal is to get out of the users way and allow them to play daily fantasy without noticing us.
`

const techStack = `
  Anything in fantasystacks will be built in Typescript first.
  To save money we will want our backend to be serverless but first it will be a typescript express app
  Front end will be built with an eye on being a progressive web app
`

const premiumPlan = `
  we might be able to optimize on behalf of users on backend for faster results
  we might be able to provide something that is kinda like insurance for users in case of late scratches (if legal (likely not legal))
  we might be able to offer ownership predictions
`

const trackingService = `
  long term plan is to make it easy to track winnings
`
