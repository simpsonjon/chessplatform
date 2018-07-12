#!/bin/bash
# This is a temporary method of generating service accounts for the different internal
# services, it will be replaced eventually by some IaC variant like terraform. 

# Check if auth-role@ exists, if not create it. 
gcloud iam service-accounts list | grep -o 'auth-role@\S*\b';
if [ $? -eq 1 ]; then
	echo "Making service account auth-role"
	PROJECT=$(gcloud config get-value project)
	gcloud iam service-accounts create auth-role --display-name "Auth SA" && \
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
	gcloud projects add-iam-policy-binding "$PROJECT" \
	--member serviceAccount:chess-role@"$PROJECT".iam.gserviceaccount.com --role roles/pubsub.subscriber
fi
# Check if gcr-role@ exists, if not create it. 
gcloud iam service-accounts list | grep -o 'gcr-role@\S*\b';
if [ $? -eq 1 ]; then
	echo "Making service account gcr-role"
	PROJECT=$(gcloud config get-value project)
	echo "If you have bucket errors, please make sure your project has"
	echo "an artfacts.<project>.appspot.com bucket from the gcloud container"
	echo "push through docker"
	gcloud iam service-accounts create gcr-role --display-name "GCR SA" && \
	gsutil iam ch serviceAccount:gcr-role@"$PROJECT".iam.gserviceaccount.com:admin gs://artifacts."$PROJECT".appspot.com
	#Docker push requires storage.buckets.get, which is only available by default
	# in storage.admin, which is too broad for me to give to CircleCI
	# Create custom role
	gcloud iam roles create bucketgetter --project "$PROJECT" \
	--title "Bucket Getter" --description "Allows project wide storage.buckets.get" \
	--permissions storage.buckets.get --stage GA
	gcloud projects add-iam-policy-binding "$PROJECT" \
	--member serviceAccount:gcr-role@"$PROJECT".iam.gserviceaccount.com --role projects/"$PROJECT"/roles/bucketgetter

fi

if [ ! -f ./auth-key.json ]; then
    gcloud iam service-accounts keys create auth-key.json --iam-account=auth-role@"$PROJECT".iam.gserviceaccount.com
	echo "Generating Auth-Key as auth-key.json"
fi
if [ ! -f ./chess-key.json ]; then
    gcloud iam service-accounts keys create chess-key.json --iam-account=chess-role@"$PROJECT".iam.gserviceaccount.com
	echo "Generating Chess-Key as chess-key.json"
fi
if [ ! -f ./gcr-key.json ]; then
    gcloud iam service-accounts keys create gcr-key.json --iam-account=gcr-role@"$PROJECT".iam.gserviceaccount.com
	echo "Generating GCR-Key as gcr-key.json"
fi

echo "Attempting to push keys as secrets through kubectl"
kubectl create secret generic auth-cred --from-file=./auth-key.json
kubectl create secret generic chess-cred --from-file=./chess-key.json
