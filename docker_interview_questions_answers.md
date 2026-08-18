# Docker Interview Questions --- 3 Years Experience

## 1. What is Docker and why do we use it?

**Answer:** Docker packages an application and its dependencies into a
container so it runs consistently across environments.\
We use it for environment consistency, isolation, easy deployment, and
scalability.

``` text
Application + Dependencies
          ↓
      Docker Image
          ↓
      Container
          ↓
   Same environment
```

------------------------------------------------------------------------

## 2. Docker vs Virtual Machine --- what's the difference?

**Answer:** A VM virtualizes the entire operating system, while Docker
containers share the host OS kernel.\
Containers are generally lighter, start faster, and use fewer resources
than VMs.

``` text
VM:                         Docker:
Server                      Server
 ├─ VM + OS                  ├─ Container
 ├─ VM + OS                  ├─ Container
 └─ VM + OS                  └─ Container
```

------------------------------------------------------------------------

## 3. What is an OS Kernel?

**Answer:** The kernel is the core part of an operating system that
manages CPU, memory, disk, networking, and processes.\
Docker containers share the host kernel, while a VM has its own
OS/kernel.

``` text
Application
     ↓
  Kernel
     ↓
CPU / RAM / Disk
```

------------------------------------------------------------------------

## 4. Image vs Container

**Answer:** A Docker image is a read-only package containing the
application and its dependencies.\
A container is a running instance of that image.

``` text
Docker Image
     ↓
  Container
     ↓
Running App
```

------------------------------------------------------------------------

## 5. What is a Dockerfile?

**Answer:** A Dockerfile is a text file containing instructions used to
build a Docker image.\
It defines the base image, dependencies, files, configuration, and
startup command.

``` text
Dockerfile
    ↓ docker build
Docker Image
    ↓ docker run
Container
```

------------------------------------------------------------------------

## 6. RUN vs CMD vs ENTRYPOINT

**Answer:** `RUN` executes commands while building the image; `CMD`
provides the default command when the container starts.\
`ENTRYPOINT` defines the main executable and is less easily overridden.

``` text
RUN         → Build time
CMD         → Default startup command
ENTRYPOINT  → Main executable
```

------------------------------------------------------------------------

## 7. COPY vs ADD

**Answer:** `COPY` is used for straightforward file copying and is
preferred for most cases.\
`ADD` has extra features such as automatically extracting local tar
archives.

``` text
COPY → Simple file copy
ADD  → Copy + extra features
```

------------------------------------------------------------------------

## 8. Docker Layers / Cache

**Answer:** Docker builds images in layers, and unchanged layers can be
reused from cache during the next build.\
This makes builds faster, so rarely changing instructions should come
before frequently changing ones.

``` text
FROM
 ↓
COPY package.json
 ↓
RUN npm install     ← cached if unchanged
 ↓
COPY source code    ← changes frequently
```

------------------------------------------------------------------------

## 9. Multi-stage Builds

**Answer:** Multi-stage builds use separate build and runtime stages in
the same Dockerfile.\
The final image contains only what is needed to run the application,
making it smaller and more secure.

``` text
Build Stage
Node + npm + source
       ↓
   npm run build
       ↓
Runtime Stage
Only production files
```

------------------------------------------------------------------------

## 10. What is `.dockerignore`?

**Answer:** `.dockerignore` excludes unnecessary or sensitive files from
the Docker build context.\
Common examples are `node_modules`, `.git`, `.env`, and log files.

``` text
Project
 ├─ node_modules  ✕
 ├─ .git          ✕
 ├─ .env          ✕
 └─ src            ✓
```

------------------------------------------------------------------------

## 11. What are Docker Volumes?

**Answer:** Docker volumes persist data independently of a container's
lifecycle.\
For example, a MongoDB volume keeps database data even when the MongoDB
container is deleted.

``` text
MongoDB Container
       ↓
  Docker Volume
       ↓
 Persistent Data
```

------------------------------------------------------------------------

