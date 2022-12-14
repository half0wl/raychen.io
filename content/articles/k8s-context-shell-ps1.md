---
title: "Kubernetes context in shell"
date: 2022-11-14T15:38:15+01:00
draft: false
---

It's handy to know which Kubernetes cluster you're operating on when working with multiple clusters (ergo different `kubectl` contexts).

I use this function in my `~/.zshrc`:

```sh
__kube_ps1()
{
    KUBECTL_CONTEXT=$(kubectl config current-context)
    if [ -n "$KUBECTL_CONTEXT" ]; then
        export PS1="(kubectl: ${KUBECTL_CONTEXT}) "
    fi
}
alias kubectx=__kube_ps1
```

and invoke it manually with `kubectx`. It changes my shell's `PS1` to the current context:

```sh
$ kubectx
(kubectl: do-sfo3-k8s-1-24-4-do-0-sfo3-...) kubectl get nodes
NAME                   STATUS   ROLES    AGE   VERSION
pool-j0w2l5hgr-mcggw   Ready    <none>   8m    v1.24.4
```

which tells me which cluster I'm operating on.
