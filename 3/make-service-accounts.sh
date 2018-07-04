#!/bin/bash
# This is a temporary method of generating service accounts for the different internal
# services, it will be replaced eventually by some IaC variant like terraform. 

# Check if auth-role@ exists, if not create it. 
gcloud iam service-accounts list | grep -o 'auth-role@\S*\b';
if [ $? -eq 1 ]; then
	echo "Making service account auth-role"
	gcloud iam service-accounts create auth-role --display-name "Auth SA"
	PROJECT=$(gcloud config get-value project)
	gcloud projects add-iam-policy-binding "$PROJECT" \
	--member serviceAccount:auth-role@"$PROJECT".iam.gserviceaccount.com --role roles/datastore.user
	gcloud projects add-iam-policy-binding "$PROJECT" \
	--member serviceAccount:auth-role@"$PROJECT".iam.gserviceaccount.com --role roles/pubsub.publisher
fi