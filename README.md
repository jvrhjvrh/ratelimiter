Rate Limiter

Project built using node.js with express, requires Redis running.

To run the project run the following commands in the folder of the project:

    - npm run install
    - ENV_VARIABLES npm run start

Environment variables available are:

    - PORT: application port. Default value: 3000
    - USER_ID: string needed to authorize auth routes. Default value: testUser
    - REDIS_HOST host of redis server. Default value: localhost
    - REDIS_PORT port of redis server. Default value: 6379
    - EXPIRE_TIME time for rate limiting to expire in seconds. Default value: 3600
    - PUBLIC_MAX_VALUE max limit of calls for public routes. Default value: 100
    - PRIVATE_MAX_VALUE max limit of calls for private routes. Default value: 200

This application was developed to showcase some use cases for middlewares, more specifically a rate limiter and an authenticator.

Endpoints available to test are:

    - /public Increases public limit by 1
    - /public/2 Increases public limit by 2
    - /public/5 Increases public limit by 5
    
    - /auth Requires authentication (Authorization header equals to USER_ID environment variable) Increases private limit by 1
    - /auth/2 Requires authentication (Authorization header equals to USER_ID environment variable) Increases private limit by 2
    - /auth/5 Requires authentication (Authorization header equals to USER_ID environment variable) Increases private limit by 5
