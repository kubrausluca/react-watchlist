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


**In scope for MVP-1:**

- **A2A Server:** receives tasks from other agents. It returns the result directly (blocking) or as a stream (SSE).
- **A2A Client:** sends tasks to the peer agents listed in the agent's configuration.
- **Protocol bindings:** every A2A Server supports both the HTTP+JSON and JSON-RPC bindings, served by one shared request handler. The Agent Card lists HTTP+JSON first, so ARK AI clients use HTTP+JSON. Streaming uses SSE on both bindings.
- **Binding equivalence:** both bindings apply the same authentication, authorization, Online ARK Security checks and error model.
- **Agent Card publishing:** every A2A Server publishes its Agent Card at `/.well-known/agent-card.json`. The framework generates the card from the agent's configuration.
- **Configuration-based discovery:** each agent lists its peers (a logical name and an endpoint) in its Git-based configuration. The A2A Client reads each peer's Agent Card from the peer's well-known address and caches it.
- **Static Agent Card (exception only):** if a peer cannot publish a card, its card can be written in the caller's configuration.
- **Peers as LLM tools:** the framework turns peer skills into tools. The agent's LLM decides when to call a peer. Mandatory steps can still be called directly from code.
- **Access control at every agent:** caller identity check, an allowed-callers list, and Online ARK Security validation where required.
- **Agent roles:** an agent can be client-only, server-only, or both.
- **Network reach:** agents in the same or in different namespaces of the cluster.
- **Observability:** tracing and standard metrics for every A2A call, labeled by binding.

**Out of scope for MVP-1:**

- A central Agent Catalog or Agent Registry, and central, dynamic or semantic discovery and routing.
- A central A2A Gateway.
- Background (asynchronous) tasks, push notifications and persistent task storage.
- Tasks that pause for user input or extra authorization (`INPUT_REQUIRED`, `AUTH_REQUIRED`).
- Agents outside the organization, and signed or extended Agent Cards.
- The A2A gRPC binding.
- Changes to the existing gRPC agent-as-tool integration.
- Agent runtime internals, LLM implementation and model access.
- The detailed design of future discovery and gateway capabilities.
