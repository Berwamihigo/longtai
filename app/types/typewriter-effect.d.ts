declare module 'typewriter-effect' {
    import { Component } from 'react';

    interface TypewriterOptions {
        strings?: string[];
        autoStart?: boolean;
        loop?: boolean;
        delay?: number;
        deleteSpeed?: number;
        cursor?: string;
        onStringTyped?: (stringIndex: number) => void;
        onLastStringBackspaced?: () => void;
        onTypingEnd?: () => void;
        onRemoveNode?: () => void;
        pauseFor?: number;
        devMode?: boolean;
        wrapperClassName?: string;
        cursorClassName?: string;
    }

    interface TypewriterProps {
        options: Partial<TypewriterOptions>;
    }

    class Typewriter extends Component<TypewriterProps> { }

    export default Typewriter;
} 