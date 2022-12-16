// import React from "react"
import { useEffect,useState } from "react"
import axios from "axios"

export default function SideBar (){
    const [surahs,setSurahs] = useState([]);
    const [audioFile, setAudioFile] = useState(null);
    const [select, setSelect] = useState(null);

    const changeSelectedSurah = (id) => {
        setSelect(id)
    }


    useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapters?language=en")
        .then(function(response) {
            setSurahs(response.data.chapters);
        })
    },[])


    useEffect(() => {
        if(select) {
            axios.get(`https://api.quran.com/api/v4/chapter_recitations/2/${select}`)
            .then(data => {
                setAudioFile(data.data.audio_file)
            })
        }
    }, [select])


    return (
        <div className="flex">
            <div className="w-1/5 bg-cyan-400 rounded p-2 m-4">
                <ul className="text-left pl-1 ">
                    {
                        surahs.map((chapter)=>(

                        <li key={chapter.id} onClick={() => changeSelectedSurah(surahs.id)} className=" p-2  shadow-md shadow-white-500 text-white hover:bg-white hover:text-black hover:rounded hover:shadow-2xl transition duration-500   ">
                        <a className="font-sans text-xl "  href="">{chapter.id} {chapter.name_simple} - <small> {chapter.revelation_place} </small></a></li>
                        ))
                    }
                </ul>
            </div>
            <div className="w-4/5 ">
            {/* <audio src="" controls></audio>
             */}
                {
                    audioFile?.audio_url && (
                        <audio src={`${audioFile.audio_url}`} controls />
                    )
                }
            </div>
        </div>
    )}