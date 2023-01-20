# Hacker News
## Description
Hacker news app made with React Native. This app display new posts list with infinite scroll.

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 14](https://developer.apple.com/xcode)
- [Cocoapods 1.11.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Installation
- Once you have downloaded or cloned this repository, run `yarn install` inside the directory.
- To run app on android, run `yarn android` in project directory.
- To run app on ios, install pods in ios directory run `cd ios && pod install`, then run run `yarn ios` in project directory.


## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [react-native-config](https://github.com/luggit/react-native-config) to manage envionments.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [@reduxjs/toolkit](https://github.com/reduxjs/redux-toolkit.git) for state management and dispatch asynchronous actions.
- [react-native-webview](https://github.com/react-native-webview/react-native-webview) to display webview from url.
- [moment](https://github.com/moment/moment) for parsing, validating, manipulating, and formatting dates.

## Project Structure
```
Hacker News
├── __tests__
├── android
├── ios
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── constants
│   ├── hooks
│   ├── navigators
│   ├── screens
│   ├── store
│   ├── theme
│   ├── utils
├── .env
├── .gitignore
├── .eslintrc.js
├── .ruby-version
├── .watchmanconfig
├── app.json
├── App.tsx
├── babel.config.js
├── Gemfile
├── index.js
├── tsconfig.json
├── metro.config.js
├── README.md
├── package.json
├── yarn-lock.json
```

## API Overview
[Hacker News API](https://github.com/HackerNews/API)
### New Stories
Up to 500 top and new stories are at `/v0/topstories` (also contains jobs).

Example: https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty

```javascript
[ 9129911, 9129199, 9127761, 9128141, 9128264, 9127792, 9129248, 9127092, 9128367, ..., 9038733 ]
```

### Story Items
Stories, comments, jobs, Ask HNs and even polls are just items. They're identified by their ids, which are unique integers, and live under `/v0/item/<id>`.

All items have some of the following properties, with required properties in bold:

Field | Description
------|------------
**id** | The item's unique id.
deleted | `true` if the item is deleted.
type | The type of item. One of "job", "story", "comment", "poll", or "pollopt".
by | The username of the item's author.
time | Creation date of the item, in [Unix Time](http://en.wikipedia.org/wiki/Unix_time).
text | The comment, story or poll text. HTML.
dead | `true` if the item is dead.
parent | The comment's parent: either another comment or the relevant story.
poll | The pollopt's associated poll.
kids | The ids of the item's comments, in ranked display order.
url | The URL of the story.
score | The story's score, or the votes for a pollopt.
title | The title of the story, poll or job. HTML.
parts | A list of related pollopts, in display order.
descendants | In the case of stories or polls, the total comment count.

For example, a story: https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty

```javascript
{
  "by" : "dhouston",
  "descendants" : 71,
  "id" : 8863,
  "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
  "score" : 111,
  "time" : 1175714200,
  "title" : "My YC app: Dropbox - Throw away your USB drive",
  "type" : "story",
  "url" : "http://www.getdropbox.com/u/2/screencast.html"
}
```

