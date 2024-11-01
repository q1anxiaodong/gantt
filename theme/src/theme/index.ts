// 类型定义
interface Token {
    // token的相关属性
  }
  
  interface ThemeHandler {
    (option: any, token: Token): void;
  }
  
  interface Theme {
    name: string;
    handlers: ThemeHandler[];
    token: Token;
  }
  
  interface ThemeDiff {
    base: string;  // 基础主题的URL或名称
    name: string;
    tokenDiff?: Partial<Token>;
    handlersToAdd?: ThemeHandler[];
    handlersToRemove?: number[];
    handlersToModify?: { index: number, handler: ThemeHandler }[];
  }
  
  // 主题加载器
  class ThemeLoader {
    private static async loadRemoteTheme(url: string): Promise<Theme> {
      try {
        // 动态导入远程主题
        const module = await import(/* @vite-ignore */ url);
        return module.default || module;
      } catch (error) {
        throw new Error(`Failed to load theme from ${url}: ${error}`);
      }
    }
  
    static async load(source: string | Theme): Promise<Theme> {
      if (typeof source === 'string') {
        return await this.loadRemoteTheme(source);
      }
      return source;
    }
  }
  
  // 主题构建器
 export class ThemeBuilder {
    private theme: Theme;
  
    constructor(theme: Theme) {
      this.theme = theme;
    }
  
    // 生成主题代码
    generateCode(): string {
      const code = `
        export default {
          name: "${this.theme.name}",
          handlers: [
            ${this.theme.handlers.map(handler => handler.toString()).join(',\n')}
          ],
          token: ${JSON.stringify(this.theme.token, null, 2)}
        };
      `;
      console.log(`名字${this.theme.name}`, `代码：${code}`);
      
      return code;
    }
  
    // 构建并保存主题
    async build(outputPath: string): Promise<void> {
      const code = this.generateCode();
      // 这里需要实际的文件系统操作
      // 在浏览器环境中可能需要调用后端API
    //   await fs.writeFile(outputPath, code, 'utf-8');
    
    }
  }
  
  // 主题注册管理器
  export class ThemeRegistry {
    private readonly themes: Map<string, Theme> = new Map();
    private readonly themeUrls: Map<string, string> = new Map();
  
    // 注册远程主题
    async registerRemoteTheme(url: string): Promise<void> {
      const theme = await ThemeLoader.load(url);
      this.themes.set(theme.name, theme);
      this.themeUrls.set(theme.name, url);
    }
  
    // 基于差异注册主题
    async registerThemeFromDiff(diff: ThemeDiff): Promise<Theme> {
      // 加载基础主题
      const baseTheme = await ThemeLoader.load(
        this.themeUrls.get(diff.base) || diff.base
      );
  
      const newTheme: Theme = {
        name: diff.name,
        handlers: [...baseTheme.handlers],
        token: { ...baseTheme.token }
      };
  
      // 应用差异
      if (diff.tokenDiff) {
        newTheme.token = { ...newTheme.token, ...diff.tokenDiff };
      }
  
      if (diff.handlersToAdd) {
        newTheme.handlers.push(...diff.handlersToAdd);
      }
  
      if (diff.handlersToRemove) {
        diff.handlersToRemove.sort((a, b) => b - a).forEach(index => {
          newTheme.handlers.splice(index, 1);
        });
      }
  
      if (diff.handlersToModify) {
        diff.handlersToModify.forEach(({ index, handler }) => {
          if (index >= 0 && index < newTheme.handlers.length) {
            newTheme.handlers[index] = handler;
          }
        });
      }
  
      this.themes.set(newTheme.name, newTheme);
      return newTheme;
    }

    getTheme(nameOrUrl: string) {
        return this.themes.get(nameOrUrl);
    }
  }
  
  // 使用示例
  async function example() {
    const registry = new ThemeRegistry();
  
    // 注册远程主题
    await registry.registerRemoteTheme('http://127.0.0.1:5501/theme/mock/base-theme.js');
  
    // 创建差异主题
    const themeDiff: ThemeDiff = {
      base: 'http://127.0.0.1:5501/theme/mock/base-theme.js',
      name: 'custom-theme',
      tokenDiff: {
        color: 'green'
      },
      handlersToAdd: [
        (option, token) => { 
            console.log('custom');
         }
      ]
    };
  
    // 注册差异主题
    const newTheme = await registry.registerThemeFromDiff(themeDiff);
  
    // 构建新主题
    const builder = new ThemeBuilder(newTheme);
    
    // 生成代码
    const code = builder.generateCode();
    
    // 构建并保存
    await builder.build('/path/to/output/custom-theme.js');
  }
  
  // 工具函数：创建主题差异
  function createThemeDiff(baseUrl: string, modifications: Partial<ThemeDiff>): ThemeDiff {
    return {
      base: baseUrl,
      name: modifications.name || 'custom-theme',
      ...modifications
    };
  }