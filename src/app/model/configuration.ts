export class Configuration {

    public fontColorFocusIn: string;
    public fontColorFocusOut : string;
    public fontSizeFocusIn : string;
    public fontSizeFocusOut : string;
    public minValue : number;
    public maxValue : number;

    constructor() {
        this.fontColorFocusIn = 'blue';
        this.fontColorFocusOut = 'gray';
        this.fontSizeFocusIn = '20px';
        this.fontSizeFocusOut = '15px';
        this.minValue = 0;
        this.maxValue = Number.MAX_SAFE_INTEGER;
    }

}