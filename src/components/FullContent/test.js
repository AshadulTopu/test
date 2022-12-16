import { useEffect, useState } from "react"
import axios from "axios"


export default function HttpRequestDemo() {
    const [surahs, setSurahs] = useState([]);
    const [selectedSurah, setSelectedSurah] = useState(null);
    // const [audioList, setAudioList] = useState([])
    const [audioFile, setAudioFile] = useState(null);

    const changeSelectedSurah = (id) => {
        setSelectedSurah(id)
    }

    useEffect(() => {
        axios.get('https://api.quran.com/api/v4/chapters?language=en')
            .then(function(data){
                setSurahs(data.data.chapters)
            })
    }, [])

    useEffect(() => {
        if(selectedSurah) {
            axios.get(`https://api.quran.com/api/v4/chapter_recitations/2/${selectedSurah}`)
            .then(data => {
                setAudioFile(data.data.audio_file)
            })
            // axios.get(`https://api.quran.com/api/v4/recitations/7/by_chapter/${selectedSurah}?per_page=400`)
            //     .then((data) => {
            //         setAudioList(data.data.audio_files)
            //     })
        }
    }, [selectedSurah])


    // JavaScript Promise => Asynchronous operation

    return (
        <div >
            <h1 className="font-bold text-2xl text-lime-800">HTTP Request Demo</h1>

            <div className="container flex">
                <div className="w-1/5">
                    <ul>
                        {
                            surahs.map(surah => (
                                <li key={surah.id} onClick={() => changeSelectedSurah(surah.id)} className="cursor-pointer my-8">
                                    <em>{surah.name_arabic}</em> {surah.name_simple} - <small>{surah.revelation_place}</small>
                                </li>
                            ))
                        }
                    </ul>
                </div>


                <div className="w-4/5">
                    <h2>Audio file</h2>
                    <div>
                        {
                            audioFile?.audio_url && (
                                <audio src={`${audioFile.audio_url}`} controls />
                            )
                        }
                    </div>
                    {/* <ul> */}
                        {/* {
                            audioList.map(audio => (
                                <li key={audio.verse_key}>
                                    <audio src={`https://verses.quran.com/${audio.url}`} controls />
                                </li>
                            ))
                        } */}
                    {/* </ul> */}
                </div>
            </div>

        </div>
    )
}