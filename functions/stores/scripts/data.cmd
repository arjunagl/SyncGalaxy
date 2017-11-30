aws s3api put-object --bucket SyncGalaxy-Stores-bucket --key coles.svg --body images/c.svg 
aws s3api put-object --bucket SyncGalaxy-Stores-bucket --key woolworths.svg --body images/w.svg
aws s3api put-object --bucket SyncGalaxy-Stores-bucket --key aldi.svg --body images/a.svg 
aws dynamodb batch-write-item --request-items file://scripts/sampleData.json