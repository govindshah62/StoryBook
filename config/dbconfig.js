if(process.env.NODE_ENV ==='production'){
    module.exports = {mongoURI:'mongodb+srv://evil:evil123@cluster0.ehcjy.mongodb.net/StoryBook?retryWrites=true&w=majority'}
}else{
    module.exports= {mongoURI:'mongodb://localhost/StoryBook'}
}