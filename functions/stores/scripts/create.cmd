aws s3 mb s3://SyncGalaxy-Stores-bucket
aws cloudformation package --template-file build/storesSAM.yaml --output-template-file build/storesServerless-output.yaml --s3-bucket SyncGalaxy-Stores-bucket
aws cloudformation deploy --template-file build/storesServerless-output.yaml --stack-name SyncGalaxy-Stores-Stack --capabilities CAPABILITY_IAM

