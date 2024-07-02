# Nestjs を試す！

簡単なToDoアプリを作成してみます。まあ、全部ChatGPTですが。

## 起動方法

```shell
cp .env.example .env
yarn
yarn start # launching server
```

## ファイルの構造要約

- `src/main.ts` アプリケーションを起動するファイル
- `*.module.ts` アプリケーションのルートモジュール
  - Router とは異なり、controller と provider (service)ファイルを読み込むための index 的な意味合い
  - モジュールを拡張したい場合は`imports`で他のmoduleを入れる
- `*.controller.ts` HTTP リクエストを処理し、適切なサービスメソッドを呼び出す。Router の記述もここで行う。
- `*.service.ts` ビジネスロジックを実装する。DB の CRUD 関連はこのファイルで行う。controller から直接呼び出される。
- `*.entity.ts` データ構造の定義を行う。

## エンドポイント

- `GET` `/todos` ToDo リスト一覧
  - 返り値：Todo の配列
- `GET` `/todos/:id` ToDo 単体データ取得
  - 返り値：ToDo データ
- `POST` `/todos` ToDo データ単体挿入
  - `{title: string; description: string; done: boolean}`
- `PUT` `/todos/:id` ToDo データ単体更新
  - 存在しない id の場合は`404 Not Found`と表示
  - `{title: string; description: string; done: boolean}`
- `DELETE` `/todos/:id` ToDo データ単体削除
  - 存在しない id の場合は`404 Not Found`と表示

## DB について

- 初期状態では、Nestjs に保存する方式であった。しかし、サーバーのリロード（dev時はファイルの編集）で全て消えてしまうため、SQLite に保存するように変更しました。

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
