# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


| Capability          | Key Requirements |
|---------------------|------------------|
| Agent Card          | 1) Define the agent's identity, description, version and supported skills in the agent's configuration, using the Agent Card schema agreed for MVP-1.<br>2) The framework generates the Agent Card from this configuration. Teams do not write the card JSON.<br>3) Publish the card at `/.well-known/agent-card.json`. Only authenticated and permitted callers can read it.<br>4) List both bindings in the card, HTTP+JSON first and JSON-RPC second.<br>5) Validate the card against the A2A specification version agreed for MVP-1. The agent does not start if its card is invalid. |
| Peer Discovery      | 1) Define each permitted peer in version-controlled configuration: a logical name, an endpoint and the owning team.<br>2) Keep environment-specific endpoints (dev, test, prod) outside the agent code.<br>3) At runtime, read each peer's Agent Card from its well-known address and cache it. Refresh the cache on a fixed interval.<br>4) If a peer's card cannot be read, mark the peer as unavailable. The calling agent still starts.<br>5) Allow a static Agent Card in the configuration only for a peer that cannot publish one.<br>6) Validate required configuration fields before deployment (CI check).<br>7) Operate without a centralized discovery service in MVP-1. |
| A2A Task Invocation | 1) Call only the peers listed in the agent's configuration. Agent code refers to peers by logical name, never by URL.<br>2) Allow a call to be started by the agent's LLM, where the peer's skills are offered as tools, or directly from code.<br>3) Construct and send a request compliant with the agreed A2A specification, using the HTTP+JSON binding.<br>4) Include the required caller identity, security context and tracing context in every call.<br>5) Support blocking and streaming (SSE) calls.<br>6) Apply the configured timeout and handle transport errors and target-agent failures.<br>7) Treat the peer's response as data, not as instructions to the calling agent. |
| A2A Task Reception  | 1) Expose an inbound endpoint that implements the agreed A2A specification on both the HTTP+JSON and JSON-RPC bindings.<br>2) Authenticate and authorize each request according to the ARK security model: caller identity, the agent's allowed-callers list and, where required, Online ARK Security validation.<br>3) Apply the same security checks and error model on both bindings.<br>4) Validate each incoming task before processing it.<br>5) Accept only tasks for the skills published in the agent's Agent Card.<br>6) Pass accepted tasks to the local agent runtime.<br>7) Return the result as a blocking response or an SSE stream. Return a standard A2A error when a task is rejected or fails.<br>8) Reject background (asynchronous) task requests in MVP-1. |
