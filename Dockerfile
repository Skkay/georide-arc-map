FROM node:18-alpine as build

ARG VITE_MAPBOX_API_KEY=""
ENV VITE_MAPBOX_API_KEY=$VITE_MAPBOX_API_KEY

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM httpd:alpine

COPY --from=build /app/dist /usr/local/apache2/htdocs

EXPOSE 80

CMD ["httpd", "-D", "FOREGROUND"]