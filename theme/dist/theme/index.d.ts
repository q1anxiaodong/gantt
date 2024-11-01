interface Token {
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
    base: string;
    name: string;
    tokenDiff?: Partial<Token>;
    handlersToAdd?: ThemeHandler[];
    handlersToRemove?: number[];
    handlersToModify?: {
        index: number;
        handler: ThemeHandler;
    }[];
}
export declare class ThemeBuilder {
    private theme;
    constructor(theme: Theme);
    generateCode(): string;
    build(outputPath: string): Promise<void>;
}
export declare class ThemeRegistry {
    private readonly themes;
    private readonly themeUrls;
    registerRemoteTheme(url: string): Promise<void>;
    registerThemeFromDiff(diff: ThemeDiff): Promise<Theme>;
    getTheme(nameOrUrl: string): Theme;
}
export {};
