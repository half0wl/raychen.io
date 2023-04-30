---
title: "Building effective remote work environments"
slug: "building-effective-remote-work-environments"
publishedAt: "2023-01-11"
keywords: "remote work"
---

I've been fully remote for more than half a decade in a globally distributed
environment. This is everything I've learned on how to make it work
effectively from an organizational perspective.

I'm publishing this because it's the kind of resource I wish I had. This
originally started out as a compilation of scattered notes I've taken over
the years, drawn from personal experiences, talking about remote work with
others, articles and blog posts, public company handbooks, etc.

This is geared towards building fully remote and distributed teams, so some of
the advice in here may not apply or be practical to you especially if you're
remote-and-synchronous. Take from it what you will :-)

> This is incomplete! It will always be a work in progress. I'll be updating
> this as I flesh out more from my notes.

<H2 id="toc">Table of Contents</H2>

* [Communications](#communications)
* [Documentation](#documentation)
* [Working](#working)
* [Logistics](#logistics)
* [Misc.](#misc)

<H2 id="communications">Communications</H2>

<H3 id="async-by-default">Be asynchronous by default</H3>

Meetings and chats are synchronous: it requires all parties to be in the same
room at the same time. This does not work well for remote communications,
especially if you're distributed. **Your start of the day will likely be
somebody's end of the day**. Synchronous communications start to break down
as you become more distributed.

Asynchronous communication fixes that by removing the constraint of requiring
everyone to be in the same room. **Discussions can happen out-of-band, and
anyone can pick up where it was left off**.

This naturally results in **longer-form discussions which
leads to higher quality discussions** because people no longer have to think
and answer on-the-spot. (Think about it: you write better e-mails than text
messages, right? ...Right?)

<H3 id="work-not-presence">Focus on work, not presence</H3>

Chat platforms such as Slack, MS Teams, etc. tend to give an **illusion of
asynchronousity**. Short-form and chat-oriented messaging in general gives an
**expectation of an immediate reply**. If you've ever been pinged for
non-urgent stuff when you're in the middle of something, you know how
distracting it can be! It's super easy to get into this trap and reinforce
it unknowingly.

There isn't much you can do here when using chat platforms. The nature of the
tool itself has a heavy focus on being present and online. **Turning on "Do
Not Disturb" helps**. Tell people it's okay to do that, tell them not to always
expect an immediate reply, and have a clear method for ringing alarm bells for
the truly urgent stuff (force-ping on Slack, etc.)

If you're open to using other communication tools, I highly recommend checking
out threaded conversation platforms such as
[Threads.com](https://threads.com/), [Twist](https://twist.com), or
[Zulip](https://zulip.com/) if you're into open source. They work more like
e-mails than chats, and **makes long-form focused conversations easy**:
it's context-aware, you always know the topic,  you always know where a
conversation starts and where it ends (how far back up did you have to scroll
on Slack the last time you were looped into an ongoing conversation? ;-)).

<H3 id="communicate-explicitly">Communicate explicitly, and intentionally</H3>

It can take **longer to conclude conversations** that are not happening in
real-time, so it helps to **be upfront about the priority of the discussion**.
If you have a timeline or expectation, communicate it clearly. Make sure you
get the message to the relevant parties as early as possible so they can take
the time to respond. Include a sentence like _"It'd be great if everyone can
share their thoughts on this by $DATE"_ in your message if you need to.

**It's hard to read into a person's mood through text alone**. In real life,
we absorb a lot of information about the other person (even unconsciously!)
through body language, facial expressions, and other indicators that are
missing from text. You can try using short-form video messaging tools such as
[Loom](https://loom.com) to augment your communications (it's also great for
short async updates, demos, etc.!)

<H3 id="socialize">Make time for socializing</H3>

Remote work can be isolating for many. Humans are naturally social, and when
you're remote, you miss out on a lot of interactions with your co-workers.

I haven't quite figured this out for myself, but I think having regular social
sessions like a poker night is a great start. You should make it opt-in; don't
force people to socialize! There's also this neat little platform called
[Gather](https://www.gather.town/) that gives you a virtual office you can
decorate, hang out and do stuff in.

This is a very tricky issue to tackle because there is nothing that can
replace real-world connections. You should try to conduct regular company/team
off-sites if your finances allow.

<H2 id="documentation">Documentation</H2>

<H3 id="write">Write, write, write</H3>

Documentation is the single greatest lever you can pull to 10x everything.
I personally think that it's one of the best selling points about remote work.
It gives you a **body of immortalized institutional knowledge** by forcing you to
write and document like nothing else.

<H3 id="source-of-truth">It's your source-of-truth</H3>

Make your documentation the source-of-truth for everything. If somebody on
the other side of Earth needs your expertise, their first thought should be
"**where can I find this in our docs**?", not "It's 3am at Paul's location,
so I'll wait for the next day to work on this." If somebody has a question,
they should first consult your docs, before they consult people.

<H3 id="Tooling">Tooling helps</H3>

I recommend using a dedicated tool for documentation, and keep it simple.
Look for something with:

* A great user and writing experience: you want to _encourage_ writing so your
team doesn't go _"ugh, it's time to use that again,"_
* A sane structure that makes knowledge easy to organize so nothing is ever
blackholed,
* A great search experience so you can always find what you're looking for,
* Stability in terms of product uptime and company: knowledge needs to
be accessible, and don't keep it somewhere that's going to fold.

[Slab](https://slab.com/) and [Slite](https://slite.com/) are two
documentation-focused tools that I enjoyed using. They tick all the boxes
above, they're boring, and they work :-)

[Notion](https://www.notion.so/) is also worth a mention. It's more than a
documentation tool, and it's extremely flexible and powerful. If you already
use Notion for its other features, you should also use it for documentation.

Or you can go ham with this and build your own using a variety of wiki software,
static site generators, etc. I find that [GitBook](https://www.gitbook.com/)
strikes a nice balance here.

<H3 id="update-docs-diligently">Diligently keep docs up-to-date</H3>

Outdated
documentation is not just useless, it can be harmful - it's like using a
previous generation's product manual for the next generation. Certain tools
can help with this by reminding you to check and verify that a document is
up-to-date at specific intervals ([Slab](https://slab.com/) is one). Or
just do a documentation go-over once every quarter.

<H3 id="documentation-is-not-knowledge">Communication is not knowledge</H3>

Please do not treat your communication platform as a wiki/
knowledgebase. It can function as one, but it's the wrong tool. It works,
but it's inefficient.

I came to this realization after pouring time into digging and compiling
information across different Slack conversations and threads, and I wish I'd
have spent a few minutes documenting the conversations after it ended. Heck,
even saving a link to the relevant Slack convo/threads would've saved me
_a lot_ of time.

Aggressively put things into your documentation! If you think there's a slight
chance something may be relevant to others, take a few minutes and put it
there for posterity.

<H2 id="working">Working</H2>

<H3 id="managing-time-zones">Managing time zones</H3>

In a distributed setting, time zone is your primary consideration. How you
deal with it will make or break productivity and communications. Time zones
can be grouped into three buckets based on the variance of your team member's
time zones:

* **Fully Global**: Huge time zone variance, {'≥'}10hrs (e.g. Americas & Asia
Pacific)
* **Global**: Medium time zone variance, {'≥'}3~10hrs (e.g. North America,
South America, & Europe)
* **Local**: Small time zone variance, {'<'}3 hrs (e.g. US West, US East, &
Canada)

Try to always design workflows and processes around **Fully Global**
even if you're not fully global. This is the worst-case complexity; the Big-O.
Anything that works for it will work for the other cases.

You should **define overlap hours** and use them for any synchronous work,
such as weekly planning and 1:1s. You don't need overlap hours every day.
A good rule of thumb I've seen is Mondays for planning, Fridays for high-level
status updates and retro, or you can squeeze both of them into a single day if
your team is fine with it.

<H3 id="check-ins-not-stand-ups">Check-ins, not stand-ups</H3>

There's no productivity reason to requiring synchronous stand-ups conducted via
video calls everyday.

Instead, **get everyone to give a daily check-in on what they did yesterday, what
they're planning to do today, and if they have any blockers.** You can use a
tool like [StatusHero](https://statushero.com) to facilitate this, or you can
simply ask everyone to post in a Slack channel.

This also helps you run teams in a leaner fashion by not requiring everyone to
take a small chunk out of their day just for status updates - that small chunk
everyday can add up to hours every week!

In a traditional stand-up, you're really just sitting around waiting for
everybody to talk. This can take up to half an hour (or even more) depending
on the team size and contents of their update. With a check-in, you get
the same amount of information from everybody in mere minutes, *and* you
can easily look up what someone is doing at any point-in-time by searching for
their update.

<H3 id="planning">Planning</H3>

Or "sprint" / "cycle" planning, depending on the buzz-methodology you're
subscribed to ;-)

Your goal with planning is to make sure everyone is on the same page about
priorities and what actual work is going to happen for the current cycle.
Optionally, you may do a retrospective to go through what was done in
the previous cycle. This can be synchronous or asynchronous. You can conduct
meetings at every start of the cycle, or you can start a thread/conversation
somewhere for discussing what's going to happen.

Meetings tend to work better for this if there are a lot of unknowns and
you're just figuring it out as you move along. It's also nice to have some
face-time together!

You should also use a sane project management tool like
[Shortcut](https://shortcut.com) or [Linear](https://linear.app)
(alternatives: GitHub issues/projects, [Notion](https://notion.so)), and make
sure you move stories or issues into the relevant cycle. The time you spend
on organizing your tool will pay off - it's easier to get a pulse on what's
going on when everything is nicely filed and structured.

A lot of this comes down to experimenting until you find something that works;
it depends on the dynamics of your work, stage of your company, team size,
and length of the cycle. You can either do a departmental all-hands, or break
it out into smaller groups/teams. You can do engineering-wide all-hands. You
can do a mix of them. Don't be afraid to experiment with this to see what works!

<H3 id="meetings">Meetings</H3>

It goes without saying that you should try to keep this to a minimum. If you
need to have a meeting, make sure you have a written pre-read, take notes,
and/or record them! It helps to set the context before the meeting, and there
will be times where you need the contents of a meeting to make it to someone
that is not present.

#### Set the stage with pre-reads

Save time by having everyone go into the meeting with the same level of
knowledge and context on the topic. Tell your participants what is being
discussed, any relevant context or links they should read up on before attending,
and what outcome you're hoping to achieve (does a decision need to be made? Is
this just a quick update? Are you just gathering thoughts/feedback?). If you
have a deck, share it before the meeting.

#### Take notes

Designate a *scribe* for the meeting. They will be responsible for taking down
notes and posting it after. It's usually a good idea to give this to the person
running the meeting as they will have the most context on it. You don't have
to take live notes; you can write down super rough bullet points and expand
on them after the meeting. It's also okay to pause for a minute while you
write things down!

Notes should include what was discussed, and the outcome of the discussion if
any. If the meeting touches on items that not everyone is familiar with, try
to contextualize the notes by adding a quick sentence explaining it or linking
out to resources/docs.

Pair this with a good pre-read to make your meetings lean and productive!

#### Record it for everyone

Recording a meeting lets you re-wind, clarify, and share. You should always
record important meetings - architectural discussions, decisions, all-hands,
etc. Any time you think it's important information that everyone needs to know,
hit the record button!

Your video communication platform likely has recording built-in, so you're just
a button click away from saving everybody time.

Some people may be uncomfortable with being recorded, so make sure you get
everyone's input on this before you introduce it.

<H2 id="logistics">Logistics</H2>

<H3 id="hiring-job-descriptions">Hiring: Job Descriptions</H3>

**Specify where you're hiring in**, and **specify your time zone constraints**.
_"Is this US remote or global remote?"_ is a question you'll receive. If you
need people to be physically located in certain time zones (i.e. you don't
accept candidates living in another time zone that are willing to work in your
specified time zones), you should also state that.

**Mention how compensation works**. Don't list a salary range for a country -
it offers zero context and it can potentially set unrealistic expectations.
Add a "Compensation varies by location" disclaimer if you have to.

Your time is valuable, and those are questions you'll undoubtedly receive, so
just clarify them in the job description and save yourself time.

<H3 id="hiring-compensation">Hiring: Compensation</H3>

Start by figuring out if you want to pay people based on where they're located.

The simplest method I've seen is to apply a Cost of Living (CoL) multiplier to
the base salary you budgeted for. Buffer.com has a
[salary calculator](https://buffer.com/salary-calculator) that does exactly
this. If you want to be more precise, you can research local salaries and pay
a percentage above market rates or a percentile that you pick.

If you're doing CoL/location-adjusted compensation, you should also factor in
what happens if the employee moves to a lower or higher CoL area.

<H3 id="payroll-contractors">Payroll: Contractors on paper</H3>

You can hire employees as contractors on paper, and have them invoice you
periodically. Your employee will need to figure out how they're taxed. In
almost all cases, they will be treated as self-employed and have to file
their taxes according to that status.

For employees: A good starting point for researching this is to look up your
local labour & tax laws for freelancers.

Use [Wise](https://wise.com/) for international payments (it's the cheapest &
fastest), or use a platform for handling contractor payouts.

**WARNING**: This is illegal in certain jurisdictions! In the UK, there is a law
([IR35](https://en.wikipedia.org/wiki/IR35)) that prevents "employees" from
being classified as "contractors" if they perform the *same level of work as
an employee* and *exercise no control over the work*.

Always clarify the legal and tax status of this set-up with the candidate!
If you're both unsure, seek legal advice in their jurisdiction.

<H3 id="payroll-eor">Payroll: Employer-of-Record (EOR)</H3>

You can use an Employer-of-Record (EOR) service such as
[Deel](https://www.deel.com/) or [Remote.com](https://www.remote.com/) to
handle all of this for you. The EOR maintains a legal entity in the
jurisdiction of your employee, and they will "hire" the employee on your
behalf. You will sign a Master Service Agreement (MSA) with the EOR that
assigns all work product, IP, etc. of your employee to you. The working
relationship becomes Employee {'<--'} EOR {'-->'} You.

The EOR will handle things such as payroll, insurance, compliance with local
labour laws, etc. This is the easiest way to hire globally without fuss,
but you do pay a fee for such services, so you should bake this into your
consideration.

<H3 id="payroll-legal-entity">Payroll: Set-up a legal entity</H3>

You can set up a legal entity in the jurisdiction of your employee. I don't
recommend this - it's the hardest and most resource-consuming. You need to be
aware of local labour laws, holidays, payroll/vacation day nuances, taxes,
fund contributions (e.g. retirement, social tax, ...), financial accounting,
etc.

The cost of doing this outweighs the benefits 99% of the time. However, it
might make sense if you have more than >10 employees in the same country/legal
jurisdiction.

<H3 id="cultural-fit">On Cultural Fit</H3>

Remote work isn't for everyone.

When you hire globally, you're drawing talent from **different backgrounds
and cultures**. They might have different ways of working, or a different
attitude towards work. I think this is one of the times where evaluating
"cultural fit" in an interview is super important: you need to make sure
they can work well with the existing team, and succeed! So make sure you
consider this in your hiring pipeline.

**Only hire in time zones your team is comfortable with**. Going out of your
comfort zone with this requires effort on both ends. Hiring far outside a
time zone only works in the long run if you're dilligent about being time zone
agnostic. It works better when the candidate is already experienced with remote
work, ideally in a global setting, and works even better if your team has
experience with it as well.

<H2 id="misc">Misc.</H2>

<H3 id="study-open-handbooks">Study open handbooks</H3>

There are companies with an "open handbook" philosophy where they publicly
document anything from engineering flows, planning, internal processes, etc.
They're interesting resources to study - it helps to look at how others are
running things.

Some of my favorites:
* GitLab - https://about.gitlab.com/handbook/
* 37signals - https://basecamp.com/handbook
* Airbyte - https://handbook.airbyte.com/
* PostHog - https://posthog.com/handbook

For more, check out [Ask HN: What companies have publicly available handbooks?](https://news.ycombinator.com/item?id=34959242)
