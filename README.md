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

@startuml Direct_A2A_Call_Sequence
title Direct A2A Call Sequence (MVP-1, with LLM)\nExample: card transaction dispute in mobile banking

autonumber
skinparam sequenceMessageAlign left
skinparam responseMessageBelowArrow true

actor Customer
participant "Client App\n(Mobile Banking)" as ClientApp
participant "Caller Agent\n(customer-assistant-agent)\nA2A Client" as Caller
participant "LLM\n(model service)" as LLM
participant "Target Agent\n(card-dispute-agent)\nA2A Server" as Target
participant "Online ARK Security" as Security

== Startup: Peer Discovery ==

Caller -> Caller : Load configured peers\n(config.yaml: card-dispute)
Caller -> Target : GET /.well-known/agent-card.json
Target --> Caller : Agent Card\nskill: dispute_card_transaction\n"Opens a dispute for an unrecognized card\ntransaction and checks fraud signals"
Caller -> Caller : Register peer skill as LLM tool\ncard_dispute__dispute_card_transaction

== User Request ==

Customer -> ClientApp : "Kartımdan tanımadığım 4.250 TL'lik\nbir harcama görünüyor, itiraz etmek istiyorum."
ClientApp -> Caller : User request + available context\n(customerId: 4815, authenticated session,\ncard: **** 1234, channel: mobile)

Caller -> LLM : Prompt + context +\navailable peer tools
LLM --> Caller : tool_call(card_dispute__dispute_card_transaction,\n"Customer 4815 does not recognize a TRY 4,250\ntransaction on card **** 1234 dated 2026-10-24")

note over Caller, LLM
  If the LLM can answer without a peer
  (e.g. "How do I see my card limit?"),
  it returns a final answer instead of a
  tool_call and the flow continues at
  "Final Response".
end note

Caller -> Caller : Verify card-dispute-agent is a\nconfigured and permitted peer

== Direct A2A Interaction ==

Caller -> Target : A2A task + required caller\nidentity/security context\n(customer reference, masked card number)

opt Online ARK Security validation is required
    Target -> Security : Validate caller and authorization context
    Security --> Target : Validation result
end

alt Request is authorized
    Target -> Target : Pass task to local agent runtime
    Target -> LLM : Task + target agent's own instructions\nand tools (transaction history, fraud signals)
    LLM --> Target : Transaction found, high fraud score\n-> open dispute, recommend card block
    Target --> Caller : A2A task result (Task + Artifact)\ndispute case DS-20261025-117 opened,\ncard block recommended
else Request is rejected or processing fails
    Target --> Caller : A2A error response\n(e.g. REJECTED: transaction not found\nor outside dispute period)
end

== Final Response ==

Caller -> LLM : tool_result\n(peer result or error, as data)
LLM --> Caller : Final answer draft
Caller -> Caller : Apply business rules\n(card block requires customer confirmation,\nfallback to call center on error)
Caller -> ClientApp : Return result or handled error
ClientApp -> Customer : "İtirazınız DS-20261025-117 numarasıyla alındı.\nKartınızı güvenlik için geçici olarak\nkapatmak ister misiniz?"

@enduml


This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
