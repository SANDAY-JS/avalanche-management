export {};

declare global {
    type Song = {
        name: string;
        bpm: number;
        time_signature: '1/4' | '2/4' | '3/4' | '4/4' | '1/2' | '2/2' | '6/8' | '9/8' | '12/8';
        length: number;
        audio: any;
    }
}