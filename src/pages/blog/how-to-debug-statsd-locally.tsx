import Article from '@/components/article'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Code from '@/components/code'
import { hopscotch } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const _: React.FC = () => {
  return (
    <Article
      title="How-to: Debug StatsD locally"
      description="blah"
      slug="/blog/how-to-debug-statsd-locally"
      publishedAt={new Date(2023, 2, 20)}
    >
      <p>
        It's useful to know what StatsD metrics you're sending locally before it
        hits your production metrics sink. Getting a metric name, namespace, or
        data type incorrect in production is annoying - it can mess up metrics
        for a certain time window even after it's fixed. So, I always try to
        test any metric-related changes locally before it hits production.
      </p>
      <p>Assuming this example that sends a few metrics every 2 seconds:</p>
      <Code
        lang="python"
        code={`from time import sleep
import statsd

c = statsd.StatsClient("localhost", 8125)

while True:
    sleep(2)
    c.timing("stats.timed", 1)
    c.incr("foo")`}
      />
      <p>
        You can echo the metrics it's sending by using <code>`netcat`</code> to
        listen for the UDP packets:
      </p>
      <Code
        lang="sh"
        code={`$ nc -ulv -p 8125
Received packet from 127.0.0.1:58916 -> 127.0.0.1:8125 (local)
stats.timed:1.000000|msfoo:1|c`}
      />
      <p>
        <code>`$ nc -ulv`</code> starts <code>`nc`</code> in UDP listening mode:
      </p>
      <ul>
        <li>
          <code>`-u`</code> = UDP
        </li>
        <li>
          <code>`-l`</code> = Listen
        </li>
        <li>
          <code>`-v`</code> = Verbose logs
        </li>
        <li>
          <code>`-p`</code> = Port
        </li>
      </ul>
      <p>
        You can also take this a step further and bake it into your CI process.
        Run an <code>`nc`</code> listener and point your app's StatsD host/port
        at the <code>`nc`</code>
        process, and perform assertions against the output.
      </p>
    </Article>
  )
}

export default _
