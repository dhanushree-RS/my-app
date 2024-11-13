type personProps = {
    name: {
        first: string
        last:string
    }
}




export const Person = (props:personProps) =>{
    return(
        <>
          <h2>My name is {props.name.first} {props.name.last}</h2>
        </>
    )
}

