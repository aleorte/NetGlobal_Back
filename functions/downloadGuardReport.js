const obj = //lo que vuelve de guardias
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