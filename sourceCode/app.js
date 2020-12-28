path = require('path');
express = require('express');
hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherReport = require('./utils/weatherReport');

const app = express();
const port = process.env.PORT || 5000;

//define paths for express config
const dir =  path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partials = path.join(__dirname,"../templates/partials");

//set up handle bars engine and views
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partials);

//set up static directory to serve
app.use(express.static(dir));

app.get('',(req,res)=>{
   res.render('index',{title:'Weather',name:'Raghav Anand'});
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'About', name:'Raghav Anand',author:"Raghav Anand"});
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help', name:'Raghav Anand',
        helpContent:"Please get in touch with author for any kind of help"
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Address must be provided"
        });
    }
    geocode(req.query.address,(error, locationDetails={})=>{
        if(error){
            return res.send({
                error:error + " There was an error geting location details for " + req.query.address
            });
        }
        weatherReport(locationDetails,(error,weatherData={})=>{
            if(error){
                return res.send({
                    error:"There was an error in getting weather details for location "
                    + locationDetails.longitude + "," + locationDetails.lattitude
                });
            }
            res.send({
                forecast:weatherData.currently.summary,
                temperature: weatherData.currently.temperature,
                feelsLike:weatherData.currently.apparentTemperature,
                location: locationDetails.location,
                address: req.query.address
                //feelsLike : weatherData.currently.apparentTemperature
            });
        });
    });    
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide search term"
        });
    }

    console.log(req.query);
    res.send({
        products:[]
    });
});

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Raghav Anand',
        errorContent:'The help for this text is not available.'
    });
});

app.get('*',(req,res)=>{
    res.render('error',{
        title: '404',
        name: 'Raghav Anand',
        errorContent:'Page Not Found'
    });
});
    
app.listen(port, ()=>{
    console.log('Server is up on port '+ port);
}); 
