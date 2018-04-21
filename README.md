# Chess Platform
Exploration of developing a large scale gaming platform for chess. Primary technologies will include Kubernetes, GCP, NodeJS and Go.

This is intended as a learning exercise for myself, but hopefully will be produced in such a way that others can experience a sort of Developer/DevOps version of r/EntrepreneurRideAlong

Work will be produced in sequential base directories, rather than use tags to allow a new observer to easily walk through progress without having to be too familiar with git. Once a new 'version' folder is created commits should only update older folders to recent requirements to allow old versions to function.

## Platform
To avoid an excess of learning bloat work will not be focused on making this cross cloud compatible, and will instead focus on Google Cloud Platform. Very little work will be done for the front end visualization and interactions required to actually 'play' on the platform until late in development. 

The first milestone goal is to create three services to handle:
- Auth[NodeJS]: Authentication and Registration
- API[NodeJS]: All platform related APIs
- Chess[Go]: Move validation, game caching, and game status updates. Will be programed in Go... because I want to improve my skills with Go. 

## Planned progression
Development will be DevOps focus with three primary considerations:
- Ease of local development and testing
- Reliable CI and Deployment Pipeline
- BI analysis

Development will start working towards a deployable scaffold that represents a 'hello world' of the entire platform. The idea behind this is to lower the possibility of coding issues while making sure networking configurations work, deployments and local development are easy, and allow us to see potential architectural pitfalls before full code implementation starts. Intermittently throughout development I'll stop to take a look at potential costs per user, per game, and perform load tests. For BI I'd like to produce some nice graphs that display when it's more cost effective to move from 'Implementation A' to 'B', as some GCP services like BigTable have high introductory costs but a similar service like Datastore would eventually generate costs that surpasses it. 
