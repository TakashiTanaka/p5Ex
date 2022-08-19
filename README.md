# p5Ex

p5.jsの拡張機能ライブラリ

## 作業方法

スケッチを描きながら並行してすすめる。もしスケッチを描いてp5exに変更を加えた場合はpublishする

## publish方法

デプロイとpublishはGitHub Actionで設定済み。

`npm version [ここにmajor/minor/patchいずれか]`でversionを上げる。

その後、mainにpushしたらpublishできる。

## 分類

### Extension

p5.jsのビルトイン関数をより使いやすく拡張したもの。
接頭辞としてexがつく。

### Function

p5.jsのビルトイン関数にはない、特殊な関数群

### Object

オブジェクト。
クラスになっている。

### Utility

便利な機能群。
クラスになっているもの
