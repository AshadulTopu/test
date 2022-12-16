import { useEffect,useState } from "react";
import axios from "axios";


export default function FullContent(){
    // const [surahsContent,setSurahsContent] = useState([]);
    const [audioFile, setAudioFile] = useState([]);
   

    useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapter_recitations/2/2")
        .then(function(response) {
            setAudioFile(response.data.audio_file);
            
        })
    },[])



    return(
        <div className="w-4/5 ">
            {/* <audio src="" controls></audio> */}
            {
                audioFile?.audio_url && (
                    <audio src={`${audioFile.audio_url}`} controls />
                )
            }
        </div>
        
    )
}