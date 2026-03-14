FROM public.ecr.aws/lambda/nodejs:24 AS builder

WORKDIR /var/task

COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
RUN pnpm exec tsc && pnpm prune --prod

FROM public.ecr.aws/lambda/nodejs:24

WORKDIR /var/task

COPY --from=builder /var/task/node_modules ./node_modules
COPY --from=builder /var/task/dist/handler.js ./handler.js

CMD ["handler.handler"]