## 12. Docker Networking

**Answer:** Docker networking allows containers to communicate with each
other and with external systems.\
Containers on the same network can communicate using service/container
names.

``` text
Node.js Container
       ↓
 Docker Network
       ↓
MongoDB Container
```

------------------------------------------------------------------------

## 13. Docker Compose

**Answer:** Docker Compose defines and runs multiple containers as one
application using a YAML file.\
For example, React, Node.js, and MongoDB can be started together with
`docker compose up`.

``` text
docker-compose.yml
       ↓
 ┌─────┼─────┐
 ↓     ↓     ↓
React Node  MongoDB
```

------------------------------------------------------------------------

## 14. Container-to-Container Communication

**Answer:** Containers communicate through a shared Docker network using
the service/container name as the hostname.\
For example, Node.js can connect to MongoDB using `mongodb:27017`, not
`localhost:27017`.

``` text
Node.js
   │
   │ mongodb:27017
   ↓
MongoDB
```

------------------------------------------------------------------------

## 15. Environment Variables / Secrets

**Answer:** Environment variables provide configuration to containers
without hardcoding values in application code.\
Sensitive values such as passwords, API keys, and JWT secrets should be
handled as secrets and not committed to Git.

``` text
Environment
   ↓
MONGO_URL
DB_PASSWORD
JWT_SECRET
   ↓
Node.js Container
```

------------------------------------------------------------------------

## 16. Debugging a Container That Exits Immediately

**Answer:** First run `docker ps -a` and then
`docker logs <container_id>` to find the error.\
Also verify `CMD`/`ENTRYPOINT`; if needed, run the container
interactively for deeper debugging.

``` text
Container starts
      ↓
Main process crashes
      ↓
Container exits
      ↓
docker logs <id>
      ↓
Find the error
```

------------------------------------------------------------------------

# Real-world Scenario Questions

## 17. How would you Dockerize React + Node.js + MongoDB?

**Answer:** Create separate Dockerfiles for React and Node.js, use the
official MongoDB image, and manage all three services with Docker
Compose.\
Use a shared network for communication and a volume for MongoDB
persistence.

``` text
Browser
   ↓
React Container
   ↓
Node.js Container
   ↓
MongoDB Container
   ↓
Mongo Volume
```

Example structure:

``` text
my-app/
├── frontend/
│   └── Dockerfile
├── backend/
│   └── Dockerfile
├── docker-compose.yml
└── .dockerignore
```

------------------------------------------------------------------------

## 18. Node.js backend + MongoDB in another container: connection string?

**Answer:** If both containers are on the same Docker network, use the
MongoDB service name as the hostname.\
Example: `mongodb://mongodb:27017/myapp` --- do not use `localhost`.

``` text
backend
   ↓
mongodb:27017
   ↓
MongoDB
```

------------------------------------------------------------------------

## 19. Do you need to rebuild the Docker image after modifying React code?

**Answer:** In development, usually no; bind mounts and hot reload can
reflect source changes without rebuilding.\
In production, usually yes, because React is built into static files
that are packaged into the production image.

``` text
Development:
Code → Bind Mount → Container → Hot Reload

Production:
Code → Build → Docker Image → Deploy
```

------------------------------------------------------------------------

# Quick Interview Revision

-   **Docker** → Packages application + dependencies.
-   **Image** → Blueprint/package.
-   **Container** → Running instance of image.
-   **Dockerfile** → Instructions to build an image.
-   **RUN** → Build-time command.
-   **CMD** → Default startup command.
-   **ENTRYPOINT** → Main executable.
-   **COPY** → Simple file copying.
-   **Layers/Cache** → Reuse unchanged build steps.
-   **Multi-stage** → Smaller production image.
-   **.dockerignore** → Exclude files from build context.
-   **Volume** → Persistent data.
-   **Network** → Container communication.
-   **Compose** → Manage multiple containers.
-   **Secrets** → Protect sensitive configuration.
