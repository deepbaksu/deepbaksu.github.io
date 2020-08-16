# dl4ab.github.io

![source_to_master](https://github.com/dl4ab/dl4ab.github.io/workflows/source_to_master/badge.svg)

GitHub page for 딥백수

## How to create a new post

```shell
git clone https://github.com/dl4ab/dl4ab.github.io.git

# 새로운 브랜치 생성
git checkout -b branch_name

# 패키지 설치
npm install

# source/_posts/<title>.md 파일이 생성됨.
hexo new post <title>

# 위 파일 작성 후커밋 푸시 후 PR 보내주시면 됩니다.
git commit -am "Create a new blog post <title>"
git push -u origin HEAD
```
