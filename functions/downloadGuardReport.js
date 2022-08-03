const obj = {
    "companies": [
      {
        "id": 1,
        "cuit": "12131311",
        "legalName": "Havanna",
        "street": "Gascón",
        "number": 4400,
        "location": "Mar del Plata",
        "coordinateLatitude": "-37.99692",
        "coordinateLength": "-57.570185",
        "contractStartDate": "2022-01-01",
        "contractEndDate": "2022-12-01",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1kLfvpglz9ro0HJsI4VoNw3CEGVlrZnXJw&usqp=CAU",
        "createdAt": "2022-07-05T13:08:05.865Z",
        "updatedAt": "2022-07-05T13:08:05.865Z",
        "branches": [
          {
            "id": 1,
            "cuit": "1",
            "name": "la sucursal",
            "street": "Valencia",
            "number": 5868,
            "location": "Mar del PLata ",
            "coordinateLatitude": "-37.96201",
            "coordinateLength": "-57.56317",
            "active": true,
            "createdAt": "2022-07-05T13:08:05.864Z",
            "updatedAt": "2022-07-05T13:08:05.864Z",
            "companyId": 1,
            "provinceId": 1
          },
          {
            "id": 2,
            "cuit": "2",
            "name": "la sucursal 2 ",
            "street": "San Juan",
            "number": 2400,
            "location": "Mar del Plata",
            "coordinateLatitude": "-37.99698",
            "coordinateLength": "-57.56757",
            "active": true,
            "createdAt": "2022-07-05T13:08:05.864Z",
            "updatedAt": "2022-07-05T13:08:05.864Z",
            "companyId": 1,
            "provinceId": 1
          }
        ],
        "guards": 2
      },
      {
        "id": 2,
        "cuit": "12131011",
        "legalName": "Moscuzza",
        "street": "Valencia",
        "number": 5888,
        "location": "Mar del Plata",
        "coordinateLatitude": "-37.96201",
        "coordinateLength": "-57.56317",
        "contractStartDate": "2022-01-01",
        "contractEndDate": "2022-12-01",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ5SX2cr-TiW1nODI8mV-_1XMDa5ApmnUNVw&usqp=CAU",
        "createdAt": "2022-07-05T13:08:05.865Z",
        "updatedAt": "2022-07-05T13:08:05.865Z",
        "branches": [],
        "guards": 0
      },
      {
        "id": 3,
        "cuit": "121310011",
        "legalName": "Lucianos",
        "street": "Chaco",
        "number": 2400,
        "location": "Mar del Plata",
        "coordinateLatitude": "-37.99598",
        "coordinateLength": "-57.56958",
        "contractStartDate": "2022-01-01",
        "contractEndDate": "2022-12-01",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxMliX-s96Pnop4CDgkDHjxlxjJx24aUK_6A&usqp=CAU",
        "createdAt": "2022-07-05T13:08:05.865Z",
        "updatedAt": "2022-07-05T13:08:05.865Z",
        "branches": [],
        "guards": 0
      }
    ],
    "totalPages": 1
  }
const data= [['Cuil','Name','Last Name','Worked Hours']]
for(let i=0 ; i<obj.guards.length;i++){
    let arr=[]
    arr.push(obj.guards[i]["cuil"],obj.guards[i]["name"],obj.guards[i]["lastName"])
    data.push(arr)
}
function makeCsv(rows){
return rows.map(r => r.join(',')).join("\r\n")
}
function downloadFile(data,name ="report.csv"){
    //creamos un nuevo blob y definimos el type 
    const blob = new Blob([makeCsv(data)],{type: "application/octet-stream"})
    //creamos la url para nuestro blob , este va a ser unico e irrepetible , se guarda automatica/ asi que hay que destruirla 
    const href = URL.createObjectURL(blob)
    //creo un a y le asigno las propiedades que quiero 
    const a = Object.assign(document.createElement("a"),{
        href,
        style:"display:none",
        download: name
    })
    document.body.appendChild(a)
    a.click()
    //destruimos direccion url que creamos 
    URL.revokeObjectURL(href)
    a.remove()
}
downloadFile(data)