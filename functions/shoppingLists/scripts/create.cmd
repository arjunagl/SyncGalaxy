aws s3 mb s3://SyncGalaxy-ShoppingLists-bucket
aws cloudformation package --template-file build/shoppingListsSAM.yaml --output-template-file build/shoppingListsServerless-output.yaml --s3-bucket SyncGalaxy-ShoppingLists-bucket
aws cloudformation deploy --template-file build/shoppingListsServerless-output.yaml --stack-name SyncGalaxy-ShoppingLists-Stack --capabilities CAPABILITY_IAM

