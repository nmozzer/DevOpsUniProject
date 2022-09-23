#### Dev Ops Assignment

This code has been written for DevOps and Software Engineering assignment, in order to showcase DevOps best practises.

#### Bootstrapping instructions

First time deployment

You will need an AWS account in order to deploy this application.

Follow https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html until step `Define a pipeline`

1. In `packages/cdk/lib/pipeline` replace the CodePipelineSource with whichever source you wish. The default case is setup for the CI/CD pipeline this package creates, to be fed by a Github repository.
2. From the root of the directory, any commit will now automatically deploy changes to 

#### Package structure

There are 3 main packages, each is an individual NPM authored package.

1. Under `packages/backend`, this contains the lambda handler logic for the applications API's which interact with dyanmoDb
2. Under `packages/cdk`, this contains all the Infrastructure as Code (IAC). This includes an API Gateway backed, and cloudfront distributed UI. This also contains a CI/CD pipeline with automated build and testing phases. 
3. Under `packages/frontend`, this contains the UI including all assets.

The root of the directory is the parent package, so in this case this application is a mono-repo, which is controlled via `lerna`, which orchestrates the building and testing of the 3 packages in unison.

#### Running tests

1. `npm run test` from the root will run all unit tests.
2. `npm run test-integration` from the root will run UI integration tests using Playwright.

#### Building 

1. `npm run build` from the root will build all 3 sub packages

#### Security Check

1. `npm run owasp` from the root will do a scan of the packages dependencies to ensure they are up to date and not vulnerable.



