import * as CSS from 'csstype';
interface CSSProperties extends CSS.Properties<string | number> {
}
declare type StyleValue = CSSProperties | Array<StyleValue>;
interface argInterface {
    model: boolean;
    traget: string;
    enter?: {
        duration: number;
        from: StyleValue;
        to: StyleValue;
    };
    leave?: {
        duration: number;
        from: StyleValue;
        to: StyleValue;
    };
}
/**
 * 独自Transition関数
 */
export declare const transition: (arg: argInterface) => void;
export {};
//# sourceMappingURL=transition.d.ts.map