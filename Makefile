IMG?=cnf-certsuite-plugin
BASH_SCRIPTS=$(shell find . -name "*.sh" -not -path "./.git/*")

.PHONY: docker-build
docker-build:
	docker build -t ${IMG} .

.PHONY: docker-push
docker-push:
	docker push ${IMG}

.PHONY: lint
lint:
	hadolint Dockerfile
	shfmt -d *.sh
	typos
	markdownlint '**/*.md'
	yamllint --no-warnings .
