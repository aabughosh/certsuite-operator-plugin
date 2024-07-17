FROM registry.access.redhat.com/ubi8/nodejs-20:1-50 AS build
USER root
RUN command -v yarn || npm i -g yarn

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install && yarn build
USER 1001

FROM registry.access.redhat.com/ubi8/nginx-120:1-137

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
USER 1001

ENTRYPOINT ["nginx", "-g", "daemon off;"]