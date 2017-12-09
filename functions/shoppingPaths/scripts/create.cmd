aws s3 mb s3://SyncGalaxy-ShoppingPaths-bucket
aws cloudformation package --template-file build/shoppingPathsSAM.yaml --output-template-file build/shoppingPathsServerless-output.yaml --s3-bucket SyncGalaxy-ShoppingPaths-bucket
aws cloudformation deploy --template-file build/shoppingPathsServerless-output.yaml --stack-name SyncGalaxy-ShoppingPaths-Stack --capabilities CAPABILITY_IAM

