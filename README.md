# dl4ab.github.io

![Deployment Check](https://github.com/dl4ab/dl4ab.github.io/workflows/Deployment%20Check/badge.svg)

GitHub page for 딥백수 입니다. [Hexo](https://hexo.io/docs/tag-plugins) 를 사용해 블로깅을 하고 있습니다. 사용 가능한 Hexo 태그들은 https://hexo.io/docs/tag-plugins 에서 확인해 주세요.

## How to create a new post

```shell
git clone https://github.com/dl4ab/dl4ab.github.io.git

# 새로운 브랜치 생성
git checkout -b branch_name

# 패키지 설치
npm install

# <title> 이름을 가진 디렉토리 1개와 마크다운 파일 1개가 생성됨.
# - source/_posts/<title>/
# - source/_posts/<title>.md
npx hexo new <title> 

git add source/_posts/<title>*

# Prettier 포맷하기
npm run format

# 문제 여부 확인하기
npm run check 

git commit -m "Create a new blog post <title>"
git push -u origin HEAD
```
