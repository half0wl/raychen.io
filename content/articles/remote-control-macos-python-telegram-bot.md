---
title: "Remote-controlling macOS with a Python Telegram bot"
date: 2017-09-20T03:22:46+08:00
draft: false
---

*(This is a mirror of my [post on Medium](https://medium.com/a-chatbots-life/remote-controlling-macos-with-a-python-telegram-bot-d656d2e00226), originally published on 20 Sep 2017.)*

![Screenshot of chatbot in action](/img/1uPw.png#center)

I needed a quick way to remotely perform system operations: adjusting & muting
the system volume, screen brightness, and putting the display to sleep. After
exploring several options, I found none of them to be viable for me, and thus, I set out to develop my own solution.

My requirements were simple, but if I wanted this to be truly remote and accessible anywhere, my only options are the Web or a bot I can send commands to. I decided on the latter because it’s easier to secure than a web app, and I decided on Telegram because it’s widely available and probably the most straightforward.

The full code is available on [Github](https://github.com/half0wl/tg-mac-remote). If you run into any troubles with the steps below, look to the repository as a reference.

# First things first,

We’ll need to create a Telegram bot by speaking to @BotFather. Follow the on-screen instructions: name your bot and choose a username for it, and at the end of the steps, you will be given an API access token. We’ll use this token to interact with Telegram’s API.

> **Tip**: If you don’t want your bot to be discovered, choose a random username or prepend some random characters to it.

Next, create a new Python project and install [`python-telegram-bot`](https://github.com/python-telegram-bot/python-telegram-bot):

```sh
$ mkdir tg-mac-remote && cd tg-mac-remote
$ virtualenv .venv
$ source .venv/bin/activate
$ pip install python-telegram-bot
$ touch bot.py
```

Open `bot.py` in your editor of choice, and we’re ready to get started. Let’s check and see if our bot is working by having it respond to the `/hello` command with our Telegram first name and user ID:

```python
from telegram.ext import Updater, CommandHandler


TELEGRAM_TOKEN = 'your-telegram-token'

def hello(bot, update):
    """
    Greet the user with their first name and Telegram ID.
    """
    user_firstname = update.message.from_user.first_name
    user_id = update.message.from_user.id
    return update.message.reply_text(
        'Hello {}, your Telegram ID is {}'.format(user_firstname, user_id)
    )


if __name__ == '__main__':
    updater = Updater(TELEGRAM_TOKEN)

    updater.dispatcher.add_handler(
        CommandHandler('hello', hello)
    )

    updater.start_polling()
    updater.idle()
```

> **Note**: If you’re unsure how [`python-telegram-bot`](https://github.com/python-telegram-bot/python-telegram-bot) works, check out the “[Getting started](https://github.com/python-telegram-bot/python-telegram-bot#getting-started)” section of their Github repo.

Run `python bot.py` and hit your bot up on Telegram with `/hello`. It should greet you with your Telegram first name and UID. Great! Now our bot is alive and responding. Make a note of your Telegram UID, we’ll be using this to ensure the bot only responds to our commands.

# Before we proceed further...

Let’s take a step back and think about how we can programatically adjust the system volume, display brightness, and turn the display off. How do we do all of that programatically, and with Python?

PyObjC will be the first answer people usually jump to, but there’s an easier way: command line utilities. Instead of trying to manipulate the system natively through PyObjC, we will be calling several command line utilities with Python's `subprocess`.

## osascript, brightness, and pmset

We will use `osascript` to execute AppleScript. Turns out, there’s a ton of stuff we can accomplish with AppleScript. This [article](http://osxdaily.com/2016/08/19/run-applescript-command-line-macos-osascript/) (links to osxdaily.com) gives a nice round-up of what we can do. To set the system volume, we can run:

```sh
$ osascript -e "set Volume n"
```

in a Terminal window to set the system volume to `n`. Handy, isn’t it? I’d think everything we want to accomplish can be done through AppleScript one way or another, and that is true to a certain extent, but most of that involves opening other applications and interacting with the UI through AppleScript. This is rather slow, so we’ll use other CLI utilities more suitable to the operation we wish to perform.

To turn off the display immediately, we can use `$ pmset displaysleepnow`. To adjust screen brightness, we’re going to install brightness and verify that it works:

```sh
$ brew install brightness
$ brightness 0.3  # set display brightness to 30%
```

Now that we have everything thought through, let’s write wrappers for the above utilities.

Create a new file named `commands.py` in the same directory as `bot.py`. We’ll make use of `subprocess.run()` to call the CLI utilities. In each of the functions, we will return a string indicating the action performed for the bot to reply with. All command logic goes here; the bot should only be concerned with calling the appropriate function, passing in any arguments, and replying to the user.

```python
import subprocess


def _osascript(script):
    """
    Execute AppleScript.
    """
    return subprocess.run(
        ['osascript', '-e', str(script)],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )


def vol_mute():
    """
    Grab the current volume status and mute/unmute accordingly.
    `muted.stdout` gives us the output from `_osascript()` in bytes. We decode
    it to UTF-8 and strip any trailing whitespaces. The end result is a string:
    `true` if volume is muted, `false` if not.
    """
    muted = _osascript('output muted of (get volume settings)')
    muted = muted.stdout.decode('utf-8').rstrip()

    if muted == 'false':
        _osascript('set volume output muted true')
        return 'System volume has been muted.'
    elif muted == 'true':
        _osascript('set volume output muted false')
        return 'System volume has been unmuted.'


def vol_set(level):
    """
    Set volume to `level`.
    """
    if 0 <= int(level) <= 100:
        _osascript('set volume output volume {}'.format(level))
        return 'System volume set to {}.'.format(level)
    return 'Volume level must be between 0 and 100.'


def display_brightness(level):
    """
    Set display brightness to `level`.
    """
    if 0 <= int(level) <= 100:
        # `brightness` expects the level to be between 0.1 ~ 1.0, we'll convert
        # it to such and cast it to string for `subprocess.run()`.
        subprocess.run(
            ['brightness', str(int(level)/100)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        return 'Display brightness set to {}.'.format(level)
    return 'Brightness level must be between 0 and 100.'


def display_sleep():
    """
    Put the display to sleep.
    """
    subprocess.run(
        ['pmset', 'displaysleepnow'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    return 'Display has been put to sleep.'
```

> **Note**: `subprocess.run()` is only available in > Python 3.5, so if you’re using an older version, you might have to make the calls another way. Refer to the Python [docs](https://docs.python.org/3/library/subprocess.html#subprocess.run).

# And back to the bot...

Now we can import the functions above for use in `bot.py`, but before that, we’re going to ensure the bot only processes commands from authorized users. You certainly don’t want a bot capable of executing such commands to just listen to anyone, do you? Especially when Telegram bots are public. There’s a neat `@restricted` decorator from [`python-telegram-bot`](https://github.com/python-telegram-bot/python-telegram-bot)’s docs that does exactly what we want:

```python
from functools import wraps


LIST_OF_ADMINS = [
    000000000,  # Replace this with your Telegram UID obtained from the bot's
                # response to the `/hello` command. Note that this should be
                # an int, not a string.
]


def restricted(func):
    """
    This decorator restricts access of a command to users specified in
    LIST_OF_ADMINS.
    Taken from: https://git.io/v5KpI
    """
    @wraps(func)
    def wrapped(bot, update, *args, **kwargs):
        user_id = update.effective_user.id
        if user_id not in LIST_OF_ADMINS:
            print("Unauthorized access denied for {}.".format(user_id))
            # tell the unauthorized user to go away
            update.message.reply_text('Go away.')
            return
        return func(bot, update, *args, **kwargs)
    return wrapped
```

Next, let’s write the command handlers. We have two commands: `/v` for volume, and `/d` for display. Both of them takes exactly one argument:

```sh
/v mute      - Mute or unmute system volume.
/v n(0-100)  - Set system volume to n.
/d sleep     - Put display to sleep.
/d n(0-100)  - Set display brightness to n.
```

We will call the appropriate function according to the argument received. For all other cases, we assume the command is invalid and reply with the command’s syntax. And let’s not forget to restrict these commands to authorized users only with `@restricted`. Translating that into code:

```python
@restricted
def vol_handler(bot, update, args):
    """
    Handle volume (/v) commands.
    /v mute - Mute or unmute system volume.
    /v n(0-100) - Set system volume to n.
    """
    if len(args) == 1:
        if args[0].isdigit():
            return update.message.reply_text(vol_set(args[0]))
        elif args[0] == 'mute':
            return update.message.reply_text(vol_mute())

    return update.message.reply_text('Syntax: /v [mute|<level(0-100)>]')


@restricted
def display_handler(bot, update, args):
    """
    Handle display (/d) commands.
    /d sleep - Put display to sleep.
    /d n(0-100) - Set display brightness to n.
    """
    if len(args) == 1:
        if args[0].isdigit():
            return update.message.reply_text(display_brightness(args[0]))
        elif args[0] == 'sleep':
            return update.message.reply_text(display_sleep())

    return update.message.reply_text('Syntax: /d [sleep|<level(0-100)>]')
```

# Finally...

Add the command handlers to the dispatcher:

```python
if __name__ == '__main__':
    updater = Updater(TELEGRAM_TOKEN)

    updater.dispatcher.add_handler(
        CommandHandler('hello', hello)
    )
    updater.dispatcher.add_handler(
        CommandHandler('v', vol_handler, pass_args=True)
    )
    updater.dispatcher.add_handler(
        CommandHandler('d', display_handler, pass_args=True)
    )

    updater.start_polling()
    updater.idle()
```

And we’re all set! Fire up the bot and take it for a spin.

# What now?

It’s up to you — hack away! The full code is available on [Github](https://github.com/half0wl/tg-mac-remote).

You could add more commands yourself; anything you wish to do remotely with AppleScript and such, you just have to follow through the process outlined above.

Or you could look into other methods for manipulating the system. What about emulating keypresses? Maybe do all of that through AppleScript? For instance, emulating `F1` & `F2` keys for brightness control would eliminate the need for `brightness`.

Or if you’d like to mess around further with Telegram bots, you can look into making a custom keyboard to make it fancier. Admittedly, the status quo is not very user-friendly. Why type commands when you can just press a button?

Or if you want to use this on other platforms (Messenger, Slack, etc.), you can adapt the commands to them easily because they are decoupled from the bot; there’s nothing Telegram-specific in `commands.py`, you can import it for use in whatever. And don’t forget, be careful not to let unauthorized users command your bot.
