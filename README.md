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



A2A Protokolü için Agent'lara Yeni Port ve OpenShift Tanımları
Bağlam
AI Agent Framework'ümüze A2A (Agent2Agent) protokolü desteği ekliyoruz. A2A, ajanların birbirini standart bir şekilde çağırabilmesini sağlayan açık bir protokol: HTTP üzerinden JSON, uzun süren cevaplar için de SSE (Server-Sent Events) kullanıyor.
Bugün bir agent açılırken `serviceType` olarak `grpc` ya da `rest` belirtilebiliyor. Bunlara `a2a` seçeneğini ekleyeceğiz. Bir agent'ın hem mevcut gRPC hem de A2A üzerinden erişilebilir olması gerekecek. Mevcut gRPC altyapısı aynen devam ediyor, A2A onun yanına ekleniyor.
İlk fazda (MVP-1) A2A trafiği sadece cluster içinde olacak. Ajanlar birbirini aynı ya da farklı namespace'lerden Kubernetes servis adresiyle çağıracak, örneğin:
```
agentic-ai-poc-aiagent-v0.genai-common-dev.svc.cluster.local
```
Dışarıya açılım bu fazın kapsamında değil.
Taleplerimiz
Yeni port: `serviceType` değeri `a2a` olan agent'lar için Deployment ve Service tanımına ayrı, isimli bir port eklenmesi. Örneğin `name: a2a`, `port: 8081` (port numarası sizin standardınıza göre belirlenebilir). Agent hem gRPC hem A2A sunuyorsa iki port birlikte açılacak.
Bu port üzerinden servis edilecek path'ler:
Path	Amaç
`GET /.well-known/agent-card.json`	Agent'ın kendini tanıttığı kart
`/a2a/*`	A2A istekleri (HTTP+JSON ve JSON-RPC)
Namespace'ler arası erişim: A2A portuna farklı namespace'lerdeki agent'lardan erişime izin veren NetworkPolicy tanımları.
Uzun süreli bağlantılar: A2A cevapları SSE ile akış halinde gelebiliyor ve birkaç dakika sürebiliyor. Bu trafiğin router ya da proxy katmanında buffer'lanmaması ve zaman aşımının uzun tutulması gerekiyor (önerimiz en az 300 saniye).
Health check: A2A portu hazır olmadan pod'un trafik almaması için readiness probe tanımı.
Örnek Service tanımı
```yaml
apiVersion: v1
kind: Service
metadata:
  name: agentic-ai-poc-aiagent-v0
  namespace: genai-common-dev
spec:
  selector:
    app: agentic-ai-poc-aiagent-v0
  ports:
    - name: grpc          # mevcut
      port: 50051
      targetPort: 50051
    - name: a2a           # yeni
      port: 8081
      targetPort: 8081
      appProtocol: http
```
> Port numaraları örnektir; altyapı standardına göre belirlenecektir.
Sizinle Netleştirmek İstediğimiz Konular
[ ] A2A için kullanılacak standart port numarası ve isimlendirme kuralı ne olmalı?
[ ] Cluster içi trafik için Route ya da host tanımı gerekiyor mu, yoksa servis adresi (`*.svc.cluster.local`) yeterli mi?
[ ] İleride A2A'yı API Gateway arkasından ya da cluster dışına açmak istediğimizde host isimlendirme standardı ne olur? (Şu an talep etmiyoruz, ama agent kartına yazılacak adresi bu belirleyeceği için planlamak istiyoruz.)
[ ] Namespace'ler arası trafikte mTLS ya da service mesh kullanılıyor mu?
[ ] `serviceType: a2a` geldiğinde bu tanımların otomatik oluşturulması için Helm chart ya da template'te nasıl bir değişiklik gerekir?
Sonraki Adım
Uygun olduğunuz bir zamanda kısa bir toplantıda konuşabilirsek sevinirim.
