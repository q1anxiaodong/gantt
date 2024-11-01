import * as lib from "../dist/bundle.esm.js";

// 使用示例
async function example() {
  const registry = new lib.ThemeRegistry();

  // 注册远程主题
  await registry.registerRemoteTheme(
    "http://127.0.0.1:5501/theme/mock/base-theme.js"
  );

  // 创建差异主题
  const themeDiff = {
    base: "http://127.0.0.1:5501/theme/mock/base-theme.js",
    name: "custom-theme",
    tokenDiff: {
      color: "green",
    },
    handlersToAdd: [
      (option, token) => {
        console.log("custom");
      },
    ],
  };

  // 注册差异主题
  const newTheme = await registry.registerThemeFromDiff(themeDiff);

  // 构建新主题
  const builder = new lib.ThemeBuilder(newTheme);

  // 生成代码
  const code = builder.generateCode();

  // 构建并保存
  window.theme = newTheme;
  window.registry = registry;
}

example();
