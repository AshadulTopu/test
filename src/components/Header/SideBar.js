// import React from "react"
import { useEffect,useState } from "react"
import axios from "axios"

export default function SideBar(){
    const [surahs,setSurahs] = useState([]);
    const [audioFile, setAudioFile] = useState(null);
    const [selectedSurah, setSelectedSurah] = useState(null);
    const [content, setContent] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null);

    const changeSelectedSurah = (id) => {
        setSelectedSurah(id)
        setSelectedContent(id)
    }
    // const changeSelectedContent = (id) => {
    //     setSelectedContent(id)
    // }


    useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapters?language=en")
        .then(function(response) {
            setSurahs(response.data.chapters);
        })
    },[])


    useEffect(() => {
        if(selectedSurah) {
            axios.get(`https://api.quran.com/api/v4/chapter_recitations/2/${selectedSurah}`)
            .then(data => {
                // console.log(data);
                setAudioFile(data.data.audio_file)
            })
        }
    },[selectedSurah])

    useEffect(() => {
        if(selectedContent){
            axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${selectedContent}?language=en&words=false&translations=161&audio=7&tafsirs=true&fields=text_uthmani,verse_number,image_url&page=1&per_page=400`)
            .then(response =>{
                console.log(response);
                setContent(response.data.verses)
            })
        }
    },[selectedContent])


    return (
        <div className="flex">
            <div className="w-1/5 bg-cyan-400 rounded p-2 m-4">
                <ul className="text-left pl-1 ">
                    {
                        surahs.map((chapter)=>(

                    <li key={chapter.id} onClick={() => [changeSelectedSurah(chapter.id),/*changeSelectedContent(chapter.id)*/]} className=" p-2  shadow-md shadow-white-500 text-white hover:bg-white hover:text-black hover:rounded hover:shadow-2xl cursor-pointer transition duration-500   ">
                        <h4 className="font-sans text-xl ">{chapter.id} - {chapter.name_simple} - <small> {chapter.revelation_place} </small></h4></li>
                        ))
                    }
                </ul>
            </div>
            <div className="w-4/5 ">
                <div className="w-full h-40 p-10">
                {
                    audioFile?.audio_url && (
                        <audio src={`${audioFile.audio_url}`} className="fixed" controls />
                    )
                }
                </div>
                <div className="p-10">
                {
                    content.map(info=>(
                    <div>
                        <p className="text-right text-white leading-10 p-2">{info.text_uthmani}</p>
                        <p className=" text-white p-2 leading-10"> <span className="w-6 h-5 p-2  bg-cyan-400 rounded-full ">{info.verse_number}</span>{info.translations[0].text}</p>
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    )}