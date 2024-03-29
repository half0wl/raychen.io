---
title: "Displaying current Kubernetes context in shell"
slug: "display-current-k8s-context-in-shell"
publishedAt: "2022-11-14"
keywords: "kubernetes, context, shell, prompt"
---

When working with multiple Kubernetes clusters, you need to know which cluster
you're operating on. Accidentally issuing a command to the wrong cluster can
be disastrous!

Instead of remembering what's currently set in `KUBECTL_CONTEXT`, I inject it
into my shell's prompt using this function:

```bash
# ~/.zshrc
__kube_ps1()
{
    KUBECTL_CONTEXT=$(kubectl config current-context)
    if [ -n "$KUBECTL_CONTEXT" ]; then
        export PS1="(kubectl: ${KUBECTL_CONTEXT}) "
    fi
}
alias kubectx=__kube_ps1
```

I can then invoke that function to change my session's PS1 to the current
context set in `KUBECTL_CONTEXT`:

```sh
$ kubectx
(kubectl: do-sfo3-k8s-1-24-4-do-0-sfo3-...) kubectl get nodes
NAME                   STATUS   ROLES    AGE   VERSION
pool-j0w2l5hgr-mcggw   Ready    <none>   8m    v1.24.4
```
