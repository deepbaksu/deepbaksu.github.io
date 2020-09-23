# 딥백수 블로그

![Deployment Check](https://github.com/dl4ab/dl4ab.github.io/workflows/Deployment%20Check/badge.svg)

GitHub page for 딥백수 입니다. [Hexo](https://hexo.io/docs/tag-plugins) 를 사용해 블로깅을 하고 있습니다. 사용 가능한 Hexo 태그들은 https://hexo.io/docs/tag-plugins 에서 확인해 주세요.

## 새로운 포스트 생성하기

```shell
git clone https://github.com/dl4ab/dl4ab.github.io.git

# 새로운 브랜치 생성
git checkout -b branch_name

# 패키지 설치
npm install

# <title> 이름을 가진 디렉토리 1개와 마크다운 파일 1개가 생성됨
# - source/_posts/<title>/
# - source/_posts/<title>.md
npx hexo new <title>

# <title>.md 파일에 post 를 작성
# <title> 디렉토리에는 image 등 post 에 필요한 파일을 저장

# post 작성 후 pull request 를 위한 git 작업 시작
git add source/_posts/<title>*

# Prettier 포맷하기
npm run format

# 문제 여부 확인하기
npm run check

git commit -m "Create a new blog post <title>"
git push -u origin HEAD
```

## 로컬 서버 돌려보기

새로운 글을 작성하면 실제로 어떻게 나타나는지 `npm run server` 를 실행해주세요.

## Hexo 태그 살펴보기

사용가능한 Hexo 태그들은 [Hexo - Tag Plugins](https://hexo.io/docs/tag-plugins)을 확인해주세요.

## 스타일 가이드

1. 각 포스트 헤더에 다음과 같이 작성자 명을 적어주세요. 그러면 작성자 명을 통해 이전 글들을 찾아볼 수 있게 됩니다.

   ```
   author: Mo Kweon
   tags:
       - Mo Kweon
   ```

1. image 태그를 사용할 때는 항상 `alt` 태그를 적어주세요

   ```
   ![이미지 설명](image path)
   ```

1. 각 문단의 헤딩은 `##` 로 시작합니다. 왜냐하면 포스트 제목이 `<h1>` 으로 변환되기 때문입니다. 그래서 각 헤딩은 `<h2>` 에서 시작하도록 `##` 를 사용해주세요.

   ```
   ---
   title: Blah Blah
   ---
   ## Heading 1
   본문 blah blah
   ```

1. 같은 기능이라면 마크다운에 존재하는 태그를 가장 우선시합니다 (e..g, `![image description](./image.png)`). 마크다운에 없는 기능이 필요하다면 Hexo 태그에 원하는 기능이 있는지 찾아보고 없다면 HTML 순 입니다. HTML 을 사용하실 때는 스타일은 CSS 에 맡겨주세요 (e.g., `<center>` 같은 태그는 더이상 valid HTML 이 아닙니다. `<div style="text-align: center">` 해주세요).

   ```
   ![이미지 설명](image path)

   <div style="text-align: center">
     <img alt="sjfklaj" src="./image.png">
   </div>
   ```

이상 입니다. 모르셔도 코드 리뷰 해드릴테니 걱정하지 마시고 Pull Request 보내주세요!
