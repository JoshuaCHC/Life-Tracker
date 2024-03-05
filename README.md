# Life tracker

An app to help in all facets of life, and develop understandings of best practices, deployment pathways and assorted technologies.

## Run the app locally:
1. Ensure that you have a docker desktop account
2. Build the api containers using the following command `docker build -t {dockerUsername}/{serviceName} .` (service names as of 2/3 are eventsservice and financeservice)
3. Push these to your docker hub `docker push {dockerUsername}/{serviceName}`
4. Ensure you have docker desktop locally with kubernetes enabled
5. Run the following command to start an nginx pod on your docker desktop (required for configuring the ingress) `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml`
6. Add the following line to `C:\Windows\System32\drivers\etc\hosts`: `127.0.0.1 acme.com`
7. Start up the apis by navigating to the `K8S` folder and running the following commands `kubectl apply -f {dep name}` where dep name is the deployment file (`events-depl.yaml` and `finance-depl.yaml`)
8. Start the rabbitMQ bus by running `kubectl apply -f rabbitmp-depl.yaml`.
9. Start the ingress by running `kubectl apply -f ingress-srv.yaml`.
10. Open the web project and run `npm run dev` to start the UI, and pray to the gods.



### Credits 
The api was initially followed from https://www.youtube.com/watch?v=DgVjEo3OGBI&ab_channel=LesJackson, so massive shoutout. 
