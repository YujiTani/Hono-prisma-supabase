# ESLint ルール 一覧

このドキュメントは、`eslint.config.mjs` で設定されている ESLint のルールを一覧化し、各ルールのプロパティ名、設定可能な値、およびその設定がどのような効果を持つかを簡単に解説しています。

---

## 1. `consistent-return`
- **設定可能な値**: `"off"`, `"warn"`, `"error"`
- **現在の設定**: `"off"`
- **効果**:  
  関数が必ず同じ型（値または `undefined`）を返すかどうかをチェック

---

## 2. `no-underscore-dangle`
- **設定可能な値**: `"off"`, `"warn"`, `"error"`
- **現在の設定**: `"off"`
- **効果**:  
  変数名やプロパティ名の前後にアンダースコア（`_`）が付くことを禁止する
---

## 3. `@typescript-eslint/no-unused-vars`
- **設定可能な値**: `"off"`, `"warn"`, `"error"` （オプションオブジェクト付き）
- **現在の設定**:
  ```js
  "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_"
  }]
  ```
- **効果**:  
  未使用の変数を警告として報告 
  - 関数の引数、変数、catch されたエラー、または分割代入された配列の要素で `^_`（アンダースコアで始まるもの）は対象外

---

## 4. `import/extensions`
- **設定可能な値**: `"off"`, `"warn"`, `"error"`
- **現在の設定**: `"off"`
- **効果**:  
  インポート時にファイル拡張子を明示する必要があるかどうかをチェック
  - `"off"` 拡張子の指定不要

---

## 5. `import/prefer-default-export`
- **設定可能な値**: `"off"`, `"warn"`, `"error"`
- **現在の設定**: `"off"`
- **効果**:  
  モジュールが単一のエクスポートの場合、デフォルトエクスポートかチェック

---

## 6. `unused-imports/no-unused-imports`
- **設定可能な値**: `"off"`, `"warn"`, `"error"`
- **現在の設定**: `"error"`
- **効果**:  
  使用されていないインポート文がないかチェック

---

## 7. `import/order`
- **設定可能な値**: `"off"`, `"warn"`, `"error"` （オプションオブジェクト付き）
- **現在の設定**:
  ```js
  "import/order": ["warn", {
      groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],
      pathGroupsExcludedImportTypes: ["builtin"],
      "newlines-between": "always",
      alphabetize: {
          order: "asc"
      }
  }]
  ```
- **効果**:  
  インポートの順序を整理するルール
  - `groups` でインポートの種類をグループ分けし、各グループ間に空行を入れる（`newlines-between: "always"`）。
  - 各グループ内はアルファベット順（`alphabetize.order: "asc"`）で整列

---

## 8. `@typescript-eslint/consistent-type-imports`
- **設定可能な値**: `"off"`, `"warn"`, `"error"` （オプションオブジェクト付き）
- **現在の設定**:
  ```js
  "@typescript-eslint/consistent-type-imports": ["error", {
      prefer: "type-imports"
  }]
  ```
- **効果**:  
  型のインポートで `import type` を使用するかどうかを強制
  - `prefer: "type-imports"` により、型専用のインポート文を推奨

---

## 9. `no-restricted-imports`
- **設定可能な値**: `"off"`, `"warn"`, `"error"` （オプションオブジェクト付き）
- **現在の設定**:
  ```js
  "no-restricted-imports": ["error", {
      patterns: ["./*", "../*"]
  }]
  ```
- **効果**:  
  特定のパターンに合致するインポートを禁止します。  
  - ここでは相対パスの `"./*"` や `"../*"` を禁止

---

## 10. `jest/consistent-test-it`
- **設定可能な値**: `"off"`, `"warn"`, `"error"` （オプションオブジェクト付き）
- **現在の設定**:
  ```js
  "jest/consistent-test-it": ["error", {
      fn: "it"
  }]
  ```
- **効果**:  
  Jest のテスト関数の記述方法をチェック

---
