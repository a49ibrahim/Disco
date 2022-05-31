# Disco Full-Stack Take-Home Exercise

## What Would I change If I had more Time
    ## I list these in bullet points but can go into more depth over a call

1. I would add more error handling. I would add error handling based on weather the DID saved or not and error handling for loading profiles
2. I would try to have more separation of corncerns in the comnponents themselves and between the back end and the Front end. I deally I would
want the back end to act like and api and send the expected data to the frontend components but they are currently closely coupled for my liking.
3. I know design is not part of this but I feel like the User experience on the front end is lacking and should be more explict and intentional in the 
language and perhaps add more pop up boxes and heading/tags to make it more clear what the Use is doing
4. These are each huge groups that I could dive into long conversations about
## Introduction

This exercise will be to implement APIs that help aggregate profile data saved to Ceramic (a decentralized storage network), integrate these APIs into frontend components, and consider the architectural implications of your solution.

We hope you can spend roughly 2 hours on this exercise. Please do not spend more than 3! If you end up needing more time, please stop working and document any extra work you would do to complete it. An incomplete or stubbed-out submission is okay; the only requirement is that everything runs without error.

We are looking for a submission that is clear, readable, maintainable, and performant.

Why a take-home exercise? We want something that reflects how engineers work in practice, without the pressure of live coding, and with the freedom to look things up, take a break, or rewrite parts. We also want you to have the opportunity to see and use some of the technology we work with at Disco. This repo is a toy example using some of that technology.

## Requirements

- Knowledge of Node.js, React, and TypeScript
- Node and Yarn installed (this repo was built and tested with Node v16.14.0 and Yarn v1.22.18)
- The [MetaMask browser extension](https://metamask.io/download/) installed and set up

Please let us know if there are any technical issues with the assignment (e.g. bugs or build or environment issues).

Also, please let us know if you prefer to complete this exercise in JavaScript instead of TypeScript and we'll whip up a JS version.

## Background

This exercise concerns [Decentralized Identifiers](https://www.w3.org/TR/did-core/) (DIDs) - globally unique identifiers that reference accounts that a users can control for various purposes. The use-case at hand is storing user profile data (name, bio, etc) on [Ceramic](https://ceramic.network/) (a decentralized storage network built on [IPFS](https://ipfs.io/)) and registering the user's DID as a new Disco user.

Profile data is stored on Ceramic so that other apps can independently retrieve profile data for a given user's DID: this means you can essentially take your username to a new service and your stuff will already be there.

Ceramic does not meet all of our needs however, since there is no way to search Ceramic and find all users, but we would like to be able to list all Disco users. For that reason, you will be implementing the saving of user DIDs to the Disco API so that we are able to list and search through Disco users.

## This Repo

Please fork this repo, and then to begin simply run:

```bash
yarn install
yarn bootstrap

yarn start:frontend

# in a separate terminal:
yarn start:backend
```

This will run both the backend server and Storybook for frontend components. Both will live reload on code changes.

This is a [Lerna](https://lerna.js.org/) monorepo with the following two packages:

- [`packages/frontend/`](packages/frontend/) - Frontend codebase
- [`packages/backend/`](packages/backend/) - Backend codebase

### Frontend

Please browse Storybook (http://localhost:9009/) to see and try out the various components. You will be working with the ones in the Profiles folder.

All of the UI has been implemented - you will be integrating API calls (using [`ApiService`](packages/frontend/src/utils/ApiService.ts)) into the following two components:

- [`ProfileEdit`](packages/frontend/src/components/profile/ProfileEdit.tsx) - this lets a user edit their profile. You will be integrating an API call to update the backend about the user's DID
- [`ProfilesList`](packages/frontend/src/components/profile/ProfilesList.tsx) - this lists multiple profiles according to their DIDs. You will be integrating an API call to fetch which DIDs to display.

Feel free to use any of the other components in this repo, all of which have Storybook files (`*.stories.tsx`) demonstrating their usage.

### Backend

This server is based on [Ts.ED framework](https://tsed.io).

Begin by reading through [`DidController`](packages/backend/src/controllers/DidController.ts) and [`DidService`](packages/backend/src/services/DidService.ts) in order to understand the API.

Example API calls:

- http://localhost:8083/v1/did/getProfileViaDid/did:3:kjzl6cwe1jw1466t7qwr0yk4jscjqhy4y7iq7z3om5hyx7dd6xc71yr751vwunw
- http://localhost:8083/v1/did/getAllProfiles

There are two stubbed out API endpoints in [`DidController`](packages/backend/src/controllers/DidController.ts): `registerDid` and `getAllProfiles`. You will be implementing these endpoints using the [`DidService`](packages/backend/src/services/DidService.ts) ORM and the [`getProfileFromCeramic`](packages/backend/src/common/ceramic-util.ts) helper.

You can look at other endpoints in `DidController` to see example calls that use `DidService` and `getProfileFromCeramic`.

## Instructions

The exercise is complete when the following UX flow is functional.

1. Navigate to the ProfileEdit component in Storybook, log in with MetaMask, and save some profile data
2. Add a new account to your MetaMask if you don't already have more than one
    - To do this, open the extension, click the colorful icon in the top right, click "+ Create Account"
3. Repeat step #1 with your new MetaMask account and different profile data
    - You can do this in an incognito window (to do this in Chrome you will have to go to your extensions, select MetaMask, and check "Allow in Incognito") or by refreshing Storybook, opening MetaMask, and connecting to your other account
4. Navigate to the ProfilesList component in Storybook, and, once you have completed this exercise, the profiles you created in steps #1 and #3 should be visible

There are multiple ways to architect this. On the frontend it will involve:

- Registering the user's DID to the API from the [`ProfileEdit`](packages/frontend/src/components/profile/ProfileEdit.tsx) component
- Fetching from the API in the [`ProfilesList`](packages/frontend/src/components/profile/ProfilesList.tsx) component and displaying profiles using the [`ProfileView`](packages/frontend/src/components/profile/ProfileView.tsx) or [`ProfileLoader`](packages/frontend/src/components/profile/ProfileLoader.tsx) components

On the backend it will involve using and implementing some combination of the following endpoints in [`DidController`](packages/backend/src/controllers/DidController.ts):

- `registerDid`
- `getAllProfiles`
- `getAllDids`

### Architectural Considerations

Please consider how your solution distributes the work of loading data between the frontend and backend, and any trade-offs in the decisions you made. Are there any ways that you would update this architecture to be more performant or to better support future use-cases that rely on this data?

## Submission

Please fork this repo, commit your implementation, and email us a link at careers@disco.xyz. Feel free to include any notes for us about assumptions or decisions you made, and we also welcome any feedback about this exercise!

## Notes

- There is no need to spend time on any design or UI elements - concept and functionality are what matters
- You may make any changes to this repo whatsoever in order to support your solution
- Feel free to ask any clarifying questions about the assignment. However, you have leeway in how you wish to implement this as long as the UX flow outlined above works, and can make arbitrary decisions and assumptions. If you do, note them down and let us know!
