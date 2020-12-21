  var countryName="";
  var countries=[];
  var random_country="";
  var numberOfCountries = "";


    function getCodes(){

        setTimeout(function() {
             $('#myModal').fadeOut('fast');
        }, 2000);
    
    var request = new XMLHttpRequest()

    request.open('GET', 'https://restcountries.eu/rest/v2/all', true);
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    //console.log(data);
    numberOfCountries = data.length;
        for (var i =0;i<=data.length-1;i++) {
            //$('.root').append(data[i].alpha2Code+"<br>");
            countries.push(data[i].alpha2Code);

        }
    
    //alert(random_country);
    getCountryData();

     
}

request.send()

}

 function getCountryData(){
    
    var request = new XMLHttpRequest()

    random_country = countries[Math.floor(Math.random() * numberOfCountries)];

    request.open('GET', 'https://restcountries.eu/rest/v2/alpha/'+random_country, true);
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    console.log(data);

    $(".flag_name").html("<img id='clipart_image'src='"+data.flag+"'>"+"<br>"+data.name);

    countryName = data.name;

    if(data.gini==null||data.gini=="-"){
        var gini_index="N/A";
    }else{

        var gini_index=data.gini+"%";
    }

    if(data.area==null||data.area=="-"){
        var area="N/A";
    }else{

        var area=data.area+" Km<sup>2</sup>";
    }

  /*  for (var i=0;i<=data.languages.length-1; i++) {
        
        var languages = data.languages[i].name;
    }
    
    alert(languages);*/

    $('.root').html("Capital - "+data.capital+"<br>"+"Region - "+data.region+"<br>"+"Sub-region - "+data.subregion+"<br>"+"Area - "+area+"<br>"+
        "ISD code  "+"+"+data.callingCodes[0]+"<br>"+"Timezone - "+data.timezones[0]+"<br>"+"<hr>"+"<b>"+"Currency"+"</b>"+"<br>"+
      "<span>Name - "+data.currencies[0].name+"</span>"+"<br><span>Code - "+data.currencies[0].code+"</span>"+
      "<br><span>Symbol - "+data.currencies[0].symbol+"</span><hr>"+"Population - "+data.population.toLocaleString()+
      "<br>Gini index - "+gini_index+"<br>"+"Native name - "+data.nativeName+"<br>"+"Country codes - "+data.alpha2Code+", "+data.alpha3Code+"<br>");

       var myLatlng = new google.maps.LatLng(data.latlng[0],data.latlng[1]);

      var mapProp= {
      center: myLatlng,
      zoom:5,
      };
   
      var map = new google.maps.Map(document.getElementById("map"),mapProp);

      getStatesData()

}

request.send()


}

 function getStatesData(){
    
    var request = new XMLHttpRequest();

    request.open('GET', 'states.json', true);
    request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    //console.log(data);
    var countOfStates = 0;
     $('.root').append("<hr>"+"<b>"+"States & Regions"+"</b>"+"<br>");
     
    for (var i=0;i<=data.length-1;i++) {
        
        if(data[i].country_code==random_country){

        $('.root').append(data[i].name+"<br>");

        countOfStates++;

    }

    }

    $('.root').append("Total - "+countOfStates+"<br>"+"<hr>");
    $('.root').append("<a target='_blank' href='https://en.wikipedia.org/wiki/"+countryName+"'"+">Know more on wikipedia</a>");

}

request.send()


}
