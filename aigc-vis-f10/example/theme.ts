interface ThemeParser {
    name: string;
    needToParse: (option) => boolean;
    handler: (option, chart, optionToken) => void;
}

