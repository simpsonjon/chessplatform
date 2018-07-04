#!/bin/bash
# This is a temporary method of generating service accounts for the different internal
# services, it will be replaced eventually by some IaC variant like terraform. 

# Check if auth-role@ exists, if not create it. 
gcloud iam service-accounts list | grep -o 'auth-role@\S*\b';
if [ $? -eq 1 ]; then
	echo "Making service account auth-role"
	PROJECT=$(gcloud config get-value project)
	gcloud iam service-accounts create auth-role --display-name "Auth SA" && \
    gcloud iam service-accounts keys create auth-key.json --iam-account=auth-role@"$PROJECT".iam.gserviceaccount.com
	gcloud projects add-iam-policy-binding "$PROJECT" \
	--member serviceAccount:auth-role@"$PROJECT".iam.gserviceaccount.com --role roles/datastore.user
	gcloud projects add-iam-policy-binding "$PROJECT" \
	--member serviceAccount:auth-role@"$PROJECT".iam.gserviceaccount.com --role roles/pubsub.publisher
fi

# Check if chess-role@ exists, if not create it. 
gcloud iam service-accounts list | grep -o 'chess-role@\S*\b';
if [ $? -eq 1 ]; then
	echo "Making service account chess-role"
	PROJECT=$(gcloud config get-value project)
	gcloud iam service-accounts create chess-role --display-name "Chess SA" && \
    gcloud iam service-accounts keys create chess-key.json --iam-account=chess-role@"$PROJECT".iam.gserviceaccount.com
	gcloud projects add-iam-policy-binding "$PROJECT" \
	--member serviceAccount:chess-role@"$PROJECT".iam.gserviceaccount.com --role roles/pubsub.subscriber
fi

echo "Attempting to push keys as secrets through kubectl"
kubectl create secret generic auth-cred --from-file=./auth-key.json
kubectl create secret generic chess-cred --from-file=./chess-key.json
