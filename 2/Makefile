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

SERVICE = api chess auth

build-test-%:
	docker build -t simpsonjon/chessplat:$*-test -f ./$*/Test.Dockerfile ./$*/
build-%: 
	docker build -t simpsonjon/chessplat:$* ./$*/

test-integration: clean
	docker-compose -f ./integration.yml up --build \
    --abort-on-container-exit \
    --exit-code-from integration
test-%: 
	make build-$*
	make build-test-$*
	docker run -it simpsonjon/chessplat:$*-test

dev: 
	docker-compose -f ./dev.yml down
	docker-compose -f ./dev.yml up --build
dev-%:
	docker-compose -f ./dev.yml -f ./dev.$*.override.yml up
run: 
	docker-compose -f ./app.yml up --build
clean:
	docker-compose -f ./app.yml rm -f
	docker-compose -f ./dev.yml rm -f
	docker-compose -f ./integration.yml rm -f

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo "    * docker-compose $(shell which docker-compose > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo