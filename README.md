# vue_SwipeModal

## Description
スワイプして閉じることのできるモーダルウィンドウです。（通称:
 Swipeable Bottom Sheet）

## DEMO
https://vue-swipe-modal.vercel.app/

## Requirement
| name | version |
| --- | --- |
| nuxt.js | 2.15.3 |
| core-js | 3.9.1 |

## Getting Started
```
<template>
  <div>
    <Swipemodal
      height="50vh"
      width="50%"
      radius="20px"
      notip
    >
      <h1>contents</h1>
    </Swipemodal>
  </div>
</template>
```

| 変数 | データ型 | 初期値 | 説明 |
| --- | --- | --- | --- |
| **v-model** | Boolean | false | モダールの開閉を指定する変数を代入 |
| **height** | String | auto | モーダル高さ |
| **width** | String | auto | モーダルの横幅 |
| **max-height** | String | null | モーダルの高さの最大値 |
| **max-width** | String | null | モーダルの横幅の最大値 |
| **radius** | String | 20px | モダールの上角の丸み |
| **color** | String | #FFFFFF | モダールの背景色 |
| **persistent** | Boolean | false | モーダルの外をクリックした際にモーダルを閉じるか |
| **fullscreen** | Boolean | false | モーダルを画面いっぱいに表示させるか。trueの場合heightは100vhとなる |
| **notip** | Boolean | false | モダール上部にある装飾を表示させないか。trueの場合は表示せず、マウスを使ってスワイプモーションができない 。|

## Installation
