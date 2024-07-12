const socket = io();


const options = {
    enableHighAccuracy: true, // enable high accuracy
    maximumage: 0,
    timeout: 3000, // wait for 3 seconds
};

function error(error) {
    console.log(error);
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function success(position) {
        const { latitude, longitude } = position.coords;
        socket.emit('send-location', { latitude, longitude });
    }, error, options)
}

const map=L.map("map").setView([0,0],10);

L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{
    attribution:"Rawat Maps © 2024 "
}).addTo(map)


const markers={};
socket.on("receive-location",(data)=>{ 
    // console.log(data.latitude,data.longitude)
    map.setView([data.latitude,data.longitude],16); console.log("markers",markers)
    if(markers[data.id]){ console.log("dewwewe",markers[data.id])
        markers[data.id].setLatLng([data.latitude,data.longitude]);
    } else{
      markers[data.id]=  L.marker([data.latitude,data.longitude]).addTo(map)
    }
})

socket.on('user-disconnected',(id)=>{ console.log("removeddd",id)
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }

})
