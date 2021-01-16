# The version of Alpine to use for the final image
# This should match the version of Alpine that the `elixir:1.7.2-alpine` image uses
ARG ALPINE_VERSION=latest

FROM elixir:1.11.3-alpine AS builder

# The following are build arguments used to change variable parts of the image.
# The name of your application/release (required)
ARG APP_NAME
ARG APP_VERSION
# The environment to build with
ARG SECRET_KEY_BASE="q9/imeo1YRsGmQ0MFLjpFxnQZGUtyPjNhQbSJnUJ7SBfykSE70CG3xXY5kEQ4Dr5"
ARG MIX_ENV=docker

ENV APP_NAME=${APP_NAME} \
    APP_VSN=${APP_VERSION} \
    MIX_ENV=${MIX_ENV} \
    SECRET_KEY_BASE=${SECRET_KEY_BASE}

# By convention, /opt is typically used for applications
WORKDIR /opt/build

# This step installs all the build tools we'll need
RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache \
    nodejs \
    yarn \
    git \
    bash \
    ca-certificates \
    build-base && \
  mix local.rebar --force && \
  mix local.hex --force

# This copies our app source code into the build container
COPY . .
# RUN mix local.rebar --force && mix local.hex --force
RUN mix do deps.get, deps.compile, compile

RUN \
  cd assets && \
  yarn install && \
  yarn deploy && \
  cd - && \
  mix phx.digest;

# RUN \
#   mkdir -p /opt/built && \
#   mix distillery.release --verbose && \
#   cp ./_build/${MIX_ENV}/rel/${APP_NAME}/releases/${APP_VSN}/${APP_NAME}.tar.gz /opt/built && \
#   cd /opt/built && \
#   tar -xzf ${APP_NAME}.tar.gz && \
#   rm ${APP_NAME}.tar.gz

RUN mix release

# From this line onwards, we're in a new image, which will be the image used in production
FROM alpine:${ALPINE_VERSION} as app

RUN apk update && \
    apk add --no-cache \
    bash \
    openssl \
    openssl-dev \
    ca-certificates

# RUN adduser -D app

ARG APP_NAME
ARG MIX_ENV=docker
ARG APP_VERSION=${APP_VERSION}

ENV REPLACE_OS_VARS=true \
    APP_NAME=${APP_NAME}\
    MIX_ENV=docker

WORKDIR /opt/app

COPY --from=builder /opt/build/_build/${MIX_ENV}/rel/* ./
# COPY --from=builder /opt/built .

# USER app

RUN mkdir /tmp/app
ENV RELEASE_MUTABLE_DIR /tmp/app
ENV START_ERL_DATA /tmp/app/start_erl.data

COPY entrypoint.sh .

# CMD ["/opt/app/bin/cogsworth", "start_iex"]
CMD ["./entrypoint.sh"]

# CMD trap 'exit' INT; /opt/app/bin/${APP_NAME} foreground
