aws s3 mb s3://syncgalaxy-users-bucket
aws cloudformation package --template-file build/users.yaml --output-template-file build/usersServerless-output.yaml --s3-bucket syncgalaxy-users-bucket
aws cloudformation deploy --template-file build/usersServerless-output.yaml --stack-name SyncGalaxy-Users-Stack --capabilities CAPABILITY_IAM
