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


## 4. Functional Requirements

Functional requirements describe what ARK AI A2A does from end to end, as seen by agent teams and by calling agents. Each requirement is supported by one or more capabilities from Section 3.

| ID    | Name                                         | Description | Capabilities |
|-------|----------------------------------------------|-------------|--------------|
| FR-01 | Exchange tasks between AI agents over A2A    | An AI agent acting as an A2A Client can send a task to a peer agent acting as an A2A Server. The peer processes the task through its own agent runtime and returns a result to the caller. | Task Invocation, Task Reception |
| FR-02 | Support A2A Client and Server roles          | An AI agent can act as an A2A Client, an A2A Server, or both, depending on whether it sends and/or receives tasks. | All |
| FR-03 | Describe an agent with an Agent Card         | Every A2A Server describes itself with an Agent Card, built from its configuration and published at its well-known address. | Agent Card |
| FR-04 | Discover peer agents from configuration      | A calling agent finds its permitted peers in its own version-controlled configuration. It reads each peer's Agent Card at runtime from the peer's well-known address. No central discovery service is used. | Peer Discovery |
| FR-05 | Let the agent's LLM select a peer            | The skills of configured peers are offered to the calling agent's LLM as tools. The LLM decides when to call a peer. Mandatory steps can call a peer directly from code. | Peer Discovery, Task Invocation |
| FR-06 | Accept tasks only from permitted callers     | An A2A Server accepts a task only if the caller is authenticated, is on the agent's allowed-callers list and, where required, passes Online ARK Security validation. | Task Reception |
| FR-07 | Accept only published skills                 | An A2A Server processes only tasks for the skills published in its Agent Card. | Agent Card, Task Reception |
| FR-08 | Return results as a response or a stream     | The caller receives the result either as one response (blocking) or as a stream of updates (SSE). | Task Invocation, Task Reception |
| FR-09 | Report rejected and failed tasks             | When a task is rejected or fails, the A2A Server returns a standard A2A error. The calling agent handles the error and can fall back, for example to a human channel. | Task Invocation, Task Reception |
| FR-10 | Continue a conversation across tasks         | Messages sent with the same conversation ID (`contextId`) are handled as one conversation, so the peer agent keeps the context between turns. | Task Invocation, Task Reception |
| FR-11 | Serve both protocol bindings                 | Every A2A Server accepts requests on both HTTP+JSON and JSON-RPC, with the same behavior, security checks and errors. ARK AI clients use HTTP+JSON. | Agent Card, Task Reception |


### 6.6. Business Constraints

- **Internal agents only:** only agents inside the organization can call, or be called through, ARK AI A2A. Calls to or from external or public agents are not allowed in MVP-1.
- **Configuration is not authorization:** listing a peer in an agent's configuration does not, by itself, give access to that peer. The target agent must also allow the caller.
- **Access is agreed between teams:** before an agent can call a peer, the team that owns the peer must add the caller to the peer's allowed-callers list.
- **Every agent has an owner:** each agent has an owning team that is responsible for its Agent Card, its skills and its allowed-callers list.
- **Inbound requests are always checked:** every inbound A2A request is authenticated and authorized according to the ARK security model.
- **Customer data is minimized:** an A2A task carries only the customer data the peer needs for the task. Sensitive data is masked or replaced by a reference, according to the bank's data classification and privacy rules.
- **Critical decisions are not made by the LLM alone:** decisions such as approvals, payments, card blocks or credit decisions require a business rule in code or a human approval. A peer's response alone cannot trigger them.

### 6.7. Technical Constraints

**Protocol**
- ARK AI A2A implements the A2A protocol, version 1.0.
- Every A2A Server supports the HTTP+JSON and JSON-RPC bindings. ARK AI clients use HTTP+JSON. The A2A gRPC binding is not supported.
- Responses are blocking or streamed over SSE. Background (asynchronous) tasks and push notifications are not supported.
- A task must finish within the platform's maximum request duration.

**Discovery**
- Each calling agent lists its permitted peers in its version-controlled configuration. Environment-specific endpoints are supplied by the deployment, not by agent code.
- Every A2A Server publishes its Agent Card at `/.well-known/agent-card.json`. The calling agent reads and caches peer cards at runtime.
- MVP-1 does not depend on a centralized Agent Catalog, Agent Discovery service or Agent Routing service.

**Runtime**
- There is no A2A Gateway. Authentication, authorization and security checks run inside each agent's A2A runtime.
- Task state is kept in memory. A task in progress is lost if the agent restarts, and the caller must retry.
- The A2A runtime is built in Python on the official A2A Python SDK (`a2a-sdk`, version 1.0 or later, pinned).

**Deployment**
- Calling and target agents are deployed independently.
- Calling and target agents can run in different namespaces, if network policy allows the traffic between them.
- The existing gRPC agent-as-tool integration remains unchanged and runs separately from A2A.
