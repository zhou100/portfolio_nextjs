#!/bin/bash
# rollback.sh
VERCEL_DEPLOYMENT=$(curl -s https://api.vercel.com/v6/deployments | jq -r '.deployments[1].uid')
vercel rollback $VERCEL_DEPLOYMENT
aws route53 change-resource-record-sets --hosted-zone-id Z1PA6795 --change-batch file://dns-rollback.json