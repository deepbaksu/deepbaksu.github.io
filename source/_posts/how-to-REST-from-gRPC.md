---
title: how-to-REST-from-gRPC
date: 2021-05-01 21:43:00 PST
author: Mo Kweon
tags:
  - gRPC
  - Go
  - REST
---

gRPC를 통해 REST 서버를 만들어 보자.  gRPC 클라이언트로 연결할 수 있으면 좋지만, REST가 보편적이기 때문에 REST API를 구현해줘야 할 필요가 있다. 또한, Heroku에서는 HTTP/2 를 지원하지 않기 때문에 gRPC 를 사용할 수 없어, 어쩔 수 없이 HTTP/1.1 REST API를 노출해줘야 한다.

## Why gRPC?

gRPC는 Protocol Buffer를 사용해 정의한다. Protocol Buffer를 사용해서 정의해두면 클라이언트와 서버 코드 모두 생성 가능해 전송되는 데이터의 형식에 대해서 걱정하지 않아도 된다.

예를 들어, 클라이언트에서는 underscore 인줄 알고 보냈는데

```json
{
  "my_name": "ABC"
}
```

서버에서는 camelCase의 형식으로 생각하고 적을 수 도 있다.

```json
{
  "myName": "ABC"
}
```

또한, API를 먼저 protobuf로 정의해두어야 하기 때문에 API first development가 가능하다.
거기에, OpenAPI 스펙 또한 생성 가능해서 Swagger Documentation 또한 쉽게 가능하다.


## How?

![Overview](./how-to-REST-from-gRPC/overview.svg)