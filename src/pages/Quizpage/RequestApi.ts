import { useState,useEffect } from 'react';
import { quizQuestions } from '../../data/types/quiz'
export function RequestApi(genre: string | null) {
    const [serverData, setServerData] = useState<quizQuestions[]>()
    useEffect(() => {
        fetch(`https://quizzerd-backend.herokuapp.com/${genre}`)
        .then(response => response.json())
        .then(data => setServerData(data[`${genre}questionlist`]))
        
    }, [genre]);
    console.log(serverData);
    
    return serverData
}