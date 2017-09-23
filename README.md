# voice-todo
Voice Todos Desktop Application.

## Description
The app provides simple todos but it has a interesting point. It's "Voice".
You can input your todo to speak it throgh your laptop.
The app speaks your todos after you completed them.

## Screen Shot
![Voice Todos !](https://user-images.githubusercontent.com/12680679/30033840-5e802db2-91d0-11e7-8a43-2040321c00f2.png "Voice Todos !")

## Requirement
If you use full features in the app, you need to get your google api key. Refer to the following simple steps.

### How to get your google api key
1. Go to [Google Developer Console](https://console.developers.google.com/) and make your key.
1. Connect your api key to 'Speech API' in the site. If you can't find it, join [Chromium developer group](https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev), and you can find it.

## Let's start!
Set up
```
$ git clone https://github.com/keidrun/voice-todo.git
$ cd voice-todo
$ touch config.js
$ echo "GOOGLE_API_KEY='[YOUR API KEY]';" > config.js
```
Run
```
$ npm run production
```
Or Run as 'app' on Mac
```
$ npm run build
$ open build/Voice\ Todos\ \!-darwin-x64/Voice\ Todos\ \!.app
```
Or Run as 'exe' on Windows
```
> npm run build
> &"build\Voice Todos !-win32-x64\Voice Todos !.exe"
```

## NOTE
Your todos are saved in the following file on Mac.
```
/Users/yourusername/Library/Application\ Support/voice-todo/storage/todos.json
```
