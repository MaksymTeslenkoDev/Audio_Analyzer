FROM node:18

RUN apt-get update && \
    apt-get install -y ffmpeg &&\
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN mkdir -p models && \
    cd models && \
    wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm && \
    wget https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer

COPY . .
EXPOSE 3000

CMD ["node", "server.js"]


