.SILENT:
help:
	echo
	echo "ChessPlatform Server Make commands"
	echo
	echo "  Commands: "
	echo
	echo "    help  - show this message"
	echo "    build - build all services"
	echo "    build-<service> - Build specific service"
	echo "    test  - test all services"
	echo "    test-<service> - Test specific service"
	echo "    run   - Start this service, and all of its deps, locally (docker)"
	echo "    deps - Check for all dependencies"
	echo "    clean - Remove all used containers"

build: clean
	docker-compose -f ./app.yml build

build-api:
	docker build -t simpsonjon/chessplat:api ./api/
build-chess:
	docker build -t simpsonjon/chessplat:chess ./chess/
build-auth:
	docker build -t simpsonjon/chessplat:auth ./auth/
build-test-api: build-api
	docker build -t simpsonjon/chessplat:api-test -f ./api/Test.Dockerfile ./api/
build-test-chess: build-chess
	docker build -t simpsonjon/chessplat:chess-test -f ./chess/Test.Dockerfile ./chess/
build-test-auth: build-auth
	docker build -t simpsonjon/chessplat:auth-test -f ./auth/Test.Dockerfile ./auth/
build-test-integration: build
	docker build -t simpsonjon/chessplat:integration-test -f ./integration/Dockerfile ./integration/
build-test: build-test-api
	build-test-auth
	build-test-chess

test-integration: clean
	docker-compose -f ./integration.yml up
test: build-test
	docker run -it -p 3000:3000 simpsonjon/chessplat:api-test
	docker run -it -p 8080:3000 simpsonjon/chessplat:auth-test
	docker run -it -p 8081:3000 simpsonjon/chessplat:chess-test
test-api: build-test-api
	docker run -it -p 3000:3000 simpsonjon/chessplat:api-test
test-auth: build-test-auth
	docker run -it -p 8080:3000 simpsonjon/chessplat:auth-test
test-chess: build-test-chess
	docker run -it -p 8080:3000 simpsonjon/chessplat:chess-test

run: build
	docker-compose -f ./app.yml up
clean:
	docker-compose -f ./app.yml rm -f
	docker-compose -f ./integration.yml rm -f

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo "    * docker-compose $(shell which docker-compose > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo