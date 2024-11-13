type carNameProps= {
   carmodels:{
    make:string
    model:string
    year:number
   }[]
    
}


export const Carlist = (props:carNameProps)=>{
    return(
        <>
        {props.carmodels.map(carName =>{
            return(
                <div key={carName.model}>
                    <h2>Car Name: {carName.make} {carName.model} - Year: {carName.year}</h2>
                </div>
            )
        })}



        </>
    )
}