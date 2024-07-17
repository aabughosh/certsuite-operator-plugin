BASH_SCRIPTS=$(shell find . -name "*.sh" -not -path "./.git/*")

.PHONY: lint
lint:
	hadolint Dockerfile
	shfmt -d *.sh script
	typos
	markdownlint '**/*.md'
	yamllint --no-warnings .
	shellcheck --format=gcc ${BASH_SCRIPTS}