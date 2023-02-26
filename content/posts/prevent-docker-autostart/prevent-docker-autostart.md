---
title: "Prevent Docker from auto-restarting *all* containers"
slug: /writing/prevent-docker-from-auto-restarting-containers
date: 2022-11-14
tags:
  - docker
---

```sh
$ docker update --restart=no $(docker ps -a -q)
```

I needed this because:

* I have a bunch (...a lot) of docker containers with a `restart-policy` of `always`. It makes Docker startups resource-consuming, and makes `$ docker ps` much harder to parse than it should be.
* I don't need all the containers running; I usually do a `$ docker-compose up -d` in the respective project when I need them, so having all of the containers running seemed like a waste of resources.
* Most of my containers have a `restart=always` policy defined in its compose file, so going back to change them individually is way too time-consuming!

The nifty command above solves that by modifying **all** containers' `restart-policy` to `no`.
