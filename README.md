# REAL TIME ANALYTICS API

# Getting Started

To get started, clone this repository and install its dependencies:

```js
  git clone git@github.com:faizkhan01/ph-real-time-analytics-api.git

  cd ph-real-time-analytics-api

  // Once
  cp .env.example .env

  sudo make build

  sudo make logs
```

```js
sudo make shell

```

Finally, start the server using the following command:

```js
  sudo make logs
```

This will start the Nest.js server on env defined port.

# Usage

Once the server is running, you can access the Swagger UI at http://localhost:9000/api/docs. From here, you can explore the available routes.

# Folder Structure

`tree ./ -I 'node_modules|dist|docker'`

```js
./
├── docker-compose.yaml
├── Dockerfile
├── Makefile
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── config
│   │   ├── config.module.ts
│   │   ├── server.config.ts
│   │   └── swagger.config.ts
│   ├── db
│   │   └── ormconfig.ts
│   ├── libs
│   │   ├── decorators
│   │   │   └── roles.decorator.ts
│   │   ├── events
│   │   │   └── events.ts
│   │   ├── guards
│   │   │   └── roles.guard.ts
│   │   ├── listeners
│   │   │   └── listeners.ts
│   │   └── loaders
│   │       └── swagger.module.ts
│   ├── main.ts
│   └── modules
│       ├── auth
│       │   ├── auth.controller.ts
│       │   ├── auth.module.ts
│       │   ├── auth.service.ts
│       │   ├── jwt-auth.guard.ts
│       │   ├── jwt.strategy.ts
│       │   ├── local-auth.guard.ts
│       │   └── local.strategy.ts
│       ├── generic
│       │   └── generic.entity.ts
│       ├── metrics
│       │   ├── aggregated-matrics.service.ts
│       │   ├── entities
│       │   │   └── aggregated-matrics.entity.ts
│       │   └── metrics.module.ts
│       ├── question
│       │   └── entities
│       │       └── question.entity.ts
│       ├── quiz
│       │   └── entities
│       │       └── quiz.entity.ts
│       ├── result
│       │   ├── entities
│       │   │   └── results.entity.ts
│       │   ├── results.controller.ts
│       │   ├── results.gateway.ts
│       │   ├── results.module.ts
│       │   └── results.service.ts
│       └── user
│           ├── entities
│           │   └── user.entity.ts
│           ├── user.module.ts
│           └── user.service.ts
├── test
│   ├── aggregated-metrics.service.spec.ts
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
│   └── result.service.spec.ts
├── tsconfig.build.json
└── tsconfig.json


```
