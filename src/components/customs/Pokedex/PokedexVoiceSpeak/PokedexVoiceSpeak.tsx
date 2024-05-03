"use client";

import Button from '@/components/ui/Button/Button';
import { useEffect, useState } from 'react';
import VoiceIcon from '@/components/Icons/VoiceIcon';
import styles from './PokedexVoiceSpeak.module.scss';
import { usePathname } from 'next/navigation';


type PokedexVoiceSpeakProps = {
    text: string;
}

const PokedexVoiceSpeak = ({ text } : PokedexVoiceSpeakProps) => {
    const pathName = usePathname();
    const [speaking, setSpeaking] = useState<boolean>(false);

    useEffect(() => {
        window.speechSynthesis.cancel();
        return () => window.speechSynthesis.cancel();
    }, [pathName]);

    const speakText = () => {
        if (speaking) {
            window.speechSynthesis.cancel();
            return setSpeaking(false);
        };
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.voice= window.speechSynthesis.getVoices()[2];
            utterance.rate = 1.5;
            utterance.pitch = 10;
            utterance.volume = .5;
            
            utterance.onstart = () => setSpeaking(true);
            utterance.onend = () => setSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };

    

    return (
        <Button onClick={() => speakText()} className={styles.voiceButton}>
            <VoiceIcon className={styles.icon} />
        </Button>
    );
};



export default PokedexVoiceSpeak;