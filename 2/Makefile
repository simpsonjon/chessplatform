.SILENT:
help:
	echo
	echo "ChessPlatform Server Make commands"
	echo
	echo "  Commands: "
	echo
	echo "    help - show this message"
	echo "    run - Start this service, and all of its deps, locally (docker)"
	echo "    test-api - Run the unit tests for API"
	echo "    deps - Check for all dependencies"

build:
	docker build -t simpsonjon/api:api ./api/

build-test: build
	docker build -t simpsonjon/api:api-test -f ./api/Test.Dockerfile ./api/

run: build
	docker run --init -it -p 3000:3000 simpsonjon/api:api

test-api: build-test
	docker run -it -p 3000:3000 simpsonjon/api:api-test

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo