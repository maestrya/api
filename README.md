
  

# AutoFront API

  

AutoFront is another project for academic purposes with AdonisJS and [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) , and  standardize the return structure

  
  Trello:
- [Trello](https://trello.com/b/CoqpFbde/autofront)

 Project in Heroku:
- [Heroku URL](https://damp-falls-68282.herokuapp.com/)

Required:
-  [ Adonis.JS](https://adonisjs.com/docs/4.1/installation)

-  [Node.JS](https://nodejs.org/en/download/)

  

Optional:

  

-  [Docker](https://docs.docker.com/get-docker/)

## Postamn

The folder **Postman** contains postman collection and environment variables for tests 

## Architecture

 - **App**
	 - **Domain =** Responsible for delegate responsibilities for business rules
		 - **Command =**  Responsible for centralizing resources as Validations, Repositories and Entities
	 - **Helpers =** Responsible for centralizing resources to help other layers
	 - **Infrastructure =** Responsible for centralizing infrastructure related
		 - **Entities =** Responsible for handle entities
		 - **Models =** Responsible for connection and ORM with database
		 - **Repositories =** Responsible for queries with database (extends Models)
- **Database**
  	- **Migrations =** Responsible for the database structure
 	- **Seeds =** Responsible for the default data in database
- **Start**
  	- **App =** Responsible with providers in application
 	- **Kernel =** Responsible with middlewares in application
	- **Routes =** Responsible with HTTP routes (relationship with Commands)


## Install Adonis.JS

  
Run

```bash

npm i -g @adonisjs/cli

```


## Setup without docker

  

Install project

```bash

npm install

```

If you have problem with PERMISSIONS

  

```bash

npm install --unsafe-perm

```

## Run without docker

  

```bash

adonis serve

```

## Setup & Run with docker

  

Run docker-compose in background (-d)

```bash

docker-compose up -d

```

  

## Migrations && Seeds

  

Run the following command to run startup migrations.

  

```bash

npm run db

```

 

