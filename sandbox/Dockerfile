# 仅在评测准备阶段构建。镜像 ID 须记入运行元数据。
FROM node:24.21.0-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends python3 chromium ca-certificates \
    && rm -rf /var/lib/apt/lists/*
USER node
WORKDIR /work
ENV HOME=/tmp/bench-home npm_config_cache=/tmp/npm-cache
CMD ["bash"]
