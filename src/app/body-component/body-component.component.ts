import { Component, OnInit } from '@angular/core';
import { MyNewServiceService } from './../my-new-service.service';

@Component({
  selector: 'app-body-component',
  templateUrl: './body-component.component.html',
  styleUrls: ['./body-component.component.css']
})
export class BodyComponentComponent implements OnInit {


  // title: string = 'My first AGM project';
  // lat: number = 51.678418;
  // lng: number = 7.809007;

public dob: string;
public age:any;
public vage:any;
public vechage:string;
public vehicleType:number;
public predictionResult:any;

public lat1:number;
public lng1:number;
public location:any;

public wDetails:any;
public loacationDeatails:any;
public jsonBody:any={};
public speedRange:any="";
//public input: number=500;
public mymodel:number=60;
public max = 120;
public stateDettails:any;
public sex:any;
public sectors = [
{
  from:0,
  to:60,
  color:'green'
},
  {
  from: 60,
  to: 90,
  color: 'orange'
}, {
  from: 90,
  to: 120,
  color: 'red'
}];


//private speedMap:Map<string,string> = new Map([["SC1","80"],["SC2","65-80"],["SC3","55-64"],["SC4","41-54"],["SC5","31-40"],["SC5","31-40"],["SC6","21-30"],["SC7","6-20"],["SC8","<6"]]);

private speedMap:Map<string,number> = new Map([["SC1",80],["SC2",73],["SC3",60],["SC4",48],["SC5",36],["SC6",26],["SC7",13],["SC8",3]]);

private weatherConditionMap:Map<string,number> = new Map([["Clear",0],["Cloudy",1],["Fog",2],["Rain",3],["Snow",4],["Freeze",4],["Strong Wind",5]]);



//lat: number = 51.678418;
//lng: number = 7.809007;

  constructor(public myNewServiceService: MyNewServiceService) {

 }

    ngOnInit() {

      this.myNewServiceService.getStateDetails().subscribe(result=>{
      this.stateDettails=result;
      //console.log(this.stateDettails.get("Idaho"));
      //this.transferData=result;

//       this.stateDettails.forEach(element => {
//     console.log((element.STATE));
// });

    });
  }
  calculateVAge()
  {
    let diffInMs: number = Date.now() - Date.parse(this.vechage);
  this.vage=Math.floor((diffInMs / (1000 * 3600 * 24))/365);
  }

  getGeoLocation()
  {
    navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    // in your case
    this.fetchDetails(position.coords.latitude,position.coords.longitude);
});
  }
  getLocation()
  {
    console.log("Hey There From Get Location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }

   showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    console.log(position.coords.latitude);
    //this.lat= position.coords.latitude;
    //this.lng=position.coords.longitude;
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&key=AIzaSyAPFYjW4q5sc5wNtyuEB6cV5fLLgtkxve0";
    this.fetchDetails(position.coords.latitude,position.coords.longitude);

    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}
 showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

fetchDetails(a,b)
{
  this.myNewServiceService.getWeatherDetails( a,b).subscribe(data=>{
    this.wDetails=data;
    console.log(this.wDetails);
  });

  this.myNewServiceService.getLocationDeatils(a,b).subscribe(data=>{
    console.log(data.Response.View[0].Result[0]);
    this.loacationDeatails=data.Response.View[0].Result[0];
    this.speedRange=this.speedMap.get(this.loacationDeatails.Location.LinkInfo.SpeedCategory);

    //console.log(this.loacationDeatails);
  });
}

public getPrediction()
{

  this.jsonBody.GENDER=this.sex;
  this.jsonBody.AGE=this.age;
  this.jsonBody.PASSTYPE=1; //Predefined

  if(this.wDetails!=undefined)
  this.jsonBody.WEATHER=this.weatherConditionMap.get(this.wDetails.weather[0].main);
  else
  this.jsonBody.WEATHER=1
  this.jsonBody.VEHAGE=this.vechage;

  this.jsonBody.VEHTYPE=Number(this.vehicleType);

  this.jsonBody.VEHSPEED=this.mymodel;

  this.jsonBody.ROUTE=this.loacationDeatails.Location.LinkInfo.FunctionalClass;

  this.jsonBody.ROADFEAT=1; //Predefined

  this.jsonBody.REQUID=102541; // Any Random Number

  this.stateDettails.forEach(element => {
    //  console.log((element.STATE));

      if(this.loacationDeatails.Location.Address.State==element.state)
      this.jsonBody.state=element.state;



 });
 console.log(this.jsonBody);

this.predictionResult=this.myNewServiceService.getPrediction(this.jsonBody);



  //alert("Done.. Check Your Prediction Now Below");
}

zoom: number = 8;

  // initial center position for the map
  lat: number = 18.36245;
  lng: number = -66.56128;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    this.fetchDetails(this.lat,this.lng);
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("Drag End Called");
    console.log(m);
    this.fetchDetails(m.lat,m.lng);
  }

  markers: marker[] = [
	  {
		  lat: 18.36245,
		  lng: -66.56128,
		  label: 'A',
		  draggable: true
	  }
  ]



}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
