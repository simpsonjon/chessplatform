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

build-dev-%:
	docker build -t simpsonjon/chessplat:$*-dev -f ./$*/Dev.Dockerfile ./$*/
build-%: 
	docker build -t simpsonjon/chessplat:$* ./$*/

test-integration: clean
	docker-compose -f ./integration.yml up --build \
    --abort-on-container-exit \
    --exit-code-from integration
test-%: 
	make build-$*
	make build-dev-$*
	docker run -it simpsonjon/chessplat:$*-dev

dev: 
	docker-compose -f ./dev.yml down
	docker-compose -f ./dev.yml up --build
dev-%:
	bash -c "kubectl create -f <(cat $*-dev-deployment.yaml | sed 's/FULLPATHSUB/$(shell pwd | sed 's_/_\\/_g')/g')"

run: 
	docker-compose -f ./app.yml up --build
clean:
	echo "Clean is broken"

deps:
	echo "  Dependencies: "
	echo
	echo "    * docker $(shell which docker > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo "    * docker-compose $(shell which docker-compose > /dev/null || echo '- \033[31mNOT INSTALLED\033[37m')"
	echo