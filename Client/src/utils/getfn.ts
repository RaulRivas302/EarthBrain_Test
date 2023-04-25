import axios from "axios";
const ApiURl='http://localhost:3000/materials'
export function getName(setMaterials: any) {
    axios.get(ApiURl).then(res=>{
        const materials = res.data.map((material: any) => ({
        ...material,
        id: material._id
        }));
        setMaterials(materials)
    }) 
}