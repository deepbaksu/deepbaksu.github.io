---
title: 슬랙봇 Distribute 가능하게 만들기 (OAuth)
date: 2020-08-17 17:32:54
author: Mo Kweon
tags:
  - Mo Kweon
  - slack
  - bot
  - go
  - oauth
---

딥백수에는 여러 슬랙봇들이 상주하고 있습니다.

![캘리포니아/한국 시간 변환해주는 timebot](./slack-bot/timebot_demo.png)

이렇게 만들어 둔 봇이 유용해서 다른 슬랙 workspace 에서 사용하고 싶을 때가 있습니다. 그러기 위해 distribute 가능하게 봇을 작성해야 합니다. 그러기 위해 OAuth를 사용해야 합니다.

## OAuth 란?

OAuth는 엑세스를 관리하는 방법중에 표준으로 사용되는 방법입니다. A라는 애플리케이션에서 B사이트의 유저 정보가 필요하다면 B사이트로 OAuth Request 를 보내는 방식입니다.

여기서 슬랙봇이 A 애플리케이션이고 슬랙이 B에 해당합니다.

## 실제 Slack 작동 구조

![OAuth](https://a.slack-edge.com/fbd3c/img/api/articles/oauth_scopes_tutorial/slack_oauth_flow_diagram.png)

위 그림에서 구현해야 될게 많은 것으로 보이지만 실제로 `GET /api/oauth?code=XXXXX` 엔드포인트를 서버에 만들어주고 토큰을 저장할 데이터베이스만 있으면 완성입니다.

예를 들어, 유저가 <a href="https://slack.com/oauth/v2/authorize?client_id=288745980535.515443770183&scope=channels:history,channels:join,channels:read,chat:write,chat:write.customize,chat:write.public,commands,dnd:read,emoji:read,groups:history,groups:read,groups:write,im:history,im:read,im:write,links:read,links:write,mpim:history,mpim:read,mpim:write,pins:read,pins:write,reactions:read,reactions:write,reminders:read,reminders:write,remote_files:read,remote_files:share,remote_files:write,team:read,usergroups:read,usergroups:write,users.profile:read,users:read,users:read.email,users:write,app_mentions:read&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a> 이 버튼을 누르고 동의를 하게 되면 timebot 서버로 GET /api/oauth?code=XXXX 리퀘스트를 보내게 됩니다. (step 2 에 해당)

그럼 이 code=XXX 를 사용하여 슬랙 서버에 OAuth 요청을 보내고(step 3) 받은 토큰을 데이터베이스에 저장해주면 됩니다 (step 4).

수도 코드는 아래와 같이 되어 있습니다.

```go
func OauthHandler(writer http.ResponseWriter, request *http.Request) {
  // GET ?code=XXXX 읽음
  code, ok := request.URL.Query()["code"]

  // CODE를 보냄 (POST https://api.slack.com/methods/oauth.v2.access)
  resp, err := getOAuthV2Response(slackClientId, slackClientSecret, code[0], "")

  // TeamID 및 AccessToken 저장
  store(resp.TeamID, resp.AccessToken)

  // ... send ok response
}
```

`POST https://api.slack.com/methods/oauth.v2.access` 의 예시 response

```json
{
  "ok": true,
  "access_token": "xoxb-17653672481-19874698323-pdFZKVeTuE8sk7oOcBrzbqgy",
  "token_type": "bot",
  "scope": "commands,incoming-webhook",
  "bot_user_id": "U0KRQLJ9H",
  "app_id": "A0KRD7HC3",
  "team": {
    "name": "Slack Softball Team",
    "id": "T9TK3CUKW"
  },
  "enterprise": {
    "name": "slack-sports",
    "id": "E12345678"
  },
  "authed_user": {
    "id": "U1234",
    "scope": "chat:write",
    "access_token": "xoxp-1234",
    "token_type": "user"
  }
}
```

이때 TeamID(workspace) 와 코드를 함께 저장해주면 나중에 유저 메시지로부터 반응하는 봇을 만들때 유저 메시지에 포함된 TeamID를 읽어 Access Token 을 DB에서 불러오는 식으로 사용합니다.

![timebot 순서도](./slack-bot/timebot_sequential.svg)

자세한 내용은 https://bit.ly/2Sqdnws 에 참여하셔서 문의주세요 :D
