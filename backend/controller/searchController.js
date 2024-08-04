const User = require("../models/userSchema")
const { fetchFromTMDB } = require("../services/tmdb")


exports.searchPerson = async (req,res)=>{
    const {query}=req.params
    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US`)

        if(response.results.length==0){
            res.status(404).send(null)
        }

        await  User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"person",
                    createdAt:new Date()

                }
            }
        })

        res.status(200).json({success:true,content:response.results})
    }
    catch(err){
        console.log(err.message)
        res.status(401).json({success:false,message:"Couldn't find person"})
    }
}

exports.searchMovie = async (req,res)=>{
    const {query} =req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`)
        if(response.results.length===0){
            res.status(404).send(null)
        }
        await  User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"movie",
                    createdAt:new Date()

                }
            }
        })

        res.status(200).json({success:true,content:response.results})

    } catch (err) {
        console.log(err.message)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

exports.searchTvShow = async (req,res)=>{
    const {query} = req.params
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US`)
        if (response.results.length===0) {
            res.status(500).send(null)
        }
        await  User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt:new Date()

                }
            }
        })

        res.status(200).json({success:true,content:response.results})


    } catch (err) {
        console.log(err.message)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}


exports.searchHistory = async (req,res)=>{
    try {
        res.status(200).json({success:true, content:req.user.searchHistory})
    } catch (err) {
        console.log(err.message)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

exports.deleteFromSearchHistory = async (req,res)=>{
    let {id}=req.params
    id = parseInt(id)
    try {
        await User.findByIdAndUpdate(req.user._id,{
            $pull:{
                searchHistory:{id:id },
            }
        })
        return res.status(200).json({success:true,message:"Item deleted successfully"})
    } catch (err) {
        console.log(err.message)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}
//https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US     