FROM mcr.microsoft.com/playwright:v1.46.0-noble

RUN apt-get update && apt-get install -y make python3 python3-pip wget xdg-utils && rm -rf /var/lib/apt/lists/*
RUN pip install uv --break-system-packages
RUN npm install -g pnpm

# Install real Google Chrome (trusted by Google sign-in, unlike Playwright's Chromium)
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb

WORKDIR /usr/src/app
CMD ["bash"]
