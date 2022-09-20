export {TimeSignatureType, ToastType};

type ToastType = {success: Function, loading: Function, error: Function, custom: Function, dismiss: Function, remove: Function}
type TimeSignatureType = '4/4' | '2/2' | '2/4' | '6/8' | '12/8' | '3/4' | '3/2' | '3/8';

declare global {
    type Song = {
        title: string;
        bpm: number;
        time_signature: TimeSignatureType;
        length: number;
        audio_path: string;
    }
}