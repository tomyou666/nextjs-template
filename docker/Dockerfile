FROM ubuntu:latest

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    git \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

ENV HOME=/home/${UNAME}
ENV VOLTA_HOME=${HOME}/.volta
ENV PATH=${VOLTA_HOME}/bin:$PATH

RUN curl -sSL https://get.volta.sh | bash